import React, { FC, useContext } from 'react';
import style from './style/Summary.module.scss';
import Image, { StaticImageData } from 'next/image';

import personalCollectionIcon from '../../../public/img/icon/personalCollection.svg';

import EcommerceContext from '../store/context';

interface SummaryProps{}

const Summary: FC<SummaryProps> = () => {

    const context = useContext(EcommerceContext)
    const { cartProducts, selectedDelivery, selectedPayment } = context
    
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
                        <Image 
                        src={item.img}
                        alt="product img"
                        width={undefined}
                        height={undefined}
                        priority={false}
                        />
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
        price: number,
        icon: string,
    }

    const summaryArr: IsummaryArr[] = [
        {
            name: 'Delivery',
            text: selectedDelivery?.name,
            price: selectedDelivery?.price,
            icon: selectedDelivery?.icon,
        },
        {
            name: 'Payment',
            text: selectedPayment?.name,
            price: selectedPayment?.price,
            icon: selectedPayment?.icon,
        },
    ]

    const deliveryAndPaymentArr = summaryArr.map((item)=>{
        return(
            <div key={item.name} className={style.tableContainer}>
                <span className={style.title}>{item.name}</span>
                <div className={style.container}>
                    <div className={style.iconContainer}>
                        <Image 
                        src={item.icon} 
                        alt="icon"
                        width={undefined}
                        height={undefined}
                        priority={false}
                        />
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

    let cartValue: number = 0;
    cartProducts.forEach((item: ICartProducts) => {
        cartValue += item.price * item.piece;
    });

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
                
                <div className={style.priceSummary}>
                    <div className={style.cartValue}>
                        <span>Cart value</span>
                        <span>{cartValue} zł</span>
                    </div>
                    <div className={style.delivery}>
                        <span>Delivery</span>
                        <span>{summaryArr[0].price} zł</span>
                    </div>
                    <div className={style.payment}>
                        <span>Payment</span>
                        <span>{summaryArr[1].price?summaryArr[1].price:0} zł</span>
                    </div>

                    <div className={style.line}/>

                    <div className={style.total}>
                        <span>Total to pay</span>
                        <span>{cartValue + (summaryArr[0].price?summaryArr[0].price:0) + (summaryArr[1].price?summaryArr[1].price:0)} zł</span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Summary