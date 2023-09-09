import * as React from 'react';
import style from './style/Register.module.scss';

import { useFormik } from 'formik';


interface RegisterProps{
    setLoginOrRegister: React.Dispatch<React.SetStateAction<'LOGIN' | 'REGISTER'>>;
    mobile: boolean;
}

const Register: React.FC<RegisterProps> = ({ setLoginOrRegister, mobile }) => {


    // const {} = useFormik({
    //     initialValues: {
    //         email
    //     }
    // })


    return(
        <form className={style.Register}>
            <input placeholder='Name...' type="text"/>
            <div className={style.errorContainer}>
                <span className={style.error}>Please enter name</span>
            </div>
            <input placeholder='Email...' type="email"/>
            <div className={style.errorContainer}>
                <span className={style.error}>Please enter a valid email</span>
            </div>
            <input placeholder='Password...' type="password"/>
            <div className={style.errorContainer}>
                <span className={style.error}>Your password have to include at least 1 lower case letter, 1 uppercase letter, 1 numerical digit and one special character</span>
            </div>
            <input placeholder='Repeat password...' type="password"/>
            <div className={style.errorContainer}>
                <span className={style.error}>Passwords must match</span>
            </div>

            <button className={style.signUp}>Sign up</button>

            {mobile&&<div className={style.existAccount}>
                <span>You already have an account?</span>
                <span onClick={()=>{setLoginOrRegister('LOGIN')}}>Login</span>
            </div>}
        </form>
    )
}

export default Register