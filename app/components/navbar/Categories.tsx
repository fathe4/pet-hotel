"use client";

import { usePathname, useSearchParams } from "next/navigation";

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { useGetPetTypesQuery } from "@/redux/api/petTypeApi";
import { petType } from "@/app/types";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const { data: petTypes } = useGetPetTypesQuery({});
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
            pt-2
            flex 
            flex-row 
            items-center 
            justify-center
            overflow-x-auto
          "
      >
        {petTypes?.map((item: petType) => (
          <CategoryBox
            key={item.id}
            id={item.id}
            label={item.typeName}
            imgSrc={item.imgSrc}
            selected={category === item.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
