## 1. Module System
Choice: commonjs
Why: Under commonjs imports doesn't needs file extension and support __dirname, tsconfig.json module will have nodenext for aligning with it along with verbatimModuleSyntax being off 
Rejected: module. We will use the modern ESM syntax on the TS already, and the JS is just the output for us
Revisit If: Our JS Build is currently on commonjs module, in the future in case we require some package tat only supports ESM module, we may switch to it 

## 2. Running TypeScript in dev 
Choice: tsc + node with watch mode
Why: tsc with watch mode for compilation and restarting the node process for compiled output with node --watch mode, this options gives consistency across dev and prod sticking us with same .js migration through out
Rejected: ts-node, one more extra dependency, also this breaks the same JS migration consistency that we are looking across environments as we have to use typeorm-ts-node-commonjs package for running migrations

## 3. Restart on file change
Choice: node --watch
Why: built into Node, so one less package to install and update.
Rejected: nodemon. It has more options, but I don't need any yet.

## 4. Production build
Choice: Clear Previous Build Completely Before Generating New Build though Node's fs.rm
Why: compiling TS to JS doesn't clears previous build JS files, unwanted migrations which we deleted or reverted can executed through migration:run creating unwanted schemas, migration versioning conflicts. Using Node's fs.rm to have consistency
Rejected: Rejecting rimraf  as its majorly for Windows and shell's recursive deletion is bind to environment 

## 5. TypeScript Version
Choice: TypeScript 6
Why: Compatible for the packages we will use: ts-jest, typescript-eslint 
Rejected: Typescript 7, not chosen even thought its latest and fast as it doesn't includes programmatic API and the plug-in connection for the packages we will use

## 6. TSConfig Inputs
Choice: target:esnext, module:nodenext, moduleResolution: (ignored), strict:true, rootDir: "./src", outDir: "./dist", emitDecoratorMetadata and experimentalDecorators true
Why: Choosing module as nodenext as it builds the output JS module according to the package.json type, targeting latest ECMAScript code through esnext, moduleResolution is automatically handled through nodenext so ignoring it, rootDir: "./src" and outDir "./dist" for maintaining proper structure, strict: true for turning on TypeScript's main safety checks, such as possible null or undefined handling, TS files always on the src/ and its output always landing on /dist, emitDecoratorMetadata and experimentalDecorators applying true as for TypeORM we have to enable to comply with it 
Rejected: Rejected module: commonjs, as module:nodenext automatically targets the output module according to package.json

## 7. Express Version
Choice: Latest Express Version 5
Why: Its support for the async error handling
Rejected: Express v4 as we have to explicitly handle async errors

## 8. Env config
Choice: Node's Default --env-file
Why: Available on the core runtime itself 
Rejected: dotenv package, one less package and this external feature is now available on the native itself

## 9. Node Version Pinning 
Choice: v26 Major Version through NVM / package.json engines options along with .npmrc engine-strict option
Why: v26 is the latest LTS, and pinning to the major only to get minor and patch updates; also, the package.json engines option along with the .npmrc engine-strict option ensures dependencies get installed only when the specified Node version matches
Rejected: not pinning to latest LTS v26.13.0, as sticking to an exact version needs changing the version in the file itself for updates

## 10. PostgreSQL DB Version 
Choice: v18 Major Version through plain Docker image
Why: v18 is the stable major version, and pinning to the major only for getting bug fixes
Rejected: Rejecting RC releases and latest releases, particularly ignoring latest, as it points to a major release version; any major version switch makes the old major version data inaccessible until transfer is done 
Revisit if: Switch to PostgreSQL v19 in the future if so, we need to have an explicit feature available on v19, or v18 support is ending up 

## 11. Database Schema Primary Key ID Type: UUID or sequential ID
Choice: UUIDv7 time-ordered UUIDs supported by Postgres 18
Why: UUIDs provide little randomness to guess the next resource over sequential IDs; UUIDv7 makes it index-effective, as the starting characters are timestamp-based
Accepted: Choosing UUIDs means we have to create bigger IDs for test scenarios & with UUIDv7 it shows visible marks of when it was created; also, UUIDs don't mean it is secure by default; a large random resource ID doesn't guarantee resource security; resource access policy does
Rejected: Sequential IDs are small, fast, and efficient, but guessing the next resource ID is easily predictable 

## 12. TypeORM Version
Choice: Latest Major Version 1.x (1.1.3)
Why: Latest Major version, which removes long-deprecated APIs, ships pending fixes, and also has hardened security 
Rejected: Legacy Version 0.3. Although it is the previous stable version with all available resources, npm audit found 3 moderate advisories in 0.3.31, fixed only in 1.x, and npm tags 0.3 as a legacy version
