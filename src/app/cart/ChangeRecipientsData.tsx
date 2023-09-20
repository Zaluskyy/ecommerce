import React, { FC, useContext, useEffect } from 'react';
import style from './style/ChangeRecipientsData.module.scss';

import { Field, Form, Formik } from 'formik'

import { adressSchema } from '../components/Schema'

import { motion } from 'framer-motion'

import { popUpDesktopAnimation, popUpMobileAnimation } from '../UI/AnimationVariants'
import EcommerceContext from '../store/context';


interface ChangeRecipientsDataProps{
    setChangeRecipientsData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeRecipientsData: FC<ChangeRecipientsDataProps> = ({setChangeRecipientsData}) => {

    const context = useContext(EcommerceContext)
    const {mobile} = context

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
    }, [])

    const handleSave = ()=>{
        // add data to base
        setChangeRecipientsData(false)
    }

    const handleExit = ()=>{
        setChangeRecipientsData(false)
    }

    return(
        <>
            <motion.div 
            variants={mobile?popUpMobileAnimation: popUpDesktopAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={style.ChangeRecipientsData}>
                <div className={style.topBar}>
                    <span>Edit delivery address</span>
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
                initialValues={{
                    fullName: '',
                    street: '',
                    apartmentNumber: '',
                    zipCode: '',
                    city: '',
                    telephone: '',
                    email: '',
                }}
                validationSchema={adressSchema}
                onSubmit={handleSave}
                >
                    {({ errors, touched }) => (    
                    <Form>
                        <Field
                        placeholder="Full name"
                        type="text"
                        name="fullName"
                        className={errors.fullName&&touched.fullName&&style.errorInput}
                        />
                        <div className={style.errorContainer}>
                            {errors.fullName&&touched.fullName&&<span className={style.error}>{errors.fullName}</span>}
                        </div>
                        <Field
                        placeholder="Street"
                        type="text"
                        name="street"
                        className={errors.street&&touched.street&&style.errorInput}
                        />
                        <div className={style.errorContainer}>
                            {errors.street&&touched.street&&<span className={style.error}>{errors.street}</span>}
                        </div>
                        <Field
                        placeholder="Apartment Number"
                        type="text"
                        name="apartmentNumber"
                        className={errors.apartmentNumber&&touched.apartmentNumber&&style.errorInput}
                        />
                        <div className={style.errorContainer}>
                            {errors.apartmentNumber&&touched.apartmentNumber&&<span className={style.error}>{errors.apartmentNumber}</span>}
                        </div>
                        <Field
                        placeholder="ZIP Code"
                        type="text"
                        name="zipCode"
                        className={errors.zipCode&&touched.zipCode&&style.errorInput}
                        />
                        <div className={style.errorContainer}>
                            {errors.zipCode&&touched.zipCode&&<span className={style.error}>{errors.zipCode}</span>}
                        </div>
                        <Field
                        placeholder="City"
                        type="text"
                        name="city"
                        className={errors.city&&touched.city&&style.errorInput}
                        />
                        <div className={style.errorContainer}>
                            {errors.city&&touched.city&&<span className={style.error}>{errors.city}</span>}
                        </div>
                        <Field
                        placeholder="Telephone"
                        type="text"
                        name="telephone"
                        className={errors.telephone&&touched.telephone&&style.errorInput}
                        />
                        <div className={style.errorContainer}>
                            {errors.telephone&&touched.telephone&&<span className={style.error}>{errors.telephone}</span>}
                        </div>
                        <Field
                        placeholder="Email"
                        type="text"
                        name="email"
                        className={errors.email&&touched.email&&style.errorInput}
                        />
                        <div className={style.errorContainer}>
                            {errors.email&&touched.email&&<span className={style.error}>{errors.email}</span>}
                        </div>

                        <button type="submit" >Save</button>
                    </Form>
                )}
                
                </Formik>
            </motion.div>
            <motion.div 
            onClick={()=>setChangeRecipientsData(false)}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className={style.background}/>
        </>
    )
}

export default ChangeRecipientsData