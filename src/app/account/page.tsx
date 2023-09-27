"use client"

import React, {useState, useEffect, useContext} from 'react';
import style from './style/Page.module.scss';
import Image from 'next/image';

import Login from './Login';
import Register from './Register';
import Account from './Account';


import accountIcon from '../../../public/img/icon/account.svg'
import settingsIcon from '../../../public/img/icon/settings.svg'
import ordersIcon from '../../../public/img/icon/orders.svg'

import EcommerceContext from '../store/context';

export default function Page(){

    const context = useContext(EcommerceContext)
    const { mobile, loginOrRegister, setLoginOrRegister, isAuth } = context

    const [accountDashboard, setAccountDashboard] = useState<"ORDERS"|"SETTINGS"|"">("")

    const getTitle = ()=>{
        if(!isAuth) {
            if(loginOrRegister=="LOGIN") return [accountIcon, 'Login']
            else return [accountIcon, 'Register']
        } else{
            if(accountDashboard=='') return [accountIcon, 'Account']
            else if(accountDashboard=='ORDERS') return [ordersIcon, 'Orders']
            else if(accountDashboard=='SETTINGS') return [settingsIcon, 'Account settings']
        }
        return [accountIcon, 'error']
    }

    return(
        <div className={style.Page}>

            {mobile&&
            <div className={style.title}>
                <div className={style.iconContainer}>
                    <Image src={getTitle()[0]} alt="icon" />
                </div>
                <span>{getTitle()[1]}</span>
            </div>
            }


            {/* !isAuth */}
            {mobile&&!isAuth&&(loginOrRegister=="LOGIN"?
            <Login setLoginOrRegister={setLoginOrRegister} mobile={mobile} />
            :
            <Register setLoginOrRegister={setLoginOrRegister} mobile={mobile} />
            )}

            {!mobile&&
            <div className={style.accountForms}>
                <div className={style.left}>
                    <div className={style.title}>
                        <div className={style.iconContainer}>
                            <Image src={accountIcon} alt="icon" />
                        </div>
                        <span>Login</span>
                    </div>
                    <Login setLoginOrRegister={setLoginOrRegister} mobile={mobile} />
                </div>

                <div className={style.line}/>

                <div className={style.right}>
                    <div className={style.title}>
                        <div className={style.iconContainer}>
                            <Image src={accountIcon} alt="icon" />
                        </div>
                        <span>Register</span>
                    </div>

                    <Register setLoginOrRegister={setLoginOrRegister} mobile={mobile} />    
                </div>
            </div>
            }


            {/* isAuth */}
            {isAuth&&mobile&&accountDashboard==''&&
            <Account setAccountDashboard={setAccountDashboard} />
            }



        </div>
    )
}