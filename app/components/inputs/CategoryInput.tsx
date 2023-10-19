"use client";

import Image from "next/image";
import { FC } from "react";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  imgSrc: string;
}

const CategoryInput: FC<CategoryInputProps> = ({
  onClick,
  selected,
  label,
  imgSrc,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer 
            ${selected ? "border-black" : "border-neutral-200"}`}
    >
      <Image src={imgSrc} width={40} height={40} alt={label} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
