"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type AddToListInput,
  addToListSchema,
} from "@/server/api/routers/game/schemas/addToListSchema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusRating } from "@prisma/client";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";

export default function AddGameToList({
  children,
  ...initialRating
}: AddToListInput & {
  children: ReactNode;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const form = useForm<AddToListInput>({
    resolver: zodResolver(addToListSchema),
    defaultValues: initialRating,
  });

  const addGameToList = api.game.addToList.useMutation();

  const onSubmit = async (data: AddToListInput) => {
    await addGameToList.mutateAsync({ ...data });
    closeDialog();
  };
  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button color="primary" className="h-auto" onClick={openDialog}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit, console.error)}
          >
            <DialogHeader className="flex flex-col gap-1">
              Add game to List
            </DialogHeader>
            <div>
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select
                      onValueChange={(newValue) =>
                        field.onChange(Number(newValue))
                      }
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
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
