import { validatedNodeEnv } from "./nodeEnvConfig";
import { validateEnvPortValue } from "./envValidators";

const validatedHttpPort = validateEnvPortValue("PORT");

export const serverConfig = {
    ENV: validatedNodeEnv,
    PORT: validatedHttpPort,
};