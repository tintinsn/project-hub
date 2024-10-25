import { GeistSans } from "geist/font/sans";
import React from "react";
import { IconType } from "react-icons";

export type ButtonRounded = "default" | "full";
export type ButtonPosition = "start" | "center" | "end";
export type ButtonSize = "sm" | "lg";
export type ButtonWidth = "fit" | "full";
export type ButtonBorder = "none" | "border";
export type ButtonHeight = "none" | "height";
export type ButtonIconSize = "sm" | "md" | "lg";
export type ButtonColor =
  | "green"
  | "blue"
  | "red"
  | "black"
  | "white"
  | "none"
  | "gray";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
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

const Button = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  rounded = "default",
  position = "start",
  size = "sm",
  width = "fit",
  bg = "none",
  border = "none",
  borderColor = "black",
  textColor = "white",
  height = "height",
  iconSize = "sm",
}: ButtonProps) => {
  const bgStyles = {
    gray: "bg-gray-300",
    green: "bg-green-600",
    blue: "bg-blue-600",
    red: "bg-[#E50815]",
    black: "bg-black",
    white: "bg-white",
    none: "bg-transparent",
  };
  const textStyles = {
    gray: "text-gray-300",
    green: "text-green-600",
    blue: "text-blue-600",
    red: "text-red-600",
    black: "text-black",
    white: "text-white",
    none: "text-transparent",
  };
  const borderColorStyles = {
    gray: "gray-300",
    green: "green-600",
    blue: "blue-600",
    red: "red-600",
    black: "black",
    white: "white",
    none: "transparent",
  };

  const borderStyles = {
    none: "border-none",
    border: "border",
  };

  const roundedStyles: Record<ButtonRounded, string> = {
    default: "rounded-xl",
    full: "rounded-full",
  };
  const positionStyles = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };
  const sizeStyles = {
    sm: "py-2 text-xs",
    lg: "py-5 text-xs",
  };
  const widthStyles = {
    fit: "w-fit",
    full: "w-full",
  };
  const heightStyles = {
    none: "",
    height: "h-[32px] pl-2 pr-3 rounded-full",
  };
  const iconStyles = {
    sm: "16",
    md: "20",
    lg: "24",
  };
  const baseStyles = `flex  gap-1 items-center`;

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${heightStyles[height]} ${
          disabled
            ? "border border-gray-300 bg-gray-300 text-white"
            : `${bgStyles[bg]} ${borderStyles[border]} ${borderColorStyles[borderColor]} ${textStyles[textColor]}`
        } ${sizeStyles[size]} ${roundedStyles[rounded]} ${positionStyles[position]} ${widthStyles[width]} `}
      >
        <span
          className={`${GeistSans.className} flex items-center justify-start gap-[6px] px-[6px] font-light`}
        >
          {Icon && <Icon size={iconStyles[iconSize]} />}

          {label}
        </span>
      </button>
    </>
  );
};

export default Button;
