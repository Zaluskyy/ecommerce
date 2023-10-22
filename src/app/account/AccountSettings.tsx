import React, {useContext, useEffect, useState} from 'react';
import style from './style/AccountSettings.module.scss';

import EditDataPopUp from '../components/EditDataPopUp'
import ConfirmPopUp from '../components/ConfirmPopUp';

import { changePrimaryData, changePassword, deleteAccount } from '../components/Schema';

import { AnimatePresence } from 'framer-motion';

import ButtonAnimation from '../UI/ButtonAnimation';

import { auth, db } from '../firebase';
import {doc, getDoc, deleteDoc} from 'firebase/firestore';
import { unlink, deleteUser } from 'firebase/auth'

import EcommerceContext from '../store/context';

import toast from 'react-hot-toast'

import { useCookies } from 'react-cookie';


interface AccountSettingsProps{}

const AccountSettings: React.FC<AccountSettingsProps> = () => {

    const [,, removeCookie] = useCookies(['auth-token']);

    const context = useContext(EcommerceContext)
    const { setIsAuth } = context


    const [renderFromEdit, setRenderFromEdit] = useState<boolean>(false)

    const [displayName, setDisplayName] = useState<string | null>(null);
    const [displayEmail, setDisplayEmail] = useState<string | null>(null);
    const [displayTelephone, setDisplayTelephone] = useState<number | null>(null)

    const [edit, setEdit] = useState<number>(-1)
    const [confirm, setConfirm] = useState<boolean>(false)

    const [confirmDelete, setConfirmDelete] = useState<boolean | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async(user) => {
          if (user) {
            setDisplayName(user.displayName);
            setDisplayEmail(user.email)
            const userDocRef = doc(db, 'account', user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                setDisplayTelephone(userData.telephone)
                }
          }
        });
    
        return () => {
          unsubscribe();
        };
    }, [renderFromEdit]);

    useEffect(()=>{
        const deleteGoogleAccount = async()=>{
            const user = auth.currentUser
            if(confirmDelete&&user){
                const userDocRef = doc(db, 'account', user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                try{
                    if(userDocSnapshot) await deleteDoc(userDocRef)

                    await unlink(user, 'google.com')
                    await deleteUser(user)
                    removeCookie("auth-token")
                    setIsAuth(false)
                    toast.success('Addount has been deleted.');
                }catch{
                    toast.error("Somehing went wrong")
                }
            }
        }
        
        deleteGoogleAccount();
    }, [confirmDelete])


    interface IDataArr {
        title: string,
        data: string | null, 
        data2?: string,
    }

    const dataArr: IDataArr[] = [
        {title: "Your data", data: displayName, data2: `${displayTelephone ? `Tel. ${displayTelephone}`:''}`},
        {title: "Email", data: `${displayEmail?displayEmail:''}`},
        {title: "Password", data: "********"},
    ]

    const editDatas = [
        {
            title: "Your data",
            initVal: {
                fullName: `${displayName?displayName:''}`,
                telephone: `${displayTelephone?displayTelephone:''}`,
            },
            schema: changePrimaryData,
            inputs: [
                {
                    placeholder: "Full name",
                    type: "text",
                    name: "fullName",
                },
                {
                    placeholder: "Telephone",
                    type: "text",
                    name: "telephone",
                },
            ]
        },
        {
            title: "Change password",
            initVal: {
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            },
            schema: changePassword,
            inputs: [
                {
                    placeholder: "Current password",
                    type: "string",
                    name: "currentPassword",
                },
                {
                    placeholder: "New password",
                    type: "string",
                    name: "newPassword",
                },
                {
                    placeholder: "Confirm new password",
                    type: "string",
                    name: "confirmNewPassword",
                },
            ]
        },
        {
            title: "Delete Account",
            initVal: {
                currentPassword: '',
            },
            schema: deleteAccount,
            inputs: [
                {
                    placeholder: "Current password",
                    type: "string",
                    name: "currentPassword",
                },
            ]
        },
    ]

    const data = dataArr.map((item, index)=>{
        return(
            <div key={item.title} className={style.tableContainer}>
                <span className={style.title}>{item.title}</span>
                <div className={style.container}>
                    {index==0&&<div className={style.data}>
                        <span className={style.name}>{item.data}</span>
                        {displayTelephone&&<span className={style.data2}>{item.data2}</span>}
                    </div>}
                    {index!==0&&<span>{item.data}</span>}
                    {index!==1&&<span onClick={()=>setEdit(index==2?1:index)} className={style.edit}>Edit</span>}
                </div>
            </div>
        )
    })

    const handleDeleteAccount = async()=>{
        const user = auth.currentUser
        if(user){
            const providerData = user.providerData;
            const isGoogleAuth = providerData.some((info)=>info.providerId == 'google.com')
            if(isGoogleAuth) setConfirm(true)
            else setEdit(2)
        }
    }

    return(
        <div className={style.AccountSettings}>

            {data}

            <div className={style.deleteAccount}>
                <span className={style.title}>Deleting account</span>
                <span className={style.text}>If you click this button, you will delete your account in our store. Please make sure you really want to do this – we won&apos;t be able to restore your account</span>
                <ButtonAnimation onClick={handleDeleteAccount}>Delete account</ButtonAnimation>
            </div>

            <AnimatePresence
            mode='wait'>

                {edit!==-1&&
                    <EditDataPopUp 
                    setEditData={setEdit} 
                    title={editDatas[edit].title}
                    initialValues={editDatas[edit].initVal}
                    validationSchema={editDatas[edit].schema}
                    inputs={editDatas[edit].inputs}
                    setUpdatedFromEdit={setRenderFromEdit}
                    />
                }
            </AnimatePresence>

            <AnimatePresence
            mode='wait'>

                {confirm&&
                    <ConfirmPopUp 
                    title="Account deletion"
                    description='Are you sure you would like to delete this account from the database? This action cannot be undone.'
                    setConfirmPopUp={setConfirm}
                    setResponse={setConfirmDelete}
                    />
                }
            </AnimatePresence>


        </div>
    )
}

export default AccountSettings