import React, {useState} from 'react';
import style from './style/AccountSettings.module.scss';

import EditDataPopUp from '../components/EditDataPopUp'

import { changePrimaryData, changeEmail, changePassword } from '../components/Schema';

import { AnimatePresence } from 'framer-motion';


interface AccountSettingsProps{}

const AccountSettings: React.FC<AccountSettingsProps> = () => {

    interface IDataArr {
        title: string,
        data: string,
        data2?: string,
    }

    const dataArr: IDataArr[] = [
        {title: "Your data", data: "Adolf Hitler", data2: "Tel. 213 701 488"},
        {title: "Email", data: "adohit88@gmail.com"},
        {title: "Password", data: "********"},
    ]

    const [edit, setEdit] = useState<number>(-1)

    const editDatas = [
        {
            title: "Your data",
            initVal: {
                name: '',
                surname: '',
                telephone: '',
            },
            schema: changePrimaryData,
            inputs: [
                {
                    placeholder: "Name",
                    type: "text",
                    name: "name",
                },
                {
                    placeholder: "Surname",
                    type: "text",
                    name: "surname",
                },
                {
                    placeholder: "Telephone",
                    type: "text",
                    name: "telephone",
                },
            ]
        },
        {
            title: "Change email",
            initVal: {
                currentEmail: '',
                newEmail: '',
                confirmNewEmail: '',
            },
            schema: changeEmail,
            inputs: [
                {
                    placeholder: "Current email",
                    type: "email",
                    name: "currentEmail",
                },
                {
                    placeholder: "New Email",
                    type: "email",
                    name: "newEmail",
                },
                {
                    placeholder: "Confirm new email",
                    type: "email",
                    name: "confirmNewEmail",
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
                    type: "email",
                    name: "currentPassword",
                },
                {
                    placeholder: "New password",
                    type: "email",
                    name: "newPassword",
                },
                {
                    placeholder: "Confirm new password",
                    type: "email",
                    name: "confirmNewPassword",
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
                        <span className={style.data2}>{item.data2}</span>
                    </div>}
                    {index!==0&&<span>{item.data}</span>}
                    <span onClick={()=>setEdit(index)} className={style.edit}>Edit</span>
                </div>
            </div>
        )
    })

    return(
        <div className={style.AccountSettings}>

            {data}

            <div className={style.deleteAccount}>
                <span className={style.title}>Deleting account</span>
                <span className={style.text}>If you click this button, you will delete your account in our store. Please make sure you really want to do this – we won&apos;t be able to restore your account</span>
                <button>Delete account</button>
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
                    />
                }

            </AnimatePresence>

        </div>
    )
}

export default AccountSettings