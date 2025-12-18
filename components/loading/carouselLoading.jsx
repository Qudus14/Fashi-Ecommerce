// ...existing code...
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "../ui/skeleton";
import Autoplay from "embla-carousel-autoplay";

function CarouselLoading({ items = [] }) {
  const display = items.length ? items : Array.from({ length: 5 });

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
          loop: true,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {display.map((item, index) => {
          const isRealItem = items.length > 0;
          return (
            <CarouselItem
              key={index}
              className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <Card className="bg-gray-300 animate-pulse overflow-hidden rounded-md border-gray-200 w-full h-[320px] flex flex-col">
                  <CardContent className="p-0 flex-shrink-0">
                    {isRealItem ? (
                      item?.product_photo ? (
                        <div className="relative w-40 h-40">
                          <Image
                            src={item.product_photo}
                            alt={item.product_title || "product"}
                            fill
                            sizes="160px"
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-sm font-semibold line-clamp-2 w-40">
                            {item?.product_title || "Untitled product"}
                          </div>
                        </div>
                      )
                    ) : (
                      <Skeleton className="h-40 w-40 rounded-md bg-gray-300 animate-pulse" />
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default CarouselLoading;
