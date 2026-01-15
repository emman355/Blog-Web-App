import { eq, and } from "drizzle-orm";
import { db } from "../../config/db.js";
import { blogPosts } from "schema/blog-posts.js";

export const BlogPostsRepo = {
  // 📚 Fetch all blog posts for a user
  getBlogPosts: (userId: string) =>
    db.select().from(blogPosts)
      .where(eq(blogPosts.userId, userId)),

  // 🔎 Fetch single blog post by ID and user
  getBlogPostById: async (id: string, userId: string) => {
    const result = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.id, id), eq(blogPosts.userId, userId)))
      .limit(1);

    return result[0]; // return single item
  },

  // ✍️ Create a new blog post
  createBlogPost: (
    userId: string,
    title: string,
    content: object,
    photoUrl: string,
    category: string
  ) =>
    db.insert(blogPosts)
      .values({ userId, title, content, photoUrl, category })
      .returning(),

  // 🛠 Update an existing blog post
  updateBlogPost: (
    id: string,
    userId: string,
    patch: Partial<{
      title: string;
      content: object;
      photoUrl: string;
      category: string;
    }>
  ) =>
    db.update(blogPosts)
      .set({ ...patch, updatedAt: new Date() })
      .where(and(eq(blogPosts.id, id), eq(blogPosts.userId, userId)))
      .returning(),

  // 🗑 Remove a blog post
  removeBlogPost: (id: string, userId: string) =>
    db.delete(blogPosts)
      .where(and(eq(blogPosts.id, id), eq(blogPosts.userId, userId)))
      .returning(),
};
