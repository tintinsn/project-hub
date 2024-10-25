"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button, {
  ButtonBorder,
  ButtonColor,
  ButtonHeight,
  ButtonIconSize,
  ButtonPosition,
  ButtonRounded,
  ButtonSize,
  ButtonWidth,
} from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { IconType } from "react-icons";

interface DeleteButtonProps {
  itemId: string;
  itemType: "projects" | "profile";
  path?: string;
  label?: string;
  icon?: IconType;
  rounded?: ButtonRounded;
  position?: ButtonPosition;
  size?: ButtonSize;
  width?: ButtonWidth;
  bg?: ButtonColor;
  border?: ButtonBorder;
  borderColor?: ButtonColor;
  textColor?: ButtonColor;
  height?: ButtonHeight;
  iconSize?: ButtonIconSize;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  itemId,
  itemType,
  path,
  icon,
  textColor,
  border,
  borderColor,
  rounded,
  height,
  iconSize,
  label,
  position,
  size,
  width,
  bg,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete this ${itemType}?`)) {
      setIsDeleting(true);
      try {
        const endpoint =
          itemType === "projects"
            ? `/api/projects/${itemId}`
            : `/api/${itemType}/${path}/${itemId}`;
        const response = await fetch(endpoint, {
          method: "DELETE",
        });

        if (response.ok) {
          if (pathname === `/project/${itemId}`) {
            router.push("/");
            router.refresh();
          } else {
            router.refresh();
          }
        } else {
          console.error(`Failed to delete ${itemType}`);
        }
      } catch (error) {
        console.error(`Error deleting ${itemType}:`, error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button
      onClick={handleDelete}
      icon={icon}
      textColor={textColor}
      border={border}
      borderColor={borderColor}
      rounded={rounded}
      disabled={isDeleting}
      height={height}
      iconSize={iconSize}
      label={label}
      position={position}
      size={size}
      width={width}
      bg={bg}
    />
  );
};

export default DeleteButton;

