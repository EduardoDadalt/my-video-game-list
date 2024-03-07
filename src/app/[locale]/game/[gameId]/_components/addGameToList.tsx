"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addGameSchema } from "@/server/api/routers/game/addGameSchema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusRating } from "@prisma/client";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";

type RatingInfo = {
  rating: number;
  status: StatusRating;
  hoursPlayed: number;
};

export default function AddGameToList({
  gameId,
  initialRating = {
    rating: 0,
    status: StatusRating.PlanToPlay,
    hoursPlayed: 0,
  },
  children,
}: {
  gameId: string;
  initialRating?: RatingInfo;
  children: ReactNode;
}) {
  const form = useForm<RatingInfo>({
    resolver: zodResolver(addGameSchema),
    defaultValues: initialRating,
  });

  const addGameToList = api.game.addToList.useMutation();

  const onSubmit = (data: RatingInfo) => {
    addGameToList.mutate({ gameId, ...data });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button color="primary" className="h-auto">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-1">
          Add game to List
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 1)
                          .reverse()
                          .map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i.toString()}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(StatusRating).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hoursPlayed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours played</FormLabel>
                    <Input {...field} type="number" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button variant="ghost">Fechar</Button>
          <Button color="primary" type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
