"use client";
import style from "./Contact.module.scss";
import Image from "next/image";

import contactIcon from "../../../public/img/icon/contact.svg";

import callIcon from "../../../public/img/icon/call.svg";
import mailIcon from "../../../public/img/icon/mail.svg";
import locationIcon from "../../../public/img/icon/location.svg";

import { motion } from "framer-motion";

export default function Contact() {
  interface IContactArr {
    name: string;
    icon: string;
    href: string;
    text: string;
    text2?: string;
  }

  const contactArr: IContactArr[] = [
    {
      name: "Phone",
      icon: callIcon,
      href: "tel: +48 123 456 789",
      text: "+48 123 456 789",
    },
    {
      name: "Email",
      icon: mailIcon,
      href: "mailto: example@gmail.com",
      text: "example@gmail.com",
    },
    {
      name: "Adress",
      icon: locationIcon,
      href: "https://www.google.com/maps/place/Warszawa/@52.233033,20.8960435,11z/data=!3m1!4b1!4m6!3m5!1s0x471ecc669a869f01:0x72f0be2a88ead3fc!8m2!3d52.2296756!4d21.0122287!16zL20vMDgxbV8?entry=ttu",
      text: "Ul. Piękna 21",
      text2: "21-582 Warszawa",
    },
  ];

  const contact = contactArr.map((item) => {
    return (
      <div key={item.name} className={style.tableContainer}>
        <span>{item.name}</span>
        <motion.a
          href={item.href}
          target="_blank"
          className={style.container}
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
        >
          <div className={style.iconContainer}>
            <Image
              src={item.icon}
              alt="call icon"
              width={24}
              height={24}
              priority={false}
            />
          </div>
          <div className={style.right}>
            <span>{item.text}</span>
            {item.text2 && <span>{item.text2}</span>}
          </div>
        </motion.a>
      </div>
    );
  });

  return (
    <div className={style.Contact}>
      <div className={style.title}>
        <div className={style.iconContainer}>
          <Image
            src={contactIcon}
            alt="icon"
            width={40}
            height={40}
            priority={true}
          />
        </div>
        <span>Contact</span>
      </div>

      {contact}
    </div>
  );
}
