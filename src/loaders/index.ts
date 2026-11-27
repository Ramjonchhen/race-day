import { serverConfig } from "../config/serverConfig";
import { loadDatabase } from "./database";
import { app } from "./express";

const port = serverConfig.PORT;

export const startServer = async () => {
    await loadDatabase();
    app.listen(port, () => {
        console.log("race-day API server listening on port: ", port);
    })
}