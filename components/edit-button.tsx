"use client";

import useUpdateModal from "@/app/hooks/useUpdateModal";
import Button from "@/components/ui/button";
import { MdEdit } from "react-icons/md";

const EditButton = () => {
  const updateModal = useUpdateModal();

  return (
    <Button
      onClick={updateModal.onOpen}
      label="Edit"
      icon={MdEdit}
      variant="outline"
      rounded="full"
    />
  );
};

export default EditButton;
