"use client";
import React, { FC } from "react";
import style from "./NotFound.module.scss";
import Link from "next/link";
import ButtonAnimation from "./UI/ButtonAnimation";

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = () => {
  return (
    <div className={style.NotFound}>
      <span>404 not found</span>
      <Link href="/">
        <ButtonAnimation>Go to the homepage</ButtonAnimation>
      </Link>
    </div>
  );
};
export default NotFound;
