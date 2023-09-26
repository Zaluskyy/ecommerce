"use client"

import React, {useState, useEffect, useContext} from 'react';
import style from './style/Account.module.scss';
import Image from 'next/image';

import Login from './Login';
import Register from './Register';

import account from '../../../public/img/icon/account.svg'
import EcommerceContext from '../store/context';

export default function Account(){

    const context = useContext(EcommerceContext)
    const { mobile, loginOrRegister, setLoginOrRegister } = context
    
    return(
        <div className={style.Account}>

            {mobile&&
            <div className={style.title}>
                <div className={style.iconContainer}>
                    <Image src={account} alt="icon" />
                </div>
                {loginOrRegister=="LOGIN"?<span>Login</span>:<span>Register</span>}
            </div>
            }

            {mobile&&(loginOrRegister=="LOGIN"?
            <Login setLoginOrRegister={setLoginOrRegister} mobile={mobile} />
            :
            <Register setLoginOrRegister={setLoginOrRegister} mobile={mobile} />
            )}

            {!mobile&&
            <div className={style.accountForms}>
                <div className={style.left}>
                    <div className={style.title}>
                        <div className={style.iconContainer}>
                            <Image src={account} alt="icon" />
                        </div>
                        <span>Login</span>
                    </div>
                    <Login setLoginOrRegister={setLoginOrRegister} mobile={mobile} />
                </div>

                <div className={style.line}/>

                <div className={style.right}>
                    <div className={style.title}>
                        <div className={style.iconContainer}>
                            <Image src={account} alt="icon" />
                        </div>
                        <span>Register</span>
                    </div>

                    <Register setLoginOrRegister={setLoginOrRegister} mobile={mobile} />    
                </div>
            </div>
            }
        </div>
    )
}