"use client"
import React, { FC } from 'react'
import style from './styles/Footer.module.scss';
import Link from 'next/link';

interface FooterProps{}

const Footer: FC<FooterProps> = () => {
 
    return(
        <div className={style.Footer}>
            <span>Made by <Link href="https://www.linkedin.com/in/krystian-zaluski/" target="_blank" >Krystian Załuski</Link></span>
        </div>
    )
}

export default Footer