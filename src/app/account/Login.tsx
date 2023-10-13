import React from 'react';
import style from './style/Login.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import googleicon from '../../../public/img/icon/google.svg';

import { loginSchema } from '../components/Schema';

import { Field, Form, Formik } from 'formik'

interface LoginProps{
    setLoginOrRegister: React.Dispatch<React.SetStateAction<'LOGIN' | 'REGISTER'>>;
    mobile: boolean;
}

const Login: React.FC<LoginProps> = ({ setLoginOrRegister, mobile }) => {

    const handleLogin = ()=>{
        console.log("handleLogin")
    }

    return(
        <div className={style.Login}>

            <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                        placeholder="Email..."
                        type="email" 
                        name="email"
                        className={errors.email&&touched.email&&style.errorInput}
                        />

                        <Field
                        placeholder="Password..."
                        type="password" 
                        name="password"
                        className={errors.password&&touched.password&&style.errorInput}
                        />

                        <div>
                            <span className={style.invalidData}>
                                {/* Wrong email or password */}
                            </span>
                            <Link className={style.forgotPassword} href="/account/forgot-password">
                                Forgot password?
                            </Link>
                        </div>

                        <button type="submit">Login</button>
                    </Form>
                )}

            </Formik>
            
            <div className={style.or}>
                <div></div>
                <span>or</span>
                <div></div>
            </div>

            <button className={style.googleLogin}>
                <div className={style.iconContainer}>
                    <Image 
                    src={googleicon} 
                    alt="google icon"
                    width={24}
                    height={24}
                    priority={false}
                    />
                </div>
                <span>Google</span>
            </button>

            {mobile&&<div className={style.noAccount}>
                <span>Don’t you have an account?</span>
                <span onClick={()=>setLoginOrRegister('REGISTER')}>Sign Up</span>
            </div>}

        </div>
    )
}

export default Login