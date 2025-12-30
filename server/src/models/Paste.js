import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        pasteId: {
            type: String,
            required: true,
            unique: true
        },
        ttlSeconds: {
            type: Number,
            default: null
        },
        maxViews: {
            type: Number,
            default: null
        },
        views: {
            type: Number,
            default: 0
        },
        expiresAt: {
            type: Date,
            default: null
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        allowedEmails: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

pasteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
pasteSchema.index({ pasteId: 1 });

export default mongoose.model("Paste", pasteSchema);
