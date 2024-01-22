"use client";

import { api } from "@/trpc/react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState, type ReactNode } from "react";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import { StatusRating } from "@prisma/client";

export default function AddGameToList({
  gameId,
  children,
}: {
  gameId: string;
  children: ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  type RatingInfo = {
    rating: number;
    status: StatusRating;
    hoursPlayed: number;
  };

  const [ratingInfo, setRatingInfo] = useState<RatingInfo>({
    rating: 0,
    status: StatusRating.Playing,
    hoursPlayed: 0,
  });

  const addGameToList = api.game.addToList.useMutation();

  return (
    <>
      <Button color="primary" onClick={onOpen} className="h-auto">
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-2">
                  <Select
                    label="Select rating"
                    placeholder="Rating"
                    value={ratingInfo.rating.toString()}
                    onChange={(e) =>
                      setRatingInfo({
                        ...ratingInfo,
                        rating: Number(e.target.value),
                      })
                    }
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1)
                      .reverse()
                      .map((i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString()}
                        </SelectItem>
                      ))}
                  </Select>
                  <Select
                    label="Select status"
                    placeholder="Status"
                    onChange={(e) =>
                      setRatingInfo({
                        ...ratingInfo,
                        status: String(e.target.value) as StatusRating,
                      })
                    }
                  >
                    {Object.values(StatusRating).map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Enter hours played"
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    addGameToList.mutate({ gameId, ...ratingInfo });
                    onClose();
                  }}
                >
                  Salvar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
