import React, { FC, useContext, useEffect } from 'react';
import style from './styles/EditDataPopUp.module.scss';

import { Field, Form, Formik } from 'formik'
import * as yup from 'yup';

import { motion } from 'framer-motion'

import { popUpDesktopAnimation, popUpMobileAnimation } from '../UI/AnimationVariants'
import EcommerceContext from '../store/context';

interface InputItem {
    placeholder: string;
    type: string;
    name: string;
}

interface EditDataPopUpProps{
    setEditData: React.Dispatch<React.SetStateAction<number>>;
    title: string;
    initialValues: Record<string, string | undefined>;
    validationSchema: yup.Schema<any>;
    inputs: InputItem[];
}


const EditDataPopUp: FC<EditDataPopUpProps> = ({setEditData, title, initialValues, validationSchema, inputs}) => {

    const context = useContext(EcommerceContext)
    const {mobile} = context

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
    

    const handleSave = async () => {
        // add data to base
        await new Promise<void>(resolve => {
            setTimeout(() => {
                console.log("done");
                resolve();
            }, 1000);
        });
        setEditData(-1)
    }

    const handleExit = ()=>{
        setEditData(-1)
    }

    return(
        <>
            <motion.div 
            variants={mobile?popUpMobileAnimation: popUpDesktopAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={style.EditDataPopUp}
            >
                <div className={style.topBar}>
                    <span>{title}</span>
                    <motion.div 
                    className={style.exit} 
                    onClick={handleExit}
                    
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    >
                        <div/>
                        <div/>
                    </motion.div>
                </div>
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSave}
                >
                    {({ errors, touched }) => (    
                    <Form>
                        {
                            inputs.map((item, index)=>{
                                return (
                                    <div key={index}>
                                        <Field
                                        placeholder={item.placeholder}
                                        type={item.type}
                                        name={item.name}
                                        className={errors[item.name]&&touched[item.name]&&style.errorInput}
                                        />
                                        <div className={style.errorContainer}>
                                            {errors[item.name]&&touched[item.name]&&<span className={style.error}>{errors[item.name]}</span>}
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <button type="submit" >Save</button>
                    </Form>
                )}
                
                </Formik>
                <div className={style.buttonContainer}/>
            </motion.div>
            <motion.div 
            onClick={handleExit}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className={style.background}/>
        </>
    )
}

export default EditDataPopUp