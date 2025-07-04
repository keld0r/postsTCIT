import { posts, type Post, type InsertPost } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Post methods
  getAllPosts(): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  deletePost(id: number): Promise<Post | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Post methods
  async getAllPosts(): Promise<Post[]> {
    return await db.select().from(posts).orderBy(posts.id);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db
      .insert(posts)
      .values(insertPost)
      .returning();
    return post;
  }

  async deletePost(id: number): Promise<Post | undefined> {
    const [deletedPost] = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();
    return deletedPost || undefined;
  }
}

export const storage = new DatabaseStorage();
