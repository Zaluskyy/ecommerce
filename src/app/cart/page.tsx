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

    const [currentProgress, setCurrentProgress] = useState<number>(2)

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
            <button onClick={()=>setCurrentProgress(prev=>prev+1)} className={style.nextStep}>{titleIcons[currentProgress].title}</button>
            }

            {changeRecipientsData&&<ChangeRecipientsData setChangeRecipientsData={setChangeRecipientsData} />}
        
        </div>
    )
}