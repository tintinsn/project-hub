"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";

interface DeleteButtonProps {
  projectId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ projectId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          router.push("/");
          router.refresh();
        } else {
          console.error("Failed to delete project");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button
      onClick={handleDelete}
      label={isDeleting ? "Deleting..." : "Delete"}
      icon={MdDeleteForever}
      variant="danger"
      rounded="full"
      disabled={isDeleting}
    />
  );
};

export default DeleteButton;
