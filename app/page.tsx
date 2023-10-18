"use client";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

import { siteConfig } from "@/config/site";

import { title, subtitle } from "@/components/primitives";
import PlantCard from "@/components/plantCard";
import { SearchIcon } from "@/components/icons";
import SearchResults from "@/components/searchresults";

import { usePlantSearch } from "./api/api";

export default function Home() {
  const { plants, searchTerm, loading, setSearchTerm, searchPlant } =
    usePlantSearch();
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div></div>
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Where your &nbsp;</h1>
        <h1 className={title({ color: "green" })}>PLANTS&nbsp;</h1>
        <br />
        <h1 className={title()}>meets passion and practicality!</h1>
      </div>
      <div className="flex gap-3">
        <Input
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          labelPlacement="outside"
          placeholder="Search..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <Button
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          onClick={() => {
            searchPlant(searchTerm);
          }}
        >
          Search
        </Button>
      </div>
      <div className="mt-8">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : plants?.length > 0 ? (
          <div className="flex flex-wrap flex-row gap-4">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No plants Found!</h2>
          </div>
        )}
      </div>
    </section>
  );
}
