"use client"
import React, { FC, useContext, useEffect, useState } from 'react'
import style from './styles/NavBar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import account from '../../../public/img/icon/account.svg'
import cart from '../../../public/img/icon/cart.svg'
import contact from '../../../public/img/icon/contact.svg'
import terms from '../../../public/img/icon/terms.svg'

import logoIcon from '../../../public/img/icon/logo.svg'
import loupe from '../../../public/img/icon/loupe.svg'

import EcommerceContext from '../store/context';

interface NavBarProps{}

const NavBar: FC<NavBarProps> = () => {

    const context = useContext(EcommerceContext)
    const {mobile, setMobile, isAuth, setLoginOrRegister, cartProducts} = context

    const [resize, setResize] = useState<boolean>(false)
    const [openedNav, setOpenedNav] = useState<boolean>(false)
    const [openedLoupe, setOpenedLoupe] = useState<boolean>(false)

    const [scrollDirection, setScrollDirection] = useState<"down" | "up">("up");

    useEffect(() => {
        let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
            if (scrollTop > lastScrollTop) {
            setScrollDirection('down');
            } else if (scrollTop < lastScrollTop) {
            setScrollDirection('up');
            }
    
            lastScrollTop = scrollTop;
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);
    
    useEffect(()=>{
        openedNav?document.body.style.overflow = 'hidden': document.body.style.overflow = 'auto';
    }, [openedNav])

    useEffect(()=>{
        setMobile(window.innerWidth<768)
        setOpenedNav(false)
        if(!mobile) setOpenedLoupe(false)
    }, [resize])

    const handleResize = ()=>{
        setResize(prev=>!prev)
    }

    useEffect(()=>{
        window.addEventListener('resize', handleResize)
        return()=>window.removeEventListener('resize', handleResize)
    })    

    const handleHamburgerClick = ()=>{
        setOpenedNav(prev=>!prev)
        setOpenedLoupe(false)
    }

    const menu = [
        {name: 'contact', img: contact},
        {name: 'terms & conditions', img: terms},
        {name: 'account', img: account},
        {name: 'cart', img: cart},
    ]

    const menuLi = menu.map((item: any)=>{
        return(
            <Link key={item.name} href={`/${item.name=="terms & conditions"?'terms&conditions':item.name}`} onClick={()=>setOpenedNav(false)} >
                {!mobile&&item.name=='cart'&&cartProducts.length>0&&<div className={style.newProduct}>{cartProducts.length}</div>}
                <div className={style.iconContainer}>
                    <Image 
                    src={item.img} 
                    alt={item.name} 
                    width={24} 
                    height={24} 
                    priority={false}/>
                </div>
                <span>{item.name}</span>
            </Link>
        )
    })

    const handleOpenAccountLogin = (login: String)=>{
        setLoginOrRegister(login)
        setOpenedNav(false)
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(openedLoupe) setOpenedLoupe(false)
    }

    return(
        <motion.div 
        className={style.NavBar}
        animate={scrollDirection=='down'?{top: -65}:{top: 0,}}
        >

            <div className={`${style.hamburger} ${openedNav&&style.hamburgerX}`} 
            onClick={handleHamburgerClick}
            >
                <div></div>
                <div></div>
                <div></div>
                <div></div>

            </div>

            {!openedLoupe&&<Link onClick={()=>setOpenedNav(false)} href="/" className={style.logoContainer}>
                <Image 
                src={logoIcon} 
                alt='logo' 
                width={24} 
                height={24}
                priority={true}
                />
            </Link>}

            {mobile&&<div onClick={()=>setOpenedLoupe(prev=>!prev)} className={style.toggleLoupe}>
                <div/>
                <div/>
                {openedLoupe&&<div/>}
            </div>}

            {(openedLoupe||!mobile)&&
            <form onSubmit={handleSearch}  className={style.loupeContainer}>
                <input placeholder='Search...' type="text"/>
                <button className={style.iconContainer}>
                    <Image 
                    src={loupe} 
                    alt='loupe' 
                    width={24} 
                    height={24} 
                    priority={false}
                    />
                </button>
            </form>
            }

            <ul className={`${openedNav&&style.activeNav}`}>
                {mobile&&menuLi.reverse()}
                {!mobile&&menuLi}

                {mobile&&!isAuth&&
                <div className={style.loginContainer}>
                    <Link 
                    href={'/account'} 
                    onClick={()=>handleOpenAccountLogin('LOGIN')} 
                    >
                        <div className={style.login}>Login</div>
                    </Link>
                    <Link 
                    href={'/account'} 
                    onClick={()=>handleOpenAccountLogin('REGISTER')} 
                    >
                        <div>Register</div>
                    </Link>
                </div>}
            </ul>

        </motion.div>
    )
}

export default NavBar