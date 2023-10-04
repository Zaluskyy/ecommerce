import React, { FC, useContext } from 'react';
import style from './style/Summary.module.scss';
import Image, { StaticImageData } from 'next/image';

import personalCollectionIcon from '../../../public/img/icon/personalCollection.svg';

import EcommerceContext from '../store/context';

interface SummaryProps{}

const Summary: FC<SummaryProps> = () => {

    const context = useContext(EcommerceContext)
    const { cartProducts } = context
    
    interface ICartProducts {
        name: string,
        price: number,
        img: StaticImageData,
        piece: number,
    }   

    const products = cartProducts.map((item: ICartProducts)=>{
        return(
                <div key={item.name} className={style.product}>
                    <div className={style.imageContainer}>
                        <Image src={item.img} alt="product img"/>
                    </div>
                    <div className={style.informationContainer}>
                        <div className={style.top}>
                            <span>{item.name}</span>
                        </div>
                        <div className={style.bottom}>
                            <span className={style.pieces}>{item.piece} psc</span>
                            <span className={style.price}>{item.price} zł</span>
                        </div>
                    </div>
                </div>
        )
    })


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

    const styleProducts = { "--products": cartProducts.length } as React.CSSProperties;

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