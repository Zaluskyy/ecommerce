import React, { FC, ReactNode } from 'react';

import { motion } from "framer-motion";

interface ButtonAnimationProps{
    children: ReactNode,
    onClick?: () => void, 
    className?: string, 
    tabIndex?: number, 
    type?: "button" | "submit" | "reset";
}

const ButtonAnimation: FC<ButtonAnimationProps> = ({children, onClick, className, tabIndex, type}) => {
    return(

        <motion.button
        onClick={onClick}
        className={className}
        tabIndex={tabIndex}
        type={type}

        whileHover={{
            scale: 1.1,
        }}
        whileTap={{
            scale: .9,
        }}
        >
            {children}
        </motion.button>
    )
}

export default ButtonAnimation