"use client";

import { technologies } from "@/const";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { SelectedOption } from "../create-form";

interface MultiSelectTechProps {
  updateTechStack?: string[];
  selectedTechStack?: SelectedOption[];
  setSelectedTechStack: (selected: SelectedOption[]) => void;
}

const MultiSelectTech = ({
  setSelectedTechStack,
  selectedTechStack = [],
  updateTechStack,
}: MultiSelectTechProps) => {
  const [selected, setSelected] = useState<SelectedOption[]>([]);

  useEffect(() => {
    if (updateTechStack && updateTechStack.length > 0) {
      const selectedOptions = updateTechStack.map((tech) => {
        const matchingTech = technologies.find((t) => t.value === tech);
        return matchingTech || { value: tech, label: tech };
      });
      setSelected(selectedOptions);
      setSelectedTechStack(selectedOptions);
    }
  }, [updateTechStack, setSelectedTechStack]);

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

// "use client";

// import { technologie } from "@/const";

// import { useEffect, useState } from "react";
// import { MultiSelect } from "react-multi-select-component";
// import { SelectedOption } from "../create-form";

// interface MultiSelectTechProps {
//   selectedTechStack: SelectedOption[];
//   setSelectedTechStack: (selected: SelectedOption[]) => void;
// }

// const MultiSelectTech = ({
//   setSelectedTechStack,
//   selectedTechStack,
// }: MultiSelectTechProps) => {
//   const [selected, setSelected] = useState<SelectedOption[]>([]);

//   useEffect(() => {
//     const selectedOptions = selectedTechStack.map((value) => {
//       const matchingOption = technologie.find((tech) => tech.value === value);
//       return matchingOption || { value, label: value };
//     });
//     setSelected(selectedOptions);
//   }, [selectedTechStack]);

//   const handleChange = (selectedItems: SelectedOption[]) => {
//     setSelected(selectedItems);
//     setSelectedTechStack(selectedItems);
//   };

//   return (
//     <>
//       <MultiSelect
//         options={technologie}
//         onChange={handleChange}
//         value={selected}
//         labelledBy="Select"
//       />
//     </>
//   );
// };

// export default MultiSelectTech;
