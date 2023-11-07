"use client";
import React, { createContext, ReactNode, useState, useEffect } from "react";
import { StaticImageData } from "next/image";
import { useCookies } from "react-cookie";

const EcommerceContext = createContext<any>({} as any);

export const EcommerceContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  interface ICartProducts {
    id: number;
    name: string;
    price: number;
    img: StaticImageData;
    category: string;
    piece: number;
  }

  const products: ICartProducts[] = [];

  interface IDelivery {
    name: string;
    price: number;
    icon: string;
  }
  interface IPayment {
    name: string;
    price: number;
    icon: string;
  }

  const [selectedDelivery, setSelectedDelivery] = useState<IDelivery | null>(
    null
  );
  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);

  const [cookies, setCookies] = useCookies(["cartProducts", "auth-token"]);

  const [mobile, setMobile] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loginOrRegister, setLoginOrRegister] = useState<"LOGIN" | "REGISTER">(
    "LOGIN"
  );

  const [cartProducts, setCartProducts] = useState<ICartProducts[]>(products);

  useEffect(() => {
    const cartFromCookies = cookies.cartProducts || [];
    setCartProducts(cartFromCookies);

    setIsAuth(cookies["auth-token"] ? true : false);
  }, []);

  return (
    <EcommerceContext.Provider
      value={{
        mobile,
        setMobile,
        loginOrRegister,
        setLoginOrRegister,
        isAuth,
        setIsAuth,
        cartProducts,
        setCartProducts,
        selectedDelivery,
        setSelectedDelivery,
        selectedPayment,
        setSelectedPayment,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

export default EcommerceContext;
