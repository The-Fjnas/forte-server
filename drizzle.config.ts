import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/infra/database/schema.ts",
  out: "./src/infra/database/drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
