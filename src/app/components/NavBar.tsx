"use client"

import { FormEvent, useEffect, useState } from 'react';
import style from './styles/NavBar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { appearNavbar, slideSearchInput } from '../UI/AnimationVariants';

import logo from '../../../public/img/icon/logo.svg'
import hamburger from '../../../public/img/icon/hamburger.svg'
import loupe from '../../../public/img/icon/loupe.svg'

import account from '../../../public/img/icon/account.svg'
import cart from '../../../public/img/icon/cart.svg'
import contact from '../../../public/img/icon/contact.svg'
import terms from '../../../public/img/icon/terms.svg'

export default function Home() {

    const [mobile, setMobile] = useState<boolean>(false)
    const [openedNav, setOpenedNav] = useState<boolean>(false)
    const [openedLoupe, setOpenedLoupe] = useState<boolean>(false)

    const [resize, setResize] = useState<boolean>(false)

    useEffect(()=>{
        setMobile(window.innerWidth<768)
    }, [resize])

    const handleResize = ()=>{
        setResize(prev=>!prev)
    }

    useEffect(()=>{
        window.addEventListener('resize', handleResize)
        return()=>window.removeEventListener('resize', handleResize)
    })

    const menu = [
        {name: 'account', img: account},
        {name: 'cart', img: cart},
        {name: 'contact', img: contact},
        {name: 'terms and conditions', img: terms},
    ]

    const menuLi = menu.map((item: any)=>{
        return(
            <Link href={`/${item.name=="terms and conditions"?'terms&conditions':item.name}`} onClick={()=>setOpenedNav(false)} >
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

  return (
    <nav className={style.NavBar}>
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
        {!openedLoupe&&
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

        {/* just mobile */}
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
            {openedLoupe&&
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
                {menuLi}
            </motion.ul>}

        </AnimatePresence>

    </nav>
  )
}
