import express from "express";
import { createPaste, getPasteApi, healthCheck } from "../controllers/pasteController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const pasteRouter = express.Router();

pasteRouter.get("/healthz", healthCheck);
pasteRouter.get("/pastes/:id", getPasteApi);
pasteRouter.post("/pastes", verifyJWT, createPaste);

export { pasteRouter };
