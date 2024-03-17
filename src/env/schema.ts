// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  API_URL: z.string().url(),
  ACCESS_TOKEN: z.string().min(1),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().min(1),
  NEXT_PUBLIC_NODE_ENV: z.enum(["development", "test", "production"]),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] }}
 */
export const clientEnv: {
  [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k];
} = {
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV
    ? (process.env.NEXT_PUBLIC_NODE_ENV as
        | "development"
        | "test"
        | "production")
    : "development",

  NEXT_PUBLIC_BASE_URL: process.env.BASE_URL || "http://localhost:3000",
};
