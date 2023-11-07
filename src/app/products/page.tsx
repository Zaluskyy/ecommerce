import React, { FC } from "react";
import style from "./Products.module.scss";
import Products from "../components/Products";

interface ProductsPageProps {}

const ProductsPage: FC<ProductsPageProps> = () => {
  return (
    <div className={style.Products}>
      <span className={style.title}>Products</span>

      <Products which={"EVERY"} />
    </div>
  );
};

export default ProductsPage;
