"use client";

import useUpdateModal from "@/app/hooks/useUpdateModal";
import Button from "@/components/ui/button";
import { Project } from "@/types";
import { MdEdit } from "react-icons/md";

interface EditButtonProps {
  project: Project;
}

const EditButton = ({ project }: EditButtonProps) => {
  const updateModal = useUpdateModal();

  return (
    <Button
      onClick={() => updateModal.onOpen(project)}
      label="Edit"
      icon={MdEdit}
      bg="black"
      rounded="full"
    />
  );
};

export default EditButton;
