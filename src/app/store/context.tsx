"use client"
import React, { createContext, ReactNode, useState } from 'react';
import { StaticImageData } from 'next/image';

import iphoneImg from '../../../public/img/iphone.png';
import airdotsImg from '../../../public/img/airdots.png';


const EcommerceContext = createContext<any>({} as any);

export const EcommerceContextProvider = ({children}: {children: ReactNode}) =>{

    interface ICartProducts {
        name: string,
        price: number,
        img: StaticImageData,
        piece: number,
    }

    const products: ICartProducts[] = [
        {
            name: 'Iphone 14',
            price: 2137,
            img: iphoneImg,
            piece: 7,
        },
        {
            name: 'Apple airdots',
            price: 1488,
            img: airdotsImg,
            piece: 1,
        },
    ]

    const [mobile, setMobile] = useState<boolean>(false)
    const [isAuth, setIsAuth] = useState<boolean>(true)
    const [loginOrRegister, setLoginOrRegister] = useState<"LOGIN"|"REGISTER">("LOGIN")

    const [cartProducts, setCartProducts] = useState<ICartProducts[]|null>(products)


    return(
        <EcommerceContext.Provider value={{
            mobile, setMobile,
            loginOrRegister, setLoginOrRegister,
            isAuth, setIsAuth,
            cartProducts, setCartProducts,
        }}>
            {children}
        </EcommerceContext.Provider>
    )
}

export default EcommerceContext;