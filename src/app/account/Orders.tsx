import React, { useEffect, useState } from "react";
import style from "./style/Orders.module.scss";
import Image from "next/image";

import { auth, db } from "../firebase";
import {
  collection,
  orderBy,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

interface OrdersProps {}

const Orders: React.FC<OrdersProps> = () => {
  interface IOrdersArr {
    completed: boolean;
    date: Date;
    id: number;
    img: string;
    name: string;
    piece: number;
    price: number;
  }

  const [ordersArr, setOrdersArr] = useState<IOrdersArr[]>([]);

  useEffect(() => {
    const getData = async () => {
      const user = auth.currentUser;
      const orderCollectionRef = collection(db, "order");

      if (user) {
        const queryOrder = query(
          orderCollectionRef,
          where("user", "==", user.uid),
          orderBy("date", "desc")
        );

        const newOrdersArr: IOrdersArr[] = [];
        const unsubscribe = onSnapshot(queryOrder, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            const orderData = doc.data();
            newOrdersArr.push({
              completed: orderData.completed,
              date: orderData.date.toDate(),
              id: orderData.id,
              img: orderData.img,
              name: orderData.name,
              piece: orderData.piece,
              price: orderData.price,
            });
          });

          setOrdersArr(newOrdersArr);
        });
      }
    };

    getData();
  }, []);

  const orders = ordersArr.map((item) => {
    return (
      <div key={item.id} className={style.orderContainer}>
        <div className={style.left}>
          <span className={style.completed}>
            {item.completed ? "Completed" : "Not completed"}
          </span>
          <span>{`${
            item.date.getDate() < 10
              ? `0${item.date.getDate()}`
              : item.date.getDate()
          }.${
            item.date.getMonth() < 10
              ? `0${item.date.getMonth()}`
              : item.date.getMonth()
          }.${item.date.getFullYear()}`}</span>
          <span>Nr. {item.id}</span>
          <span className={style.price}>{item.price} zł</span>
        </div>
        <div className={style.right}>
          <span className={style.title}>{item.name}</span>
          <div className={style.imgContainer}>
            <Image
              src={item.img}
              alt="image"
              width={40}
              height={40}
              priority={false}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={style.Orders}>
      {ordersArr.length == 0 && (
        <div className={style.nothing}>
          <span>You haven&apos;t placed any order yet</span>
        </div>
      )}
      {true && orders}
    </div>
  );
};

export default Orders;
