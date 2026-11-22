import express, { type Request, type Response } from "express";

export const globalRouter = express.Router();

globalRouter.get("/health", (_req: Request, res: Response) => {
    return res.json({ status: "healthy" })
})
