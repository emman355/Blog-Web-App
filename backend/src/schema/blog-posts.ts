import { pgTable, uuid, varchar, timestamp, text, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  userId: uuid("user_id").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  content: jsonb("content").notNull(),
  photoUrl: text("photo_url").notNull(),
  category: varchar("category", { length: 30 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});
