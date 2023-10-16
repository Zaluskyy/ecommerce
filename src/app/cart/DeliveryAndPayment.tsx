import React, {FC, useContext, useState} from 'react';
import style from './style/DeliveryAndPayment.module.scss';

import Image from 'next/image';

import courierIcon from '../../../public/img/icon/courier.svg'
import personalCollectionIcon from '../../../public/img/icon/personalCollection.svg';
import inpostIcon from '../../../public/img/icon/inpost.svg';

import blikIcon from '../../../public/img/icon/blik.svg';
import paypalIcon from '../../../public/img/icon/paypal.svg';

import { AnimatePresence } from 'framer-motion'

import EditDataPopUp from '../components/EditDataPopUp'

import { adressSchema } from '../components/Schema'

import EcommerceContext from '../store/context';

interface DeliveryAndPaymentProps{}

const DeliveryAndPayment: FC<DeliveryAndPaymentProps> = ({}) => {

    const context = useContext(EcommerceContext)
    const {selectedDelivery, setSelectedDelivery, selectedPayment, setSelectedPayment} = context

    const [editData, setEditData] = useState<number>(-1)

    const changeData = {
        title: "Your data",
        initVal: {
            name: '',
            surname: '',
            street: '',
            apartmentNumber: '',
            zipCode: '',
            city: '',
            telephone: '',
            email: '',
        },
        schema: adressSchema,
        inputs: [
            {
                placeholder: "Name",
                type: "text",
                name: "name",
            },
            {
                placeholder: "Surname",
                type: "text",
                name: "surname",
            },
            {
                placeholder: "Street",
                type: "text",
                name: "street",
            },
            {
                placeholder: "Apartment number",
                type: "text",
                name: "apartmentNumber",
            },
            {
                placeholder: "ZIP code",
                type: "text",
                name: "zipCode",
            },
            {
                placeholder: "City",
                type: "text",
                name: "city",
            },
            {
                placeholder: "Telephone",
                type: "text",
                name: "telephone",
            },
            {
                placeholder: "Email",
                type: "text",
                name: "email",
            },
        ]
    }

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
        {name: 'Blik', icon: blikIcon},
        {name: 'Paypal', price: 0, icon: paypalIcon},
    ]     
      
    const deliveries = deliveryArr.map((item, index)=>{
          
        const styleTop = { "--top": index } as React.CSSProperties;

        return(
            <div 
            key={item.name} 
            style={styleTop} 
            className={selectedDelivery?.name==item.name?`${style.active} ${style.container}`: `${style.container}`} 
            onClick={()=>setSelectedDelivery({name: item.name, price: item.price, icon: item.icon})}
            >
                <div className={style.radioConatiner}>
                    <input 
                    value={item.name} 
                    checked={selectedDelivery?.name==item.name}
                    onChange={()=>setSelectedDelivery({name: item.name, price: item.price, icon: item.icon})}
                    type="radio" 
                    name="delivery"/>
                </div>
                <div className={style.informationContainer}>
                    <div>
                        <span>{item.name}</span>
                        <span>{item.price} zł</span>
                    </div>
                    <div className={style.iconContainer}>
                        <Image 
                        src={item.icon} 
                        alt="courier icon"
                        width={undefined}
                        height={undefined}
                        priority={false}
                        />
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
            className={selectedPayment?.name==item.name?`${style.active} ${style.container}`: `${style.container}`} 
            onClick={()=>setSelectedPayment({name: item.name, price: item.price, icon: item.icon})}
            >
                <div className={style.radioConatiner}>
                    <input 
                    value={item.name} 
                    checked={selectedPayment?.name==item.name}
                    onChange={()=>setSelectedPayment({name: item.name, price: item.price, icon: item.icon})} 
                    type="radio" 
                    name="payment"/>
                </div>
                <div className={style.informationContainer}>
                    <div className={style.center}>
                        <span>{item.name}</span>
                    </div>
                    <div className={style.iconContainer}>
                        <Image 
                        src={item.icon} 
                        alt="payment icon"
                        width={undefined}
                        height={undefined}
                        priority={false}
                        />
                    </div>

                </div>
            </div>
        )
    })

    const styleDeliveryHeight = { "--height":  deliveryArr.length} as React.CSSProperties;
    const stylePaymentHeight = { "--height":  paymentArr.length} as React.CSSProperties;

    return(
        <div className={style.DeliveryAndPayment}>
            <div className={style.left}>
                <div className={style.tableContainer}>
                    <span className={style.title}>Delivery</span>
                    <form style={styleDeliveryHeight}>
                        {deliveries}
                    </form>
                </div>

                <div className={style.recipientDataContainer}>
                    <span className={style.title}>Recipient&apos;s data</span>
                    <div className={style.container}>
                        <span>Adolf Hitler</span>
                        <span>+48 537 728 008</span>
                        <span>adohit88@gmail.com</span>

                        <span className={style.change} onClick={()=>setEditData(0)}>Change</span>
                    </div>
                </div>

            </div>
            <div className={style.right}>
                <div className={style.tableContainer} style={stylePaymentHeight}>
                    <span className={style.title}>Payment</span>
                    <form>
                    {payment}
                    </form>
                </div>
            </div>

            <AnimatePresence
            mode='wait'>

                {editData!==-1&&
                    <EditDataPopUp 
                    setEditData={setEditData} 
                    title={changeData.title}
                    initialValues={changeData.initVal}
                    validationSchema={changeData.schema}
                    inputs={changeData.inputs}
                    />
                }

            </AnimatePresence>
        </div>
    )
}

export default DeliveryAndPayment