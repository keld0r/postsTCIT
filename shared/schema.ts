import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
});

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;
