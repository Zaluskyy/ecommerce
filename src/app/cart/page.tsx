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
import EcommerceContext from '../store/context';

import ButtonAnimation from '../UI/ButtonAnimation';

import toast from 'react-hot-toast';

import { auth, db } from '../firebase';
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';

export default function CartPage(){

    const context = useContext(EcommerceContext)
    const { isAuth, cartProducts, selectedDelivery, selectedPayment } = context

    const titleIcons = [
        {title: 'Cart', icon: cart},
        {title: 'Delivery & Payment', icon: delivery},
        {title: 'Summary', icon: summary},
        {title: 'Done', icon: done},
    ]

    const components = [
        <Cart key="cart" />,
        <DeliveryAndPayment key="delivery" />,
        <Summary key="summary" />,
        <Done key="done" />
    ]

    const [currentProgress, setCurrentProgress] = useState<number>(1)

    interface ICartProducts {
        name: string,
        price: number,
        img: string,
        piece: number,
    }   

    const handleAddToOrder = async () => {
        
        const user = auth.currentUser

        const orderCollectionRef = collection(db, 'order')

        const counterRef = doc(orderCollectionRef, 'counter')
        const counterSnapshot = await getDoc(counterRef)

        if(user){

            if(counterSnapshot.exists()){
                const currentId = counterSnapshot.data().number
                const date = new Date()
        
                try{
                    await cartProducts.forEach(async(item: ICartProducts)=>{
                        
                        await addDoc(orderCollectionRef, {
                            completed: false,
                            date,
                            price: item.price,
                            piece: item.piece,
                            name: item.name,
                            img: item.img,
                            id: currentId+1,
                            user: user.uid,
                        })
    
                    })
                    await setDoc(counterRef, {
                        number: currentId+1
                    })
                    setCurrentProgress(prev=>prev+1)
                }catch{
                    toast.error('Something went wrong')
                }
            }else toast.error('Something went wrong')
        }else toast.error('Something went wrong')
    }

    const handlePrevNextBtn = (next: boolean)=>{
        if (!isAuth) window.location.href = "/account";
        else {
            if(next) {
                if(currentProgress==2) {
                    if(selectedDelivery&&selectedPayment) {
                        setCurrentProgress(prev=>prev+1)
                    }
                    else{
                        toast.error("Select delivery and payment")
                    }
                }else if(currentProgress==3){
                    handleAddToOrder()
                }
                else setCurrentProgress(prev=>prev+1)
            }
            else setCurrentProgress(prev=>prev-1)
        }
    }

    return(
        <div className={style.CartPage}>

            <div className={style.top}>
                {cartProducts.length>0&&<ProgressBar 
                currentProgress={currentProgress} 
                setCurrentProgress={setCurrentProgress} 
                />}

                <div className={style.title}>
                    <div className={style.iconContainer}>
                        <Image 
                        src={titleIcons[currentProgress-1].icon} 
                        alt="icon" 
                        width={40}
                        height={40}
                        priority={true}
                        />
                    </div>
                    <span>{titleIcons[currentProgress-1].title}</span>
                </div>
            </div>

            {components[currentProgress-1]}

            {cartProducts.length>0&&currentProgress<4&&
            <div className={style.buttonContainer}>

                {currentProgress!==1&&
                <ButtonAnimation
                className={currentProgress==3?`${style.prev} ${style.smallerText}`: style.prev}
                onClick={()=>handlePrevNextBtn(false)}
                >{titleIcons[currentProgress-2].title}</ButtonAnimation>}

                <ButtonAnimation
                className={currentProgress==1?`${style.next} ${style.bigger}`: style.next}
                onClick={()=>handlePrevNextBtn(true)}
                >{titleIcons[currentProgress].title}</ButtonAnimation>
                
            </div>}        
        </div>
    )
}