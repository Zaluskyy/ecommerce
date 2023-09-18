import React, {FC, useState} from 'react';
import style from './style/DeliveryAndPayment.module.scss';

import Image from 'next/image';

import courierIcon from '../../../public/img/icon/courier.svg'
import personalCollectionIcon from '../../../public/img/icon/personalCollection.svg';
import inpostIcon from '../../../public/img/icon/inpost.svg';

interface DeliveryAndPaymentProps{}

const DeliveryAndPayment: FC<DeliveryAndPaymentProps> = () => {

    interface IArr {
        name: string,
        price?: number,
        icon: string,
    }

    const deliveryArr: IArr[] = [
        {name: 'Courier', price: 20, icon: courierIcon},
        {name: 'Personal collection', price: 0, icon: personalCollectionIcon},
        {name: 'Inpost', price: 13, icon: inpostIcon},
    ] 

    const paymentArr: IArr[] = [
        {name: 'Blik', icon: courierIcon},
        {name: 'Paypal', price: 0, icon: personalCollectionIcon},
    ] 

    type deliveryOption = 'Courier' | 'Personal collection' | 'Inpost' | '';
    type paymentOption = 'Blik' | 'PayPal' | '';
    

    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<deliveryOption>("")
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<paymentOption>("")

    const handleDeliveryOptionChange = (e: deliveryOption)=>{
        setSelectedDeliveryOption(e)
    }
    const handlePaymentOptionChange = (e: paymentOption)=>{
        setSelectedPaymentOption(e)
    }
      
    const deliveries = deliveryArr.map((item, index)=>{
          
        const styleTop = { "--top": index } as React.CSSProperties;

        return(
            <div 
            key={item.name} 
            style={styleTop} 
            className={selectedDeliveryOption==item.name?`${style.active} ${style.container}`: `${style.container}`} 
            onClick={()=>handleDeliveryOptionChange(item.name as deliveryOption)}>
                <div className={style.radioConatiner}>
                    <input 
                    value={item.name} 
                    checked={selectedDeliveryOption==item.name}
                    onChange={()=>handleDeliveryOptionChange(item.name as deliveryOption)} 
                    type="radio" 
                    name="delivery"/>
                </div>
                <div className={style.informationContainer}>
                    <div>
                        <span>{item.name}</span>
                        <span>{item.price} zł</span>
                    </div>
                    <div className={style.iconContainer}>
                        <Image src={item.icon} alt="courier icon"/>
                    </div>

                </div>
            </div>
        )
    })


    const payment = paymentArr.map((item, index)=>{

        const styleTop = { "--top": index } as React.CSSProperties;

        return(
            <div 
            key={item.name} 
            style={styleTop}  
            className={selectedPaymentOption==item.name?`${style.active} ${style.container}`: `${style.container}`} 
            onClick={()=>handlePaymentOptionChange(item.name as paymentOption)}
            >
                <div className={style.radioConatiner}>
                    <input 
                    value={item.name} 
                    checked={selectedPaymentOption==item.name}
                    onChange={()=>handlePaymentOptionChange(item.name as paymentOption)} 
                    type="radio" 
                    name="payment"/>
                </div>
                <div className={style.informationContainer}>
                    <div className={style.center}>
                        <span>{item.name}</span>
                    </div>
                    <div className={style.iconContainer}>
                        <Image src={item.icon} alt="courier icon"/>
                    </div>

                </div>
            </div>
        )
    })

    const styleDeliveryHeight = { "--height":  deliveryArr.length} as React.CSSProperties;
    const stylePaymentHeight = { "--height":  paymentArr.length} as React.CSSProperties;

    return(
        <div className={style.DeliveryAndPayment}>
            <div className={style.tableContainer}>
                <span className={style.title}>Delivery</span>
                <form style={styleDeliveryHeight}>
                    {deliveries}
                </form>
            </div>

            <div className={style.recipientDataContainer}>
                <span className={style.title}>Recipient's data</span>
                <div className={style.container}>
                    <span>Adolf Hitler</span>
                    <span>+48 537 728 008</span>
                    <span>adohit88@gmail.com</span>

                    <span className={style.change}>Change</span>
                </div>
            </div>

            <div className={style.tableContainer} style={stylePaymentHeight}>
                <span>Payment</span>
                <form>
                {payment}
                </form>
            </div>
        </div>
    )
}

export default DeliveryAndPayment