import React, { FC, useContext, useState, useEffect } from "react";
import style from "./style/Summary.module.scss";
import Image, { StaticImageData } from "next/image";

import EcommerceContext from "../store/context";

import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

interface SummaryProps {}

const Summary: FC<SummaryProps> = () => {
  const context = useContext(EcommerceContext);
  const { cartProducts, selectedDelivery, selectedPayment } = context;

  const [displayName, setDisplayName] = useState<string | null>(null);
  const [displayEmail, setDisplayEmail] = useState<string | null>(null);

  const [displayTelephone, setDisplayTelephone] = useState<number | null>(null);
  const [displayStreet, setDisplayStreet] = useState<string | null>(null);
  const [displayApartmentNumber, setDisplayApartmentNumber] = useState<
    string | null
  >(null);
  const [displayZipCode, setDisplayZipCode] = useState<string | null>(null);
  const [displayCity, setDisplayCity] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setDisplayName(user.displayName);
        setDisplayEmail(user.email);
        const userDocRef = doc(db, "account", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setDisplayTelephone(userData.telephone);
          setDisplayStreet(userData.street);
          setDisplayApartmentNumber(userData.apartmentNumber);
          setDisplayZipCode(userData.zipCode);
          setDisplayCity(userData.city);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  interface ICartProducts {
    name: string;
    price: number;
    img: StaticImageData;
    piece: number;
  }

  const products = cartProducts.map((item: ICartProducts) => {
    return (
      <div key={item.name} className={style.product}>
        <div className={style.imageContainer}>
          <Image
            src={item.img}
            alt="product img"
            width={100}
            height={100}
            priority={false}
          />
        </div>
        <div className={style.informationContainer}>
          <div className={style.top}>
            <span>{item.name}</span>
          </div>
          <div className={style.bottom}>
            <span className={style.pieces}>{item.piece} psc</span>
            <span className={style.price}>{item.price} zł</span>
          </div>
        </div>
      </div>
    );
  });

  interface IsummaryArr {
    name: string;
    text: string;
    price: number;
    icon: string;
  }

  const summaryArr: IsummaryArr[] = [
    {
      name: "Delivery",
      text: selectedDelivery?.name,
      price: selectedDelivery?.price,
      icon: selectedDelivery?.icon,
    },
    {
      name: "Payment",
      text: selectedPayment?.name,
      price: selectedPayment?.price,
      icon: selectedPayment?.icon,
    },
  ];

  const deliveryAndPaymentArr = summaryArr.map((item) => {
    return (
      <div key={item.name} className={style.tableContainer}>
        <span className={style.title}>{item.name}</span>
        <div className={style.container}>
          <div className={style.iconContainer}>
            <Image
              src={item.icon}
              alt="icon"
              width={undefined}
              height={undefined}
              priority={false}
            />
          </div>

          <div className={style.informationContainer}>
            <span>{item.text}</span>
            {(item.price == 0 || item.price) && (
              <span className={style.price}>{`${item.price} zł`}</span>
            )}
          </div>
        </div>
      </div>
    );
  });

  const styleProducts = {
    "--products": cartProducts.length,
  } as React.CSSProperties;

  let cartValue: number = 0;
  cartProducts.forEach((item: ICartProducts) => {
    cartValue += item.price * item.piece;
  });

  return (
    <div className={style.Summary}>
      <div className={style.left}>
        {deliveryAndPaymentArr}

        <div className={style.recipientDataContainer}>
          <span className={style.title}>Recipient&apos;s data</span>
          <div className={style.container}>
            {displayName && <span>{displayName}</span>}
            {displayTelephone && <span>+48 {displayTelephone}</span>}
            {displayEmail && <span>{displayEmail}</span>}
            {displayStreet && displayApartmentNumber && (
              <span>{`${displayStreet} ${displayApartmentNumber}`}</span>
            )}
            {displayZipCode && displayCity && (
              <span>{`${displayZipCode} ${displayCity}`}</span>
            )}
          </div>
        </div>
      </div>

      <div className={style.right}>
        <div className={style.cartContainer}>
          <span className={style.title}>Cart</span>
          <div className={style.container} style={styleProducts}>
            {products}
          </div>
        </div>

        <div className={style.priceSummary}>
          <div className={style.cartValue}>
            <span>Cart value</span>
            <span>{cartValue} zł</span>
          </div>
          <div className={style.delivery}>
            <span>Delivery</span>
            <span>{summaryArr[0].price} zł</span>
          </div>
          <div className={style.payment}>
            <span>Payment</span>
            <span>{summaryArr[1].price ? summaryArr[1].price : 0} zł</span>
          </div>

          <div className={style.line} />

          <div className={style.total}>
            <span>Total to pay</span>
            <span>
              {cartValue +
                (summaryArr[0].price ? summaryArr[0].price : 0) +
                (summaryArr[1].price ? summaryArr[1].price : 0)}{" "}
              zł
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
