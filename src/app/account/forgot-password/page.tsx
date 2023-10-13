"use client"

import React, { useState } from 'react';
import style from './ForgotPassword.module.scss' 
import Image from 'next/image';

import account from '../../../../public/img/icon/account.svg'

import {Formik, Form, Field} from 'formik';
import { forgotPassword } from '../../components/Schema';


export default function ForgotPassword(){

    const [sent, setSent] = useState<boolean>(false)

    const handleResetPassword = ()=>{
        console.log("reset password")
        setSent(true)
    }   

    return(
        <>
        <div className={style.ForgotPassword}>
            
            <div className={style.title}>
                <div className={style.iconContainer}>
                    <Image 
                    src={account} 
                    alt="icon" 
                    width={40}
                    height={40}
                    priority={true}
                    />
                </div>
                <span>Forgot password</span>
            </div>

            <div className={style.spanContainer}>
            {!sent&&<span>Enter your register email below to receive password reset instruction</span>}
            {sent&&<span>Check your email. There is an email with link to reset your password</span>}
            </div>

            {!sent&&

            <Formik
            initialValues={{email: ''}}
            validationSchema={forgotPassword}
            onSubmit={handleResetPassword}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                        placeholder="Email..."
                        type="email" 
                        name="email"
                        className={errors.email&&touched.email&&style.errorInput}
                        />

                        <div>
                        {errors.email&&touched.email&&<span className={style.invalidData}>{errors.email}</span>}
                        </div>

                        <button type="submit">Reset your password</button>
                    </Form>
                )}

            </Formik>
            }

        </div>
    </>
    )
}