import React, { SetStateAction } from 'react'
import style from './style/Dashboard.module.scss';
import Image from 'next/image';

import ordersIcon from '../../../public/img/icon/orders.svg'
import settingsIcon from '../../../public/img/icon/settings.svg'
import arrowIcon from '../../../public/img/icon/arrow.svg'


interface DashboardProps{
    setAccountDashboard: React.Dispatch<React.SetStateAction<"ORDERS"|"SETTINGS"|"">>;
}

const Dashboard: React.FC<DashboardProps> = ({setAccountDashboard}) => {

    interface IDashboardArr{
        icon: string,
        name: string,
        goTo: string,
    }

    const dashboardArr: IDashboardArr[] = [
        {icon: ordersIcon, name: "Orders", goTo: "ORDERS"},
        {icon: settingsIcon, name: "Account settings", goTo: "SETTINGS"},
    ]

    const dashboard = dashboardArr.map(item=>{
        return(
            <div key={item.name} className={style.element} onClick={()=>setAccountDashboard(item.goTo as "ORDERS"|"SETTINGS")} >
                <div className={style.informationContainer}>
                    <div className={style.imageContainer}>
                        <Image src={item.icon} alt={`${item.name} icon`} />
                    </div>
                    <span>{item.name}</span>
                </div>
                <div className={style.arrowContainer}>
                    <Image src={arrowIcon} alt="arrow icon" />
                </div>
            </div>
        )
    })

    return(
        <div className={style.Dashboard}>
            {dashboard}
        </div>
    )
}

export default Dashboard