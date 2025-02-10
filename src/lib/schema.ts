import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const words = sqliteTable("words", {
  id: integer("id").primaryKey(),
  word: text("word").notNull(),
  meaning: text("meaning").notNull(),
  furigana: text("furigana").notNull(),
  romaji: text("romaji").notNull(),
  level: integer("level").notNull(),
});