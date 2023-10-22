import React, { FC, useEffect } from 'react';
import style from './styles/ConfirmPopUp.module.scss';

import { motion } from 'framer-motion'

import { popUpDesktopAnimation } from '../UI/AnimationVariants'
import ButtonAnimation from '../UI/ButtonAnimation'

interface ConfirmPopUpProps{
    title: string;
    description: string;
    setConfirmPopUp: React.Dispatch<React.SetStateAction<boolean>>;
    setResponse: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const ConfirmPopUp: FC<ConfirmPopUpProps> = ({title, description, setConfirmPopUp, setResponse}) => {

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
    }, [])

    useEffect(()=>{
        document.body.style.overflow = 'hidden'
        return()=>{
            document.body.style.overflow = 'auto';
        }
    }, [])

    const handleResponse = (response: boolean)=>{
        setResponse(response)
        setConfirmPopUp(false)
    }

    return(
        <>
            <motion.div 
            variants={popUpDesktopAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={style.ConfirmPopUp}
            >
                <div className={style.titleContainer}>
                    <span className={style.title}>{title}</span>
                    <motion.div 
                    className={style.exit} 
                    onClick={()=>handleResponse(false)}
                    whileHover={{
                        scale: 1.5,
                        rotate: 10,
                    }}
                    whileTap={{
                        scale: .9,
                        rotate: 0,
                    }}
                    >
                        <div/>
                        <div/>
                    </motion.div>
                </div>
                <div className={style.contentContainer}>
                    <p>{description}</p>
                </div>
                <div className={style.buttonsContainer}>
                    <ButtonAnimation onClick={()=>handleResponse(false)}>Cancel</ButtonAnimation>
                    <ButtonAnimation onClick={()=>handleResponse(true)}>Delete</ButtonAnimation>
                </div>
            </motion.div>
            <motion.div 
            onClick={()=>handleResponse(false)}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className={style.background}
            />
        </>
    )
}

export default ConfirmPopUp