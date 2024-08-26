"use client";
import { SelectedOption } from "@/app/(routes)/create/page";
import { technologies } from "@/const";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

interface MultiSelectTechProps {
  setSelectedTechStack: (selected: SelectedOption[]) => void;
}

const MultiSelectTech = ({ setSelectedTechStack }: MultiSelectTechProps) => {
  const [selected, setSelected] = useState<SelectedOption[]>([]);

  const handleChange = (selectedItems: SelectedOption[]) => {
    setSelected(selectedItems);
    setSelectedTechStack(selectedItems);
  };

  return (
    <>
      <MultiSelect
        options={technologies}
        onChange={handleChange}
        value={selected}
        labelledBy="Select"
      />
    </>
  );
};

export default MultiSelectTech;
