import React, {FC} from 'react';
import style from './style/Done.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import emailIcon from '../../../public/img/icon/email.svg'

interface DoneProps{}

const Done: FC<DoneProps> = () => {

    return(
        <div className={style.Done}>
            <h3>Order completed!</h3>
            <span>Thank you</span>
            <span className={style.message} >We will send you an email with all the order details.</span>
            <div className={style.iconContainer}>
                <Image src={emailIcon} alt="email icon"/>
            </div>
            <div className={style.contact}>
                <span>If you have any additional questions, </span>
                <Link href="./contact">contact us</Link>
            </div>
        </div>
    )
}

export default Done