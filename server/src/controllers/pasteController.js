import Paste from "../models/Paste.js";
import { generatePasteId } from "../utils/idGenerator.js";
import { statusType } from "../utils/statusType.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/apiResonse.js";

const getCurrentTime = (req) => {
    if (process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]) {
        return new Date(parseInt(req.headers["x-test-now-ms"]));
    }
    return new Date();
};

const isPasteAvailable = (paste, req) => {
    const now = getCurrentTime(req);

    if (paste.expiresAt && now > paste.expiresAt) {
        return false;
    }

    if (paste.maxViews !== null && paste.views >= paste.maxViews) {
        return false;
    }

    return true;
};

export const createPaste = asyncHandler(async (req, res) => {
    const { content, ttl_seconds, max_views, allowedEmails } = req.body;

    // Validate required fields
    if (!content || typeof content !== "string" || content.trim().length === 0) {
        return sendResponse(
            res,
            false,
            null,
            "Content is required and must be a non-empty string",
            statusType.BAD_REQUEST
        );
    }

    if (ttl_seconds !== undefined && (typeof ttl_seconds !== "number" || ttl_seconds < 1)) {
        return sendResponse(
            res,
            false,
            null,
            "ttl_seconds must be an integer >= 1",
            statusType.BAD_REQUEST
        );
    }

    if (max_views !== undefined && (typeof max_views !== "number" || max_views < 1)) {
        return sendResponse(
            res,
            false,
            null,
            "max_views must be an integer >= 1",
            statusType.BAD_REQUEST
        );
    }

    const pasteId = generatePasteId();

    let expiresAt = null;
    if (ttl_seconds) {
        expiresAt = new Date(Date.now() + ttl_seconds * 1000);
    }

    await Paste.create({
        content: content.trim(),
        pasteId,
        ttlSeconds: ttl_seconds || null,
        maxViews: max_views || null,
        expiresAt,
        createdBy: req.user?._id || null,
        allowedEmails: allowedEmails || []
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const url = `${baseUrl}/p/${pasteId}`;

    return sendResponse(
        res,
        true,
        { id: pasteId, url },
        "Paste created successfully",
        statusType.CREATED
    );
});

export const getPasteApi = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const paste = await Paste.findOne({ pasteId: id });

    if (!paste) {
        return sendResponse(res, false, null, "Paste not found", statusType.NOT_FOUND);
    }

    if (!isPasteAvailable(paste, req)) {
        await Paste.deleteOne({ _id: paste._id });
        return sendResponse(res, false, null, "Paste not found", statusType.NOT_FOUND);
    }

    await Paste.findByIdAndUpdate(paste._id, { $inc: { views: 1 } });

    const remainingViews = paste.maxViews !== null ? paste.maxViews - paste.views - 1 : null;

    return sendResponse(
        res,
        true,
        {
            content: paste.content,
            remaining_views: remainingViews,
            expires_at: paste.expiresAt
        },
        "Paste retrieved successfully",
        statusType.OK
    );
});

export const healthCheck = asyncHandler(async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState;
        const dbConnected = dbState === 1;

        return sendResponse(
            res,
            true,
            { ok: dbConnected, dbStatus: dbState },
            dbConnected ? "Service is healthy" : "Database not connected",
            dbConnected ? statusType.OK : statusType.INTERNAL_SERVER_ERROR
        );
    } catch (error) {
        return sendResponse(
            res,
            false,
            { ok: false },
            "Health check failed",
            statusType.INTERNAL_SERVER_ERROR
        );
    }
});
