"use client"
import React, { useContext, useState, useEffect } from 'react';
import style from './style//Page.module.scss';
import Image from 'next/image';

import ProgressBar from './ProgressBar';

import Cart from './Cart';
import DeliveryAndPayment from './DeliveryAndPayment';
import Summary from './Summary';
import Done from './Done';

import cart from '../../../public/img/icon/cart.svg'
import delivery from '../../../public/img/icon/delivery.svg'
import summary from '../../../public/img/icon/summary.svg'
import done from '../../../public/img/icon/done.svg'
import EcommerceContext from '../store/context';

export default function CartPage(){

    const context = useContext(EcommerceContext)
    const { isAuth, cartProducts, selectedDelivery, selectedPayment } = context

    const titleIcons = [
        {title: 'Cart', icon: cart},
        {title: 'Delivery & Payment', icon: delivery},
        {title: 'Summary', icon: summary},
        {title: 'Done', icon: done},
    ]

    const components = [
        <Cart/>,
        <DeliveryAndPayment/>,
        <Summary/>,
        <Done/>
    ]

    const [currentProgress, setCurrentProgress] = useState<number>(1)

    const handlePrevNextBtn = (next: boolean)=>{
        if (!isAuth) window.location.href = "/account";
        else {
            if(next) {
                if(currentProgress==2) {
                    if(selectedDelivery&&selectedPayment) {
                        setCurrentProgress(prev=>prev+1)
                        //tutaj dodaj powiadomienie
                    }
                }
                else setCurrentProgress(prev=>prev+1)
            }
            else setCurrentProgress(prev=>prev-1)
        }
    }

    return(
        <div className={style.CartPage}>

            <div className={style.top}>
                {cartProducts.length>0&&<ProgressBar 
                currentProgress={currentProgress} 
                setCurrentProgress={setCurrentProgress} 
                />}

                <div className={style.title}>
                    <div className={style.iconContainer}>
                        <Image src={titleIcons[currentProgress-1].icon} alt="icon" />
                    </div>
                    <span>{titleIcons[currentProgress-1].title}</span>
                </div>
            </div>

            {components[currentProgress-1]}

            {cartProducts.length>0&&currentProgress<4&&
            <div className={style.buttonContainer}>

                {currentProgress!==1&&
                <button
                className={currentProgress==3?`${style.prev} ${style.smallerText}`: style.prev}
                onClick={()=>handlePrevNextBtn(false)}
                >{titleIcons[currentProgress-2].title}</button>}

                <button
                className={currentProgress==1?`${style.next} ${style.bigger}`: style.next}
                onClick={()=>handlePrevNextBtn(true)}
                >{titleIcons[currentProgress].title}</button>
                
            </div>}        
        </div>
    )
}