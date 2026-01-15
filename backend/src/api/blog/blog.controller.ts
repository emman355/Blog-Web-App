import { Request, Response, NextFunction } from "express";
import { deleteFile, uploadFile } from "../s3.service.js";
import multer from "multer";
import { BlogPostsRepo } from "./blog.repo.js";

// configure multer (memory storage so we can pass buffer to Supabase S3)
const upload = multer({
  storage: multer.memoryStorage(), limits: {
    fileSize: 10000000 // Sensitive: 10MB is more than the recommended limit of 8MB
  }
});

export const BlogPostsController = {
  // 📚 List all blogs for the logged-in user
  listBlogs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await BlogPostsRepo.getBlogPosts(req.user!.id);
      res.json({
        blogs: items,
        message: "Blogs fetched successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  getBlogPostsById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await BlogPostsRepo.getBlogPostById(req.params.id, req.user!.id);
      if (!items) {
        const notFound = new Error("NotFoundError");
        return next(notFound);
      }
      res.json(items);
    } catch (err) {
      next(err);
    }
  },

  // ✍️ Create a new blog (with optional file upload)
  createBlog: [
    upload.single("file"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.body?.title || !req.body?.category || !req.body?.content) {
          throw new Error("ValidationError: title, category, and content are required");
        }

        let photoUrl: string;
        if (req.file) {
          photoUrl = await uploadFile(
            "blog-image",
            `${req.user!.id}-${Date.now()}-${req.file.originalname}`,
            req.file.buffer,
            req.file.mimetype
          );
        } else {
          throw new Error("ValidationError: file is required for photoUrl");
        }

        const [item] = await BlogPostsRepo.createBlogPost(
          req.user!.id,
          req.body.title,
          JSON.parse(req.body.content), // content is jsonb
          photoUrl,
          req.body.category
        );

        res.status(201).json({
          message: "Blog created successfully",
          blog: item,
        });
      } catch (err) {
        next(err);
      }
    },
  ],

  // 🛠 Update an existing blog
  updateBlog: [
    upload.single("file"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const postId = req.params.id;
        const userId = req.user!.id;

        // Fetch existing post
        const existing = await BlogPostsRepo.getBlogPostById(postId, userId);
        if (!existing) return next(new Error("NotFoundError"));

        // Handle file replacement
        let photoUrl: string | undefined;
        if (req.file) {
          // Parse bucket and path from old photoUrl
          const url = new URL(existing.photoUrl);
          const parts = url.pathname.split("/");
          const bucket = parts[5];
          const objectPath = parts.slice(6).join("/");

          // Delete old file
          await deleteFile(bucket, objectPath);

          // Upload new file
          photoUrl = await uploadFile(
            "blog-image",
            `${userId}-${Date.now()}-${req.file.originalname}`,
            req.file.buffer,
            req.file.mimetype
          );
        }

        // Build update payload
        const updatePayload: Partial<{
          title: string;
          content: object;
          photoUrl: string;
          category: string;
        }> = {
          title: req.body.title,
          category: req.body.category,
        };

        if (req.body.content) {
          updatePayload.content = JSON.parse(req.body.content);
        }
        if (photoUrl) {
          updatePayload.photoUrl = photoUrl;
        }

        const [item] = await BlogPostsRepo.updateBlogPost(postId, userId, updatePayload);
        if (!item) return next(new Error("NotFoundError"));

        res.json({
          message: "Blog updated successfully",
          blog: item,
        });
      } catch (err) {
        next(err);
      }
    },
  ],

  // 🗑 Remove a blog
  removeBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [item] = await BlogPostsRepo.removeBlogPost(req.params.id, req.user!.id);
      if (!item) return next(new Error("NotFoundError"));

      // Delete associated photo from storage
      if (item.photoUrl) {
        try {
          const url = new URL(item.photoUrl);
          const parts = url.pathname.split("/");
          const bucket = parts[5];
          const objectPath = parts.slice(6).join("/");
          await deleteFile(bucket, objectPath);
        } catch (storageErr) {
          res.status(500).json({
            message: "Failed to delete image from bucket",
            error: storageErr instanceof Error ? storageErr.message : String(storageErr),
          });
        }
      }

      res.status(204).send({
        message: "Blog deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  },
};
