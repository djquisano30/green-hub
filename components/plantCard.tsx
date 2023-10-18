"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Image,
} from "@nextui-org/react";

interface PlantCardProps {
  plant: {
    default_image: {
      original_url: string;
    };
    common_name: string;
    scientific_name: string;
    id: any;
    // Add other properties as needed
  };
}
import Link from "next/link";
const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const regularUrl = plant.default_image && plant.default_image.original_url;

  return (
    <Link href={`/plant/${plant.id}`}>
      <Card className="py-4" isPressable>
        <CardBody className="overflow-visible p-0">
          {regularUrl && (
            <Image
              shadow="sm"
              radius="lg"
              alt={plant.common_name}
              className="object-cover h-[140px] w-[200px]"
              src={regularUrl}
              fallbackSrc="./images/plantfallback.png"
              isZoomed
              isBlurred
            />
          )}
        </CardBody>
        <CardFooter className="flex-col text-small justify-between">
          <b>{plant.common_name}</b>
          <p className="text-default-500">{plant.scientific_name}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PlantCard;
