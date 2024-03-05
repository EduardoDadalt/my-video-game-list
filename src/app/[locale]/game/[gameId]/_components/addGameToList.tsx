"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectValue } from "@/components/ui/select";
import { api } from "@/trpc/react";

import { StatusRating } from "@prisma/client";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import { useState, type ReactNode } from "react";

type RatingInfo = {
  rating: number;
  status: StatusRating;
  hoursPlayed: number;
};

export default function AddGameToList({
  gameId,
  initialRating,
  children,
}: {
  gameId: string;
  initialRating?: RatingInfo;
  children: ReactNode;
}) {
  const [ratingInfo, setRatingInfo] = useState<RatingInfo>(
    initialRating ?? {
      rating: 0,
      status: StatusRating.Playing,
      hoursPlayed: 0,
    },
  );

  const addGameToList = api.game.addToList.useMutation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button color="primary" className="h-auto">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-1">Modal Title</DialogHeader>
        <div>
          <form className="flex flex-col gap-2">
            <Select
              // label="Select rating"
              // placeholder="Rating"
              onValueChange={(value) =>
                setRatingInfo({
                  ...ratingInfo,
                  rating: Number(value),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Rating">
                  {ratingInfo.rating}
                </SelectValue>
              </SelectTrigger>
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
            <Select
            // label="Select status"
            // placeholder="Status"
            // onChange={(e) =>
            //   setRatingInfo({
            //     ...ratingInfo,
            //     status: String(e.target.value) as StatusRating,
            //   })
            // }
            >
              <SelectContent>
                {Object.values(StatusRating).map((i) => (
                  <SelectItem key={i} value={i}>
                    {i}
                  </SelectItem>
                ))}{" "}
              </SelectContent>
            </Select>
            <Input
              // label="Enter hours played"
              placeholder="Hours played"
              type="number"
              min={0}
              onChange={(e) =>
                setRatingInfo({
                  ...ratingInfo,
                  hoursPlayed: Number(e.target.value),
                })
              }
            />
          </form>
        </div>
        <DialogFooter>
          <Button variant="destructive">Fechar</Button>
          <DialogClose asChild>
            <Button
              color="primary"
              onClick={() => {
                addGameToList.mutate({ gameId, ...ratingInfo });
              }}
            >
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
