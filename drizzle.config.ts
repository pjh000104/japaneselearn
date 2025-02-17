import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./src/lib/db/schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: "libsql://japanese-words-pjh000104.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzkxNTE0ODIsImlkIjoiMjNkZDY0NzktMzNkMC00YWVlLWE2OTMtNTAyOTQ1YmFlMjY5In0.3xB-15AC-QYAwApDo69flc9wSQ2JolLxdIAbTxeRjlLHSu63EBjnpLWVHNRrM8-4HgKwMcbBPm0qe1Zu6zY1Dg",
  },
});
