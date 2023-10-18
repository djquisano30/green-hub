"use client";
import { spec } from "node:test/reporters";
import { useState, useEffect } from "react";
//const API_KEY = "sk-9yzA652a5284c22c92461";
const API_KEY = "sk-3RGo652f1fb0c2f062523";

export const usePlantSearch = () => {
  const [plants, setPlants] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const searchPlant = async (search: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://perenual.com/api/species-list?key=${API_KEY}&q=${search}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlants(data.data);
    } catch (error) {
      console.error("Error fetching plant data:", error);
      // You might want to display an error message to the user here
    } finally {
      setLoading(false);
    }
  };
  return { plants, searchTerm, loading, setSearchTerm, searchPlant };
};

export default async function getSpecificPlant(id: string) {
  const response = await fetch(
    `https://perenual.com/api/species/details/${id}?key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = response.json();
  console.log(data);
  return data;
}

interface SpecificPlantProps {
  common_name: string;
  description: string;
  default_image: {
    original_url: string;
  };
}

export const useSpecificPlant = () => {
  const [specificPlant, setSpecificPlant] = useState<SpecificPlantProps | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const searchSpecificPlant = async (id: string) => {
    if (!loading) {
      try {
        const response = await fetch(
          `https://perenual.com/api/species/details/${id}?key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setSpecificPlant(data);
      } catch (error) {
        console.error("Error fetching plant data:", error);
        setLoading(false);
        // You might want to display an error message to the user here
      } finally {
        setLoading(true);
      }
    }
  };
  return {
    specificPlant,
    loading,
    searchSpecificPlant,
  };
};
