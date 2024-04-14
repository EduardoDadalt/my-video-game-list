import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { addGameProcedure } from "./addGame";
import { addToListSchema } from "./schemas/addToListSchema";

export const gameRouter = createTRPCRouter({
  findAll: publicProcedure.input(z.object({})).query((_) => {
    return [
      { id: 1, name: "Game 1" },
      { id: 2, name: "Game 2" },
    ];
  }),
  addToList: protectedProcedure.input(addToListSchema).mutation(
    async ({
      ctx: {
        session: {
          user: { id },
        },
        db,
      },
      input: { gameId, rating, status, hoursPlayed },
    }) => {
      await db.rating.create({
        data: { userId: id, gameId: gameId, rating, status, hoursPlayed },
      });
      return { success: true };
    },
  ),

  addGame: addGameProcedure,
});
