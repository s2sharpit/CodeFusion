"use client"
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { Input } from "./ui";
import { useDebouncedCallback } from "use-debounce";
import { LuChevronsUpDown, LuX } from "react-icons/lu";
import { Button } from "@/components/ui";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SearchFilter({
  placeholder,
  filter,
  available,
}: {
  placeholder: string;
  filter?: string[];
  available?:string[]
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [skillsFilter, setSkillsFilter] = useState<string[]>(filter ?? []);
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("query") || ""
  );
  const [open, setOpen] = useState(false);

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

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skillsFilter.filter(
      (skill) => skill !== skillToRemove
    );
    setSkillsFilter(updatedSkills);
  };

  const handleSelectSkill = (selectedSkill: string) => {
    if (!skillsFilter.includes(selectedSkill)) {
      setSkillsFilter([...skillsFilter, selectedSkill]);
      setOpen(false);
    }
  };

  return (
    <div className="md:flex justify-between w-full max-md:space-y-4">
      <div className="relative h-min">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <Input
          className="pl-10 md:w-96 max-w-"
          placeholder={placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <FaSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="flex flex-wrap gap-4 justify-end">
        {skillsFilter.map((skill) => (
          <div
            key={skill}
            className="flex items-center border border-border rounded capitalize"
          >
            <span className=" pl-3 flex items-center gap-3">
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="px-2 py-2 h-full text-gray-500 hover:text-red-500 focus:outline-none"
              >
                <LuX className="text-lg" />
              </button>
            </span>
          </div>
        ))}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-44 justify-between"
            >
              Filter
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-44 p-0">
            <Command>
              <CommandInput placeholder="Search Skill..."></CommandInput>
              <CommandList>
                <CommandEmpty>No Skill found.</CommandEmpty>
                <CommandGroup>
                  {available?.map((skill) => (
                    <CommandItem
                      key={skill}
                      value={skill}
                      onSelect={handleSelectSkill}
                    >
                      {skill}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
