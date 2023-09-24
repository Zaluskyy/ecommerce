import React, {FC} from 'react';
import style from './style/Summary.module.scss';
import Image, {StaticImageData} from 'next/image';

import personalCollectionIcon from '../../../public/img/icon/personalCollection.svg';


import iphone from '../../../public/img/iphone.png'
import airdots from '../../../public/img/airdots.png'

interface SummaryProps{}

const Summary: FC<SummaryProps> = () => {

    interface IsummaryArr {
        name: string,
        text: string,
        price?: number,
        icon: string,
    }

    const summaryArr: IsummaryArr[] = [
        {
            name: 'Delivery',
            text: 'Personal collection',
            price: 0,
            icon: personalCollectionIcon,
        },
        {
            name: 'Payment',
            text: 'Pay Pal',
            icon: personalCollectionIcon,
        },
    ]

    interface IproductsArr{
        image: StaticImageData,
        name: string,
        pieces: number,
        price: number,
        id: number
    }

    const productsArr: IproductsArr[] = [
        {
            image: iphone,
            name: 'Iphone 15',
            pieces: 1,
            price: 1488,
            id: 1,
        },
        {
            image: airdots,
            name: 'Apple Airdots',
            pieces: 1,
            price: 2137,
            id: 2,
        },
    ]

    const deliveryAndPaymentArr = summaryArr.map((item)=>{
        return(
            <div key={item.name} className={style.tableContainer}>
                <span className={style.title}>{item.name}</span>
                <div className={style.container}>
                    <div className={style.iconContainer}>
                        <Image src={personalCollectionIcon} alt="icon"/>
                    </div>

                    <div className={style.informationContainer}>
                        <span>{item.text}</span>
                        {(item.price==0||item.price)&&
                            <span className={style.price}>{`${item.price} zł`}</span>}
                    </div>
                </div>

            </div>
        )
    })

    const products = productsArr.map((item)=>{
        return(
                <div key={item.id} className={style.product}>
                    <div className={style.imageContainer}>
                        <Image src={item.image} alt="product img"/>
                    </div>
                    <div className={style.informationContainer}>
                        <div className={style.top}>
                            <span>{item.name}</span>
                        </div>
                        <div className={style.bottom}>
                            <span className={style.pieces}>{item.pieces} psc</span>
                            <span className={style.price}>{item.price} zł</span>
                        </div>
                    </div>
                </div>
        )
    })

    const styleProducts = { "--produsts": productsArr.length } as React.CSSProperties;

    return(
        <div className={style.Summary}>
            <div className={style.left}>

                {deliveryAndPaymentArr}

                <div className={style.recipientDataContainer}>
                    <span className={style.title}>Recipient's data</span>
                    <div className={style.container}>
                        <span>Adolf Hitler</span>
                        <span>+48 537 728 008</span>
                        <span>adohit88@gmail.com</span>
                    </div>
                </div>

            </div>

            <div className={style.right}>

                <div className={style.cartContainer}>
                    <span className={style.title}>Cart</span>
                    <div className={style.container} style={styleProducts} >
                        {products}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Summary