import { z } from "zod";
import { StatusRating } from "@prisma/client";

export const addToListSchema = z.object({
  gameId: z.string().cuid(),
  rating: z.number().min(1).max(10),
  status: z.nativeEnum(StatusRating),
  hoursPlayed: z.coerce.number().min(0),
});

export type AddToListInput = z.infer<typeof addToListSchema>;