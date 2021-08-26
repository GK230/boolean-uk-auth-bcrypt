import { Request, Response } from "express";
import dbClient from "../../utils/database";

export async function getAllPosts(req: Request, res: Response) {
  const posts = dbClient.post.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  res.json({ data: posts });
}
