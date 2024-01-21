import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const gameRouter = createTRPCRouter({
  findAll: publicProcedure.input(z.object({})).query((_) => {
    return [
      { id: 1, name: "Game 1" },
      { id: 2, name: "Game 2" },
    ];
  }),
});
