import style from './Contact.module.scss';
import Image from 'next/image';

import contactIcon from '../../../public/img/icon/contact.svg';

import callIcon from '../../../public/img/icon/call.svg';
import mailIcon from '../../../public/img/icon/mail.svg';
import locationIcon from '../../../public/img/icon/location.svg';


export default function Contact(){

    interface IContactArr {
        name: string,
        icon: string,
        href: string,
        text: string,
        text2?: string,
    }

    const contactArr: IContactArr[] = [
        {
        name: "Phone", 
        icon: callIcon, 
        href: "tel: +48 213 701 488", 
        text: "+48 213 701 488",
        },{
        name: "Mail", 
        icon: mailIcon, 
        href: "mailto: papwat2137@gmail.com", 
        text: "papwat2137@gmail.com",
        },{
        name: "Adress", 
        icon: locationIcon,
        href: "https://www.google.com/maps/place/00120+Vatican+City,+Watykan/@41.9038163,12.4520612,16z/data=!3m1!4b1!4m6!3m5!1s0x1325890a57d42d3d:0x94f9ab23a7eb0!8m2!3d41.902916!4d12.453389!16zL20vMDd5dHQ?entry=ttu", 
        text: "Ul. Papieska 21/37", 
        text2: "69-420 Watykan",
        },
    ]

    const contact = contactArr.map((item, index)=>{
        return(
            <div className={style.tableContainer}>
                <span>{item.name}</span>
                <a href={item.href} target="_blank" className={style.container}>
                    <div className={style.iconContainer}>
                        <Image src={item.icon} alt="call icon"/>
                    </div>
                    <div className={style.right}>
                        <span>{item.text}</span>
                        {item.text2&&<span>{item.text2}</span>}
                    </div>
                </a>
            </div>
        )
    })
    
    return(
        <div className={style.Contact}>
            <div className={style.title}>
                <div className={style.iconContainer}>
                    <Image src={contactIcon} alt="icon" />
                </div>
                <span>Contact</span>
            </div>

            {contact}

        </div>
    )
}