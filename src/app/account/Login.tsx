import React, { useContext } from 'react';
import style from './style/Login.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import googleicon from '../../../public/img/icon/google.svg';

import { loginSchema } from '../components/Schema';

import { Field, Form, Formik } from 'formik'

import ButtonAnimation from '../UI/ButtonAnimation';

import EcommerceContext from '../store/context';

import { useCookies } from 'react-cookie';

import toast from 'react-hot-toast';

import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

interface LoginProps{
    setLoginOrRegister: React.Dispatch<React.SetStateAction<'LOGIN' | 'REGISTER'>>;
    mobile: boolean;
}

const Login: React.FC<LoginProps> = ({ setLoginOrRegister, mobile }) => {

    const context = useContext(EcommerceContext)
    const { setIsAuth } = context

    const [, setCookie] = useCookies(['auth-token']);

    interface IFormValues{
        email: string,
        password: string
    }

    const handleLogin = async(values: IFormValues)=>{
        const { email, password } = values
        try{
            const result = await signInWithEmailAndPassword(auth, email, password)
            const user = result.user

            if(user.emailVerified){
                toast.success("You are logged")
                setCookie('auth-token', user.refreshToken)
                setIsAuth(true)
            }else{
                toast.error("Verify email")
                try{
                    await sendEmailVerification(user);
                    toast("sent email verification")
                }catch{
                    toast.error("Failed to send email")
                }
            }

        }catch{
            toast.error("Wrong email or password")
        }

    }

    const signInWithGoogle = async()=>{
        try{
            const result = await signInWithPopup(auth, googleProvider)
            setCookie('auth-token', result.user.refreshToken)
            setIsAuth(true)
            toast.success("You are logged")
        } catch(err){
            toast.error("Login failed")
        }
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

                        <ButtonAnimation type="submit">Login</ButtonAnimation>
                    </Form>
                )}

            </Formik>
            
            <div className={style.or}>
                <div></div>
                <span>or</span>
                <div></div>
            </div>

            <ButtonAnimation onClick={signInWithGoogle} className={style.googleLogin}>
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
            </ButtonAnimation>

            {mobile&&<div className={style.noAccount}>
                <span>Don&apos;t you have an account?</span>
                <span onClick={()=>setLoginOrRegister('REGISTER')}>Sign Up</span>
            </div>}

        </div>
    )
}

export default Login