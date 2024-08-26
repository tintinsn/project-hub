import { GeistSans } from "geist/font/sans";
import React from "react";
import { IconType } from "react-icons";

type ButtonVariant = "default" | "outline" | "danger";
type ButtonRounded = "default" | "full";
type ButtonPosition = "start" | "center" | "end";
type ButtonSize = "sm" | "lg";
type ButtonWidth = "fit" | "full";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: IconType;
  variant?: ButtonVariant;
  rounded?: ButtonRounded;
  position?: ButtonPosition;
  size?: ButtonSize;
  width?: ButtonWidth;
}

const Button = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  variant = "default",
  rounded = "default",
  position = "start",
  size = "sm",
  width = "fit",
}: ButtonProps) => {
  const baseStyles = `flex h-[32px] gap-1 items-center  rounded-full pl-2 pr-3 `;
  const variantStyles: Record<ButtonVariant, string> = {
    default: `border border-black bg-black text-white`,
    outline: `border border-gray-300 bg-white text-black`,
    danger: `bg-[#E50815] text-white`,
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
    lg: "py-5 font-xs",
  };
  const widthStyles = {
    fit: "w-fit",
    full: "w-full",
  };
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyles[rounded]} ${positionStyles[position]} ${widthStyles[width]}`}
      >
        <span
          className={`${GeistSans.className} flex items-center justify-start gap-[6px] px-[6px] font-light`}
        >
          {Icon && <Icon size={16} />}
          {label}
        </span>
      </button>
    </>
  );
};

export default Button;
