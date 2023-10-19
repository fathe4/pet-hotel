"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import qs from "query-string";
import Image from "next/image";

interface CategoryBoxProps {
  id: string;
  label: string;
  imgSrc: string;
  selected?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({ id, imgSrc, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const udpatedQuery: any = {
      ...currentQuery,
      category: id,
    };

    // If click same category, that category will remove
    if (params?.get("category") === id) {
      delete udpatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: udpatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
          flex 
          flex-col 
          items-center 
          justify-center 
          gap-2
          px-6
          border-b-2
          hover:text-neutral-800
          transition
          cursor-pointer
          ${
            selected
              ? "border-b-neutral-800 text-neutral-800"
              : "border-transparent text-neutral-500"
          }
        `}
    >
      <Image src={imgSrc} width={40} height={40} alt={label} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
