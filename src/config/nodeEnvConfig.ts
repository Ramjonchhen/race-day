import { validateNodeEnvironment } from "./envValidators";

// NODE ENV to determine logging config 
export const validatedNodeEnv = validateNodeEnvironment("NODE_ENV");