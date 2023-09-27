import * as React from 'react';

import style from './style/AccountSettings.module.scss';


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
                    <span className={style.edit}>Edit</span>
                </div>
            </div>
        )
    })

    return(
        <div className={style.AccountSettings}>

            {data}

            <div className={style.deleteAccount}>
                <span className={style.title}>Deleting account</span>
                <span className={style.text}>If you click this button, you will delete your account in our store. Please make sure you really want to do this – we won't be able to restore your account</span>
                <button>Delete account</button>
            </div>

        </div>
    )
}

export default AccountSettings