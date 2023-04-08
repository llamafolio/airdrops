/**
 * This gives typo support and autocomplete for environment variables access
 */

interface EnvironmentVariables {
  readonly NODE_ENV: "development" | "production" | "test";
  readonly PORT: string;
}

declare namespace Bun {
  interface Env extends EnvironmentVariables {}
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
