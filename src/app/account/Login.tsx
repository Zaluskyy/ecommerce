import React from 'react';
import style from './style/Login.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import googleicon from '../../../public/img/icon/google.svg';


export default function Login(){

    const handleLogin = ()=>{

    }

    return(
        <div className={style.Login}>
            <form onSubmit={handleLogin}>
                <input placeholder='Email...' type="email"/>
                <input placeholder='Password...' type="password"/>
                <div>
                    <span className={style.invalidData}>Wrong email or password</span>
                    <Link className={style.forgotPassword} href="/account/forgot-password">
                    Forgot password?
                    </Link>

                </div>


                <button>Login</button>
            </form>

            <div className={style.or}>
                <div></div>
                <span>or</span>
                <div></div>
            </div>

            <button className={style.googleLogin}>
                <div className={style.iconContainer}>
                    <Image src={googleicon} alt="google icon"/>
                </div>
                <span>Google</span>
            </button>

            <div className={style.noAccount}>
                <span>Don’t you have an account?</span>
                <span>Sign Up</span>
            </div>

        </div>
    )
}