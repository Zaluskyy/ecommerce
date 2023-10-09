"use client"

import { FormEvent, useContext, useEffect, useState } from 'react';
import style from './styles/NavBar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { appearNavbar, slideSearchInput } from '../UI/AnimationVariants';

import EcommerceContext from '../store/context';

import logo from '../../../public/img/icon/logo.svg'
import hamburger from '../../../public/img/icon/hamburger.svg'
import loupe from '../../../public/img/icon/loupe.svg'

import account from '../../../public/img/icon/account.svg'
import cart from '../../../public/img/icon/cart.svg'
import contact from '../../../public/img/icon/contact.svg'
import terms from '../../../public/img/icon/terms.svg'

export default function Home() {

    const context = useContext(EcommerceContext)
    
    const {mobile, setMobile, setLoginOrRegister, isAuth} = context
    const [openedNav, setOpenedNav] = useState<boolean>(false)
    const [openedLoupe, setOpenedLoupe] = useState<boolean>(false)

    const [resize, setResize] = useState<boolean>(false)
    const [scrollDirection, setScrollDirection] = useState<"down" | "up">("up");



    useEffect(()=>{
        openedNav?document.body.style.overflow = 'hidden': document.body.style.overflow = 'auto';
    }, [openedNav])


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

    const menu = [
        {name: 'contact', img: contact},
        {name: 'terms & conditions', img: terms},
        {name: 'account', img: account},
        {name: 'cart', img: cart},
    ]

    const menuLi = menu.map((item: any)=>{
        return(
            <Link key={item.name} href={`/${item.name=="terms & conditions"?'terms&conditions':item.name}`} onClick={()=>setOpenedNav(false)} >
                <div className={style.iconContainer}>
                    <Image src={item.img} alt={item.name}/>
                </div>
                <span>{item.name}</span>
                
            </Link>
        )
    })

    const handleHamburgerClick = ()=>{
        setOpenedNav(prev=>!prev)
        setOpenedLoupe(false)
    }

    const handleSearch = (e: FormEvent)=>{
        e.preventDefault()
        setOpenedLoupe(false)
    }

    const handleOpenAccountLogin = (login: String)=>{
        setLoginOrRegister(login)
        setOpenedNav(false)
    }

  return (
    <motion.nav 
    className={style.NavBar}
    animate={scrollDirection=='down'?{top: -65}:{top: 0,}}
    >
        {mobile&&
        <div 
        className={`${style.hamburger} ${openedNav&&style.hamburgerX}`} 
        onClick={handleHamburgerClick}
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>

        </div>
        }

        {/* logoContainer */}
        <AnimatePresence 
        mode={'wait'}>
        {(!openedLoupe||!mobile)&&
            <motion.div
            className={style.logoContainer}
            variants={slideSearchInput}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
                <Link href="/" className={style.logo} >
                    <Image onClick={()=>setOpenedNav(false)} src={logo} alt='logo' width={24} height={24}/>
                </Link>
            </motion.div>}
        </AnimatePresence>

        {/* mobile toggle loupe */}
        {mobile&&!openedNav&&
        <div className={style.loupe} 
        onClick={()=>setOpenedLoupe(prev=>!prev)}
        >
            <div/>
            <div/>
            {openedLoupe&&<div/>}
        </div>
        }

        {/* loupe */}
        <AnimatePresence
        mode={"wait"}
        >
            {(openedLoupe||!mobile)&&
            <motion.form 
            onSubmit={handleSearch} 
            className={style.loupeContainer}
            variants={slideSearchInput}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
                <input placeholder='Search...' type="text"/>
                <button className={style.iconContainer}>
                    <Image src={loupe} alt='loupe' width={24} height={24}/>
                </button>
            </motion.form>}

        </AnimatePresence>

        {/* ul */}
        <AnimatePresence
        mode={"wait"}
        >
            {(!mobile || openedNav)&&
            <motion.ul
            variants={appearNavbar}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
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

            </motion.ul>}

        </AnimatePresence>

    </motion.nav>
  )
}
