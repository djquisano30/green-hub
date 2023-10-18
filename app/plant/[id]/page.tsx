"use client";
// Import necessary dependencies
import React, { useEffect } from "react";
import { Tabs, Tab, Card, CardBody, Image } from "@nextui-org/react";
import { useSpecificPlant } from "@/app/api/api";
import { title, subtitle } from "@/components/primitives";

export default function PlantPage({ params }: { params: { id: string } }) {
  // Retrieve data using the custom hook

  const { specificPlant, loading, searchSpecificPlant } = useSpecificPlant();

  // Fetch plant data when component mounts or when `specificPlant` or `params.id` change
  useEffect(() => {
    searchSpecificPlant(params.id);
    console.log(specificPlant);
  }, [specificPlant, params.id, searchSpecificPlant]);
  const regularUrl =
    specificPlant?.default_image && specificPlant?.default_image.original_url;
  return (
    // Conditional rendering based on `loading` state
    <>
      {loading ? (
        <div className="grid grid-cols-2">
          <div>
            {regularUrl && (
              <Image
                shadow="sm"
                radius="lg"
                alt={specificPlant?.common_name}
                className="object-cover h-[140px] w-[200px]"
                src={regularUrl}
                fallbackSrc="./images/plantfallback.png"
                isZoomed
                isBlurred
              />
            )}
          </div>
          <div>
            <div className="flex w-full flex-col">
              <Tabs aria-label="Options">
                <Tab key="description" title="Description">
                  <Card>
                    <CardBody>
                      <h2 className={title({ color: "green" })}>
                        {specificPlant?.common_name}
                      </h2>
                      <p>{specificPlant?.description}</p>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="diseaselist" title="Disease List">
                  <Card>
                    <CardBody>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur.
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="faqs" title="FAQs">
                  <Card>
                    <CardBody>
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
