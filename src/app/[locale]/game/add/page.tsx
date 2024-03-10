"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { type AddGameInput } from "@/server/api/routers/game/addGame";
import { addGameSchema } from "@/server/api/routers/game/addGameSchema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

export default function AddGamePage() {
  const form = useForm<AddGameInput>({
    resolver: zodResolver(addGameSchema),
  });

  const add = api.game.addGame.useMutation();

  const onSubmit: SubmitHandler<AddGameInput> = async (data) => {
    const { success } = await add.mutateAsync(data);
    if (success) {
      console.log("Game added");
    } else {
      form.setError("root", {
        type: "manual",
        message: "Failed to add game",
      });
    }
  };

  return (
    <main className="flex w-full flex-col self-center p-4 lg:max-w-2xl">
      <h1 className="font-display text-2xl">Add Game</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Game Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sinopse"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sinopse</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="releaseDate"
            rules={{ required: true }}
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Release Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="Game Name"
                    value={String(value)}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Language</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {!field.value && "Select language"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value={"Teste"}
                          key={"Teste"}
                          // onSelect={() => {
                          //   form.setValue("language", language.value);
                          // }}
                        >
                          Teste
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              // language.value === field.value
                              //   ? "opacity-100"
                              //   : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Platforms */}
          {/* Developer */}
          {/* Images */}
          {/* <Input type="file" /> */}
          <Button type="submit">Add Game</Button>
        </form>
      </Form>
    </main>
  );
}
