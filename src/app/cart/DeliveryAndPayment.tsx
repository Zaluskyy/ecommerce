import React, { FC, useContext, useState, useEffect } from "react";
import style from "./style/DeliveryAndPayment.module.scss";

import Image from "next/image";

import courierIcon from "../../../public/img/icon/courier.svg";
import personalCollectionIcon from "../../../public/img/icon/personalCollection.svg";
import inpostIcon from "../../../public/img/icon/inpost.svg";

import blikIcon from "../../../public/img/icon/blik.svg";
import paypalIcon from "../../../public/img/icon/paypal.svg";

import { AnimatePresence } from "framer-motion";

import EditDataPopUp from "../components/EditDataPopUp";

import { adressSchema } from "../components/Schema";

import EcommerceContext from "../store/context";

import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

interface DeliveryAndPaymentProps {}

const DeliveryAndPayment: FC<DeliveryAndPaymentProps> = ({}) => {
  const context = useContext(EcommerceContext);
  const {
    selectedDelivery,
    setSelectedDelivery,
    selectedPayment,
    setSelectedPayment,
  } = context;

  const [editData, setEditData] = useState<number>(-1);
  const [renderFromEdit, setRenderFromEdit] = useState<boolean>(false);

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
  }, [renderFromEdit]);

  const changeData = {
    title: "Your delivery data",
    initVal: {
      fullName: `${displayName ? displayName : ""}`,
      street: `${displayStreet ? displayStreet : ""}`,
      apartmentNumber: `${
        displayApartmentNumber ? displayApartmentNumber : ""
      }`,
      zipCode: `${displayZipCode ? displayZipCode : ""}`,
      city: `${displayCity ? displayCity : ""}`,
      telephone: `${displayTelephone ? displayTelephone : ""}`,
    },
    schema: adressSchema,
    inputs: [
      {
        placeholder: "Full name",
        type: "text",
        name: "fullName",
      },
      {
        placeholder: "Street",
        type: "text",
        name: "street",
      },
      {
        placeholder: "Apartment number",
        type: "text",
        name: "apartmentNumber",
      },
      {
        placeholder: "ZIP code",
        type: "text",
        name: "zipCode",
      },
      {
        placeholder: "City",
        type: "text",
        name: "city",
      },
      {
        placeholder: "Telephone",
        type: "text",
        name: "telephone",
      },
    ],
  };

  interface IArr {
    name: string;
    price?: number;
    icon: string;
  }

  const deliveryArr: IArr[] = [
    { name: "Courier", price: 20, icon: courierIcon },
    { name: "Personal collection", price: 0, icon: personalCollectionIcon },
    { name: "Inpost", price: 13, icon: inpostIcon },
  ];

  const paymentArr: IArr[] = [
    { name: "Blik", icon: blikIcon },
    { name: "Paypal", price: 0, icon: paypalIcon },
  ];

  const deliveries = deliveryArr.map((item, index) => {
    const styleTop = { "--top": index } as React.CSSProperties;

    return (
      <div
        key={item.name}
        style={styleTop}
        className={
          selectedDelivery?.name == item.name
            ? `${style.active} ${style.container}`
            : `${style.container}`
        }
        onClick={() =>
          setSelectedDelivery({
            name: item.name,
            price: item.price,
            icon: item.icon,
          })
        }
      >
        <div className={style.radioConatiner}>
          <input
            value={item.name}
            checked={selectedDelivery?.name == item.name}
            onChange={() =>
              setSelectedDelivery({
                name: item.name,
                price: item.price,
                icon: item.icon,
              })
            }
            type="radio"
            name="delivery"
          />
        </div>
        <div className={style.informationContainer}>
          <div>
            <span>{item.name}</span>
            <span>{item.price} zł</span>
          </div>
          <div className={style.iconContainer}>
            <Image
              src={item.icon}
              alt="courier icon"
              width={undefined}
              height={undefined}
              priority={false}
            />
          </div>
        </div>
      </div>
    );
  });

  const payment = paymentArr.map((item, index) => {
    const styleTop = { "--top": index } as React.CSSProperties;

    return (
      <div
        key={item.name}
        style={styleTop}
        className={
          selectedPayment?.name == item.name
            ? `${style.active} ${style.container}`
            : `${style.container}`
        }
        onClick={() =>
          setSelectedPayment({
            name: item.name,
            price: item.price,
            icon: item.icon,
          })
        }
      >
        <div className={style.radioConatiner}>
          <input
            value={item.name}
            checked={selectedPayment?.name == item.name}
            onChange={() =>
              setSelectedPayment({
                name: item.name,
                price: item.price,
                icon: item.icon,
              })
            }
            type="radio"
            name="payment"
          />
        </div>
        <div className={style.informationContainer}>
          <div className={style.center}>
            <span>{item.name}</span>
          </div>
          <div className={style.iconContainer}>
            <Image
              src={item.icon}
              alt="payment icon"
              width={undefined}
              height={undefined}
              priority={false}
            />
          </div>
        </div>
      </div>
    );
  });

  const styleDeliveryHeight = {
    "--height": deliveryArr.length,
  } as React.CSSProperties;
  const stylePaymentHeight = {
    "--height": paymentArr.length,
  } as React.CSSProperties;

  return (
    <div className={style.DeliveryAndPayment}>
      <div className={style.left}>
        <div className={style.tableContainer}>
          <span className={style.title}>Delivery</span>
          <form style={styleDeliveryHeight}>{deliveries}</form>
        </div>

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

            <span className={style.change} onClick={() => setEditData(0)}>
              Change
            </span>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.tableContainer} style={stylePaymentHeight}>
          <span className={style.title}>Payment</span>
          <form>{payment}</form>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {editData !== -1 && (
          <EditDataPopUp
            setEditData={setEditData}
            title={changeData.title}
            initialValues={changeData.initVal}
            validationSchema={changeData.schema}
            inputs={changeData.inputs}
            setUpdatedFromEdit={setRenderFromEdit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeliveryAndPayment;
