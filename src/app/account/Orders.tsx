import React, { useState } from 'react';
import style from './style/Orders.module.scss';
import Image, { StaticImageData } from 'next/image';

import iphoneImg from  '../../../public/img/iphone.png';
import airdotsImg from  '../../../public/img/airdots.png';


interface OrdersProps{}

const Orders: React.FC<OrdersProps> = () => {

    interface IOrdersArr {
        completed: boolean,
        date: Date,
        number: number,
        price: number
        name: string,
        image: StaticImageData,
    }

    const ordersArr: IOrdersArr[] = [
        {
            completed: true,
            date: new Date(),
            number: 69420,
            price: 2137,
            name: "Iphone 14",
            image: iphoneImg,
        },
        {
            completed: true,
            date: new Date(),
            number: 69421,
            price: 1488,
            name: "Apple Airdots",
            image: airdotsImg,
        },
    ]

    const orders = ordersArr.map(item=>{
        return(
            <div key={item.number} className={style.orderContainer}>
                <div className={style.left}>
                    <span className={style.completed}>{item.completed?"Completed":"Not completed"}</span>
                    <span>{`${item.date.getDate()<10?`0${item.date.getDate()}`: item.date.getDate()}.${item.date.getMonth()<10?`0${item.date.getMonth()}`: item.date.getMonth()}.${item.date.getFullYear()}`}</span>
                    <span>Nr. {item.number}</span>
                    <span className={style.price}>{item.price} zł</span>
                </div>
                <div className={style.right}>
                    <span className={style.title}>{item.name}</span>
                    <div className={style.imgContainer}>
                        <Image 
                        src={item.image} 
                        alt="image"
                        width={40}
                        height={40}
                        priority={false}
                        />
                    </div>
                </div>
            </div>
        )
    })

    return(
        <div className={style.Orders}>
            {ordersArr.length==0&&
            <div className={style.nothing}>
                <span>You haven&apos;t placed any order yet</span>
            </div>
            }
            {true&&
            orders
            }
        </div>
    )
}

export default Orders