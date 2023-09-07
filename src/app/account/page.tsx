"use client"

import React, {useState} from 'react';
import style from './style/Account.module.scss';
import Image from 'next/image';

import Login from './Login';
import Register from './Register';

import account from '../../../public/img/icon/account.svg'

export default function Account(){

    const [loginOrRegister, setLoginOrRegister] = useState<"LOGIN"|"REGISTER">("LOGIN")
    
    return(
        <div className={style.Account}>
            <div className={style.title}>
                <div className={style.iconContainer}>
                    <Image src={account} alt="icon" />
                </div>
                {loginOrRegister=="LOGIN"?<span>Login</span>:<span>Register</span>}
            </div>

            {loginOrRegister=="LOGIN"?<Login setLoginOrRegister={setLoginOrRegister}/>:<Register setLoginOrRegister={setLoginOrRegister}/>}
        </div>
    )
}