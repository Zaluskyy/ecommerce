"use client"
import React, { useState } from 'react';
import style from './style//Page.module.scss';
import Image from 'next/image';

import ProgressBar from './ProgressBar';
import Cart from './Cart';

import cart from '../../../public/img/icon/cart.svg'
import delivery from '../../../public/img/icon/delivery.svg'
import summary from '../../../public/img/icon/summary.svg'
import done from '../../../public/img/icon/done.svg'



export default function CartPage(){

    const titleIcons = [
        {title: 'Cart', icon: cart},
        {title: 'Delivery', icon: delivery},
        {title: 'Summary', icon: summary},
        {title: 'Done', icon: done},
    ]

    const [currentProgress, setCurrentProgress] = useState<number>(1)

    return(
        <div className={style.CartPage}>

            <ProgressBar currentProgress={currentProgress} />

            <div className={style.title}>
                <div className={style.iconContainer}>
                    <Image src={titleIcons[currentProgress-1].icon} alt="icon" />
                </div>
                <span>{titleIcons[currentProgress-1].title}</span>
            </div>

            <Cart/>
        
        </div>
    )
}