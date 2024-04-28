"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { Input } from "./ui";
import { useDebouncedCallback } from "use-debounce";

const availableSkills = [
  "Java",
  "JavaScript",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "TailwindCSS",
];

export default function Search({
  placeholder,
  filter,
}: {
  placeholder: string;
  filter?: string[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [skillsFilter, setSkillsFilter] = useState<string[]>(filter ?? []);

  const [selectedSkill, setSelectedSkill] = useState<string>("");

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

  const handleSkillChange = (selectedSkills: string[]) => {
    setSkillsFilter(selectedSkills);
    handleSearch.flush();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkill(e.target.value);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skillsFilter.filter(
      (skill) => skill !== skillToRemove
    );
    setSkillsFilter(updatedSkills);
    handleSearch.flush();
    const params = new URLSearchParams(searchParams);
    if (updatedSkills.length > 0) {
      params.set("filter", updatedSkills.join(","));
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (selectedSkill && !skillsFilter.includes(selectedSkill)) {
      const updatedSkills = [...skillsFilter, selectedSkill];
      setSkillsFilter(updatedSkills);
      handleSearch(searchParams.get("query")?.toString() || "", updatedSkills);
      setSelectedSkill("");
    }
  }, [selectedSkill, skillsFilter, handleSearch, searchParams]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        className="pl-10 md:w-96 max-w-"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value, skillsFilter)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <FaSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      <div>
        <label
          htmlFor="skills"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Skills
        </label>
        <div className="flex flex-wrap">
          {skillsFilter.map((skill) => (
            <div key={skill} className="flex items-center mb-2 mr-2">
              <span className="bg-gray-200 px-2 py-1 rounded-lg mr-1">
                {skill}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-gray-500 hover:text-red-500 focus:outline-none"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <select
          id="skills"
          className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mt-2"
          value={selectedSkill}
          onChange={handleSelectChange}
        >
          <option value="">Select a skill</option>
          {availableSkills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
