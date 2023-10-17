import React, {FC, useContext, useEffect} from 'react';
import style from './style/Done.module.scss';
import Image, {StaticImageData} from 'next/image';
import Link from 'next/link';

import emailIcon from '../../../public/img/icon/email.svg'
import EcommerceContext from '../store/context';

interface DoneProps{}

const Done: FC<DoneProps> = () => {

    const context = useContext(EcommerceContext)
    const {setCartProducts, setSelectedDelivery, setSelectedPayment} = context

    interface ICartProducts {
        id: number,
        name: string,
        price: number,
        img: StaticImageData,
        piece: number,
    }

    const products: ICartProducts[] = []

    useEffect(()=>{
        setCartProducts(products)
        setSelectedDelivery(null)
        setSelectedPayment(null)
    }, [])

    return(
        <div className={style.Done}>
            <h3>Order completed!</h3>
            <span>Thank you</span>
            <span className={style.message} >We will send you an email with all the order details.</span>
            <div className={style.iconContainer}>
                <Image 
                src={emailIcon} 
                alt="email icon"
                width={24}
                height={24}
                priority={false}
                />
            </div>
            <div className={style.contact}>
                <span>If you have any additional questions, </span>
                <Link href="./contact">contact us</Link>
            </div>
        </div>
    )
}

export default Done