"use client"
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const EcommerceContext = createContext<any>({} as any);

export const EcommerceContextProvider = ({children}: {children: ReactNode}) =>{

    const [mobile, setMobile] = useState<boolean>(false)
    const [isAuth, setIsAuth] = useState<boolean>(true)
    const [loginOrRegister, setLoginOrRegister] = useState<"LOGIN"|"REGISTER">("LOGIN")
    return(
        <EcommerceContext.Provider value={{
            mobile, setMobile,
            loginOrRegister, setLoginOrRegister,
            isAuth, setIsAuth,
        }}>
            {children}
        </EcommerceContext.Provider>
    )
}

export default EcommerceContext;