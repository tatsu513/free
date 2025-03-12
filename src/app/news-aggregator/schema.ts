import { z } from "zod";

export const newsSchema = z.object({
  articles: z.array(
    z.object({
      author: z.string().nullable(),
      content: z.string(),
      description: z.string(),
      publishedAt: z.string(),
      source: z.object({
        id: z.string().nullable(),
        name: z.string(),
      }),
      title: z.string(),
      url: z.string(),
      urlToImage: z.string().url().nullable(),
    })
  ),
});
