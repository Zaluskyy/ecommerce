"use client"
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const EcommerceContext = createContext<any>({} as any);

export const EcommerceContextProvider = ({children}: {children: ReactNode}) =>{

    const [mobile, setMobile] = useState<boolean>(false)
    const [kurwa, setKurwa] = useState<boolean>(false)

    return(
        <EcommerceContext.Provider value={{
            kurwa, setKurwa,
            mobile, setMobile,
        }}>
            {children}
        </EcommerceContext.Provider>
    )
}

export default EcommerceContext;