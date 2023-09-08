import * as React from 'react';
import style from './style/Register.module.scss';


interface RegisterProps{
    setLoginOrRegister: React.Dispatch<React.SetStateAction<'LOGIN' | 'REGISTER'>>;
    mobile: boolean;
}

const Register: React.FC<RegisterProps> = ({ setLoginOrRegister, mobile }) => {

    const handleSignUp = ()=>{

    }

    return(
        <form onSubmit={handleSignUp} className={style.Register}>
            <input placeholder='Email...' type="email"/>
            <input placeholder='Repeat email...' type="email"/>
            <div className={style.emailValidation}>
                <span>Invalid email address</span>
                <span>Emails do not match</span>
            </div>
            <div className={style.line}/>
            <input placeholder='Password...' type="password"/>
            <input className={style.lastInput} placeholder='Repeat password...' type="password"/>
            <div className={style.passwordValidation}>
                <div className={style.left}>
                    <span>A lowercase letter</span>
                    <span>A capital letter</span>
                    <span>A number</span>
                    <span>Minimum 8 characters</span>
                </div>
                <div className={style.right}>
                    <span>Passwords match</span>
                </div>
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