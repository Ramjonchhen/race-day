import { validatedNodeEnv } from "./nodeEnvConfig";
import { validateEnvPortValue, validateMissingEnvVariable } from "./envValidators";

// DATABASE CONFIG ENV VALIDATIONS
const validatedDbHost = validateMissingEnvVariable("DATABASE_HOST");
const validatedDbName = validateMissingEnvVariable("DATABASE_NAME");

const validatedDbUser = validateMissingEnvVariable("DATABASE_USER");

const validatedDbPassword = validateMissingEnvVariable("DATABASE_PASSWORD");

const validatedDbPort = validateEnvPortValue("DATABASE_PORT");

export const dbConfig = {
    NODE_ENV: validatedNodeEnv,
    HOST: validatedDbHost,
    NAME: validatedDbName,
    USER: validatedDbUser,
    PASSWORD : validatedDbPassword,
    PORT: validatedDbPort,
}