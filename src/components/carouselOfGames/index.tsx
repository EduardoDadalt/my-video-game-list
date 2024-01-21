"use client";

import GameCard, { type GameCardProps } from "@/components/gameCard";
import { useCallback, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, type SwiperClass, SwiperSlide } from "swiper/react";
import "./style.css";

export default function CarouselOfGames({ games }: { games: GameCardProps[] }) {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className="relative flex flex-row items-stretch">
      <button className="swiper-button-prev" onClick={handlePrevious}></button>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView="auto"
        spaceBetween={10}
        pagination={true}
        loop={true}
        modules={[Pagination]}
        className="flex-1"
      >
        {games.map((game) => (
          <SwiperSlide
            key={game.id}
            className="first:rounded-l-none last:rounded-r-none rounded-lg overflow-hidden"
          >
            <GameCard game={game} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-next" onClick={handleNext}></button>
    </div>
  );
}
