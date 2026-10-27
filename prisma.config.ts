import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" },
  datasource: {
    // A local placeholder lets `prisma generate` run during a build without connecting.
    // Set DIRECT_URL for migrations and DATABASE_URL for pooled runtime queries.
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/company_platform?schema=public",
  },
});
