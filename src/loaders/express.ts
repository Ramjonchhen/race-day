import express, { type Request, type Response, type NextFunction} from "express";
import { globalRouter } from "./routes";

export const app = express();

app.use(globalRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const isError = err instanceof Error;
    if(isError) {
        console.error(err.stack);
    }  else {
        console.error(err);
    }
    res.status(500).json({ "msg": "Internal Server Error" })
});
