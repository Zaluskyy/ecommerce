import React, {FC, useState} from 'react';
import style from './style/DeliveryAndPayment.module.scss';

import Image from 'next/image';

import courierIcon from '../../../public/img/icon/courier.svg'
import personalCollectionIcon from '../../../public/img/icon/personalCollection.svg';
import inpostIcon from '../../../public/img/icon/inpost.svg';

import { AnimatePresence } from 'framer-motion'

import EditDataPopUp from '../components/EditDataPopUp'

import { adressSchema } from '../components/Schema'

interface DeliveryAndPaymentProps{
    setChangeRecipientsData: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeliveryAndPayment: FC<DeliveryAndPaymentProps> = ({setChangeRecipientsData}) => {

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
                placeholder: "Atartment number",
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
            <div className={style.left}>
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