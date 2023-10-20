import * as React from 'react';
import style from './style/Register.module.scss';

import { registerSchema } from '../components/Schema';

import { Field, Form, Formik } from 'formik'

import ButtonAnimation from '../UI/ButtonAnimation';

import toast from 'react-hot-toast';

import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth'


interface RegisterProps{
    setLoginOrRegister: React.Dispatch<React.SetStateAction<'LOGIN' | 'REGISTER'>>;
    mobile: boolean;
}

const Register: React.FC<RegisterProps> = ({ setLoginOrRegister, mobile }) => {


    interface IFormValues {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
      }

    const handleSignUp = async(values: IFormValues)=>{
        const {name, email, password} = values
        try{
            const result = await createUserWithEmailAndPassword(auth, email, password)
            const user = result.user;
            await updateProfile(user, {displayName: name})
            await sendEmailVerification(user);
            toast.success("Succesfully sign up, verify your email")

        }catch{
            toast.error("Something went wrong")
        }
    }

    return(
        <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }} 
        validationSchema={registerSchema}
        onSubmit={handleSignUp}
        >
            {({ errors, touched }) => (
            <Form className={style.Register}>
                <Field
                placeholder="Name..."
                type="text"
                name="name"
                className={errors.name&&touched.name&&style.errorInput}
                />
                <div className={style.errorContainer}>
                    {errors.name&&touched.name&&<span className={style.error}>{errors.name}</span>}
                </div>

                <Field
                placeholder="Email..."
                type="email"
                name="email"
                className={errors.email&&touched.email&&style.errorInput}
                />
                <div className={style.errorContainer}>
                    {errors.email&&touched.email&&<span className={style.error}>{errors.email}</span>}
                </div>

                <Field
                placeholder="Password..."
                type="password"
                name="password"
                className={errors.password&&touched.password&&style.errorInput}
                />
                <div className={style.errorContainer}>
                    {errors.password&&touched.password&&<span className={style.error}>{errors.password}</span>}
                </div>

                <Field
                placeholder="Repeat password..."
                name="confirmPassword"
                type="password"
                className={errors.confirmPassword&&touched.confirmPassword&&style.errorInput}
                />
                <div className={style.errorContainer}>
                    {errors.confirmPassword&&touched.confirmPassword&&<span className={style.error}>{errors.confirmPassword}</span>}
                </div>

                <ButtonAnimation type="submit" className={style.signUp}>Sign up</ButtonAnimation>

                {mobile&&<div className={style.existAccount}>
                    <span>You already have an account?</span>
                    <span onClick={()=>{setLoginOrRegister('LOGIN')}}>Login</span>
                </div>}
            </Form>
            )}
        </Formik>
    )
}

export default Register