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
import ChangeRecipientsData from './ChangeRecipientsData';

import { AnimatePresence } from 'framer-motion';


export default function CartPage(){

    const [changeRecipientsData, setChangeRecipientsData] = useState<boolean>(false)

    useEffect(()=>{
        changeRecipientsData?document.body.style.overflow = 'hidden': document.body.style.overflow = 'auto';
    }, [changeRecipientsData])

    const titleIcons = [
        {title: 'Cart', icon: cart},
        {title: 'Delivery & Payment', icon: delivery},
        {title: 'Summary', icon: summary},
        {title: 'Done', icon: done},
    ]

    const components = [
        <Cart/>,
        <DeliveryAndPayment setChangeRecipientsData={setChangeRecipientsData}/>,
        <Summary/>,
        <Done/>
    ]

    const [currentProgress, setCurrentProgress] = useState<number>(3)

    return(
        <div className={style.CartPage}>

            <div className={style.top}>
                <ProgressBar 
                currentProgress={currentProgress} 
                setCurrentProgress={setCurrentProgress} 
                />

                <div className={style.title}>
                    <div className={style.iconContainer}>
                        <Image src={titleIcons[currentProgress-1].icon} alt="icon" />
                    </div>
                    <span>{titleIcons[currentProgress-1].title}</span>
                </div>
            </div>

            {components[currentProgress-1]}

            {currentProgress<4&&
            <div className={style.buttonContainer}>

                {currentProgress!==1&&
                <button
                className={currentProgress==3?`${style.prev} ${style.smallerText}`: style.prev}
                onClick={()=>setCurrentProgress(prev=>prev-1)}
                >{titleIcons[currentProgress-2].title}</button>}

                <button
                className={currentProgress==1?`${style.next} ${style.bigger}`: style.next}
                onClick={()=>setCurrentProgress(prev=>prev+1)}
                >{titleIcons[currentProgress].title}</button>
                
            </div>}

            <AnimatePresence
            mode={'wait'}
            initial={false}
            onExitComplete={()=>null}
            >
                {changeRecipientsData&&
                <ChangeRecipientsData setChangeRecipientsData={setChangeRecipientsData} />
                }
            </AnimatePresence>
        
        </div>
    )
}