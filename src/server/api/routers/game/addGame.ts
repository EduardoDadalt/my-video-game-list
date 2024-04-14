import { type z } from "zod";
import { protectedProcedure } from "../../trpc";
import { addGameSchema } from "./schemas/addGameSchema";

export type AddGameInput = z.infer<typeof addGameSchema>;

export const addGameProcedure = protectedProcedure
  .input(addGameSchema)
  .mutation(async ({ ctx: { db }, input }) => {
    // TODO: Optimize images with sharp
    const id = await db.$transaction(async (db) => {
      const { id } = await db.game.create({
        data: {
          name: input.name,
          sinopse: input.sinopse,
          releaseDate: input.releaseDate,
          publisherId: input.publisherId,
          Developers: {
            connect: input.developers.map((id) => ({ id })),
          },
          Images: {
            createMany: {
              data: input.Images.map((data) => ({ data })),
            },
          },
        },
        select: { id: true },
      });
      const [{ id: posterHorizontalId }, { id: posterVerticalId }] =
        await Promise.all([
          db.gameImage.create({
            data: {
              gameId: id,
              data: input.PosterHorizontal,
            },
            select: { id: true },
          }),
          db.gameImage.create({
            data: {
              gameId: id,
              data: input.PosterVertical,
            },
            select: { id: true },
          }),
        ]);
      await db.game.update({
        where: { id },
        data: {
          posterVerticalId,
          posterHorizontalId,
        },
      });
      return id;
    });

    return { id, success: true };
  });
