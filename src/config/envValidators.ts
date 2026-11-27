export function validateMissingEnvVariable(envName: string) {
    const envValue = process.env[envName];
    if (!envValue) {
        console.error(`Missing ${envName} on the env file, add ${envName} to env variable on the respective file`);
        process.exit(1);
    }
    return envValue;
}

export function validateEnvPortValue(envName: string) {
    const envValue = validateMissingEnvVariable(envName);

    // Check that it contains ONLY digits (blocks "+80", "-1", "32.2", "3000abc", "")
    if (!/^\d+$/.test(envValue)) {
        console.error(`${envName} must be a whole number from 1 to 65535, got string on it: ` + envValue);
        process.exit(1);
    }

    const portNo = Number(envValue);
    if (!(portNo >= 1 && portNo <= 65535)) {
        console.error(`The ${envName} variable must be valid port no between 1 to 65535`);
        process.exit(1);
    }

    return portNo;
}

export function validateNodeEnvironment(envName: string) {
    // validation Node Environment 
    const validatedNodeEnv = validateMissingEnvVariable(envName);

    const devKeyword = "development";
    const prodKeyword = "production";
    const testKeyword = "test";

    if (
        !(
            validatedNodeEnv === devKeyword ||
            validatedNodeEnv === prodKeyword ||
            validatedNodeEnv === testKeyword
        )
    ) {
        console.error(`NODE_ENV variable should be either: ${devKeyword} / ${prodKeyword} / ${testKeyword} got: `, validatedNodeEnv);
        process.exit(1);
    }

    return validatedNodeEnv as typeof devKeyword | typeof prodKeyword | typeof testKeyword; 
}
