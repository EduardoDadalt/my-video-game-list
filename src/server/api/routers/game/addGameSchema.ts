import { z } from "zod";

export const addGameSchema = z.object({
  name: z.string(),
  sinopse: z.string(),
  releaseDate: z.date().optional(),
  Images: z.instanceof(Buffer).array().max(5),
  publisherId: z.string().cuid(),
  developers: z.array(z.string().cuid()),
  PosterHorizontal: z.instanceof(Buffer),
  PosterVertical: z.instanceof(Buffer),
  categories: z.array(z.string().cuid()),
});
