import React, { useContext } from "react";
import style from "./style/Dashboard.module.scss";
import Image from "next/image";

import ordersIcon from "../../../public/img/icon/orders.svg";
import settingsIcon from "../../../public/img/icon/settings.svg";
import arrowIcon from "../../../public/img/icon/arrow.svg";
import logoutIcon from "../../../public/img/icon/logout.svg";

import { useCookies } from "react-cookie";

import toast from "react-hot-toast";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import EcommerceContext from "../store/context";

interface DashboardProps {
  setAccountDashboard: React.Dispatch<
    React.SetStateAction<"ORDERS" | "SETTINGS" | "">
  >;
}

const Dashboard: React.FC<DashboardProps> = ({ setAccountDashboard }) => {
  const context = useContext(EcommerceContext);
  const { setIsAuth } = context;

  const [, , removeCookie] = useCookies(["auth-token"]);

  interface IDashboardArr {
    icon: string;
    name: string;
    goTo: string;
    logOut?: boolean;
  }

  const dashboardArr: IDashboardArr[] = [
    { icon: ordersIcon, name: "Orders", goTo: "ORDERS" },
    { icon: settingsIcon, name: "Account settings", goTo: "SETTINGS" },
    { icon: logoutIcon, name: "Logout", goTo: "SETTINGS", logOut: true },
  ];

  const handleSignOut = async () => {
    await signOut(auth);
    removeCookie("auth-token");
    setIsAuth(false);
    toast.success("Logged out");
  };

  const handleGoTo = (goTo: string, logout: boolean) => {
    if (!logout) setAccountDashboard(goTo as "ORDERS" | "SETTINGS");
    else {
      handleSignOut();
    }
  };

  const dashboard = dashboardArr.map((item) => {
    return (
      <div
        key={item.name}
        className={style.element}
        onClick={() => handleGoTo(item.goTo, item.logOut ? item.logOut : false)}
      >
        <div className={style.informationContainer}>
          <div className={style.imageContainer}>
            <Image
              src={item.icon}
              alt={`${item.name} icon`}
              width={24}
              height={24}
              priority={false}
            />
          </div>
          <span>{item.name}</span>
        </div>
        <div className={style.arrowContainer}>
          <Image
            src={arrowIcon}
            alt="arrow icon"
            width={24}
            height={24}
            priority={false}
          />
        </div>
      </div>
    );
  });

  return <div className={style.Dashboard}>{dashboard}</div>;
};

export default Dashboard;
