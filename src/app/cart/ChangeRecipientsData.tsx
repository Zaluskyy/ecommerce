import React, { FC, useEffect } from 'react';
import style from './style/ChangeRecipientsData.module.scss';

import { Field, Form, Formik } from 'formik'

import { adressSchema } from '../components/Schema'

interface ChangeRecipientsDataProps{
    setChangeRecipientsData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeRecipientsData: FC<ChangeRecipientsDataProps> = ({setChangeRecipientsData}) => {

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
    }, [])

    const handleSave = ()=>{
        //...
        setChangeRecipientsData(false)
    }
    return(
        <div className={style.ChangeRecipientsData}>
            <div className={style.topBar}>
                <span>Edit delivery address</span>
                <div className={style.exit} onClick={()=>setChangeRecipientsData(false)}>
                    <div/>
                    <div/>
                </div>
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


                    {/* popup */}
            
        </div>
    )
}

export default ChangeRecipientsData