"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { Button, Input, Subtle } from "./ui";
import { useDebouncedCallback } from "use-debounce";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { LuXCircle } from "react-icons/lu";

type Filter = {
  category: string;
  items: string[];
};

export default function SearchFilter({ available }: { available?: Filter[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [skillsFilter, setSkillsFilter] = useState<string[]>(
    searchParams?.get("filter")?.split(",") || []
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("query") || ""
  );

  // Function to handle checkbox click
  const handleCheckboxClick = (item: string) => {
    // Check if the item is already in the filter
    if (skillsFilter.includes(item)) {
      // If yes, remove it
      setSkillsFilter((prevFilter) =>
        prevFilter.filter((filterItem) => filterItem !== item)
      );
    } else {
      // If no, add it
      setSkillsFilter((prevFilter) => [...prevFilter, item]);
    }
  };

  // Debounced search handler
  const handleSearch = useDebouncedCallback(
    (term: string, skills: string[]) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      if (skills.length > 0) {
        params.set("filter", skills.join(","));
      } else {
        params.delete("filter");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  useEffect(() => {
    handleSearch(searchTerm, skillsFilter);
  }, [searchTerm, skillsFilter, handleSearch]);

  return (
    <div className="md:flexjustify-between w-full max-md:space-y-4">
      <div className="flex justify-between relative">
        <Subtle size={"sm"}>Filter Projects</Subtle>
        {skillsFilter.length > 0 && (
          <Button
            size={"sm"}
            variant="outline"
            className="absolute right-0 bottom-0 gap-1"
            onClick={() => setSkillsFilter([])}
          >
            <LuXCircle className="text-base" />
            Clear
          </Button>
        )}
      </div>
      <div className="relative h-min my-2">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <Input
          className="pl-10 md:w-96max-w-"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <FaSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <hr className="border-border mt-5" />
      <Accordion
        type="single"
        collapsible
        // defaultValue={available?.[0].category}
      >
        {available?.map((obj) => (
          <AccordionItem key={obj.category} value={obj.category}>
            <AccordionTrigger>{obj.category}</AccordionTrigger>
            <AccordionContent className="grid gap-2">
              {obj.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center space-x-2 bg-secondary/50 p-2 rounded"
                >
                  {/* Updated Checkbox component */}
                  <Checkbox
                    id={item}
                    checked={skillsFilter.includes(item.toLowerCase())}
                    onClick={() => handleCheckboxClick(item.toLowerCase())}
                  />
                  <label
                    htmlFor={item}
                    className="textsm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
