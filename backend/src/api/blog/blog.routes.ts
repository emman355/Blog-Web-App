import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { BlogPostsController } from "./blog.controller.js";

export const blogRouter = Router();

blogRouter.use(requireAuth);

// 📚 List all blogs for the logged-in user
blogRouter.get("/", BlogPostsController.listBlogs);

blogRouter.get("/:id", BlogPostsController.getBlogPostsById);

// createBlog handles both file upload and blog metadata
blogRouter.post("/", ...BlogPostsController.createBlog); // spread array of middlewares

// updateBlog allows updating photo metadata and replacing the photo
blogRouter.put("/:id", ...BlogPostsController.updateBlog);

// removeBlog deletes the photo and its metadata
blogRouter.delete("/:id", BlogPostsController.removeBlog);