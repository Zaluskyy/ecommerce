import React, { FC } from "react";
import style from "./styles/Categories.module.scss";
import Link from "next/link";

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = () => {
  interface ICategoriesArr {
    text: string;
    href: string;
  }

  const categoriesArr: ICategoriesArr[] = [
    { text: "Computer", href: "/products/computer" },
    { text: "Tablet", href: "/products/tablet" },
    { text: "Phone", href: "/products/phone" },
    { text: "Watch", href: "/products/watch" },
    { text: "Headphones", href: "/products/headphones" },
    { text: "Accessories", href: "/products/accessories" },
  ];

  const categories = categoriesArr.map((item: ICategoriesArr) => {
    return (
      <Link key={item.text} href={item.href}>
        {item.text}
      </Link>
    );
  });

  return <ul className={style.Categories}>{categories}</ul>;
};

export default Categories;
