"use client";

import GameCard from "@/components/gameCard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";
export default function CarouselOfGames({
  games,
}: {
  games: { id: string; name: string; PosterId: string | null }[];
}) {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={10}
      navigation
      pagination={true}
      modules={[Pagination, Navigation]}
    >
      {games.map((game) => (
        <SwiperSlide key={game.id}>
          <GameCard game={game} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
