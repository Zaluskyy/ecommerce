import React, { FC, useContext, useEffect } from 'react';
import style from './styles/EditDataPopUp.module.scss';

import { Field, Form, Formik } from 'formik'
import * as yup from 'yup';

import { motion } from 'framer-motion'

import { popUpDesktopAnimation, popUpMobileAnimation } from '../UI/AnimationVariants'
import EcommerceContext from '../store/context';

import { auth, db } from '../firebase';
import { updateProfile, EmailAuthProvider, reauthenticateWithCredential, updatePassword, deleteUser } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

import toast from 'react-hot-toast'

import { useCookies } from 'react-cookie';

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
    setUpdatedFromEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditDataPopUp: FC<EditDataPopUpProps> = ({setEditData, title, initialValues, validationSchema, inputs, setUpdatedFromEdit}) => {

    const [,, removeCookie] = useCookies(['auth-token']);

    const context = useContext(EcommerceContext)
    const {mobile, setIsAuth} = context

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


    const handleSave = async (values: any) => {
        const user = auth.currentUser
        if(title == "Your data"){
            const { fullName, telephone } = values
            if(user){
                const userDocRef = doc(db, 'account', user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    await updateProfile(user, {displayName: fullName})
                    await setDoc(userDocRef, { telephone }, { merge: true });
                    toast.success("Updated your data")
                } else {
                    await setDoc(userDocRef, { telephone });
                    toast.success("Added your data")
                }
            }else{
                toast.error("Something went wrong")
            }
        }else if(title == "Your delivery data"){
            const { fullName, street, apartmentNumber, zipCode, city, telephone } = values
            if(user){
                const userDocRef = doc(db, 'account', user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    await updateProfile(user, {displayName: fullName})
                    await setDoc(userDocRef, { street, apartmentNumber, zipCode, city, telephone }, { merge: true });
                    toast.success("Updated your data")
                } else {
                    await setDoc(userDocRef, { street, apartmentNumber, zipCode, city, telephone });
                    toast.success("Added your data")
                }
            }else{
                toast.error("Something went wrong")
            }
        }else if(title == "Change password"){
            const { currentPassword, newPassword } = values
            if(user){
                try {
                    const credential = EmailAuthProvider.credential(user.email as string, currentPassword);
                    await reauthenticateWithCredential(user, credential);
                    await updatePassword(user, newPassword);
                    toast.success('Password have changed');
                  } catch (error) {
                    toast.error('Password has not been changed');
                  }
            }
        }else if(title == "Delete Account"){
            const { currentPassword } = values
            if (user) {
                const userDocRef = doc(db, 'account', user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                try {
                    if(userDocSnapshot) await deleteDoc(userDocRef)

                    const credential = EmailAuthProvider.credential(user.email as string, currentPassword);
                    await reauthenticateWithCredential(user, credential);
                    await deleteUser(user);
                    removeCookie("auth-token")
                    setIsAuth(false)
                    toast.success('Addount has been deleted.');
                } catch (error) {
                    toast.error("Wrong password")
                }
            }
        }
        setUpdatedFromEdit(prev=>!prev)
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