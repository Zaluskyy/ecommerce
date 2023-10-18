"use client"
import React, {useEffect, useState} from 'react';
import style from './page.module.scss'
import Link from 'next/link';

import Banner from './components/Banner';

import Chat from './components/Chat';
import Categories from './components/Categories';
import Products from './components/Products';

import ButtonAnimation from './UI/ButtonAnimation';

export default function Home() {

  const [resize, setResize] = useState<boolean>(false)
  const [howMuch, setHowMuch] = useState<number>(2)

  useEffect(()=>{
    if(window.innerWidth<450) setHowMuch(2)
    else if(window.innerWidth>1150) setHowMuch(6)
    else if(window.innerWidth>950) setHowMuch(5)
    else if(window.innerWidth>700) setHowMuch(4)
    else if(window.innerWidth>450) setHowMuch(3)
  }, [resize])

  const handleResize = ()=>{
      setResize(prev=>!prev)
  }

  useEffect(()=>{
      window.addEventListener('resize', handleResize)
      return()=>window.removeEventListener('resize', handleResize)
  }) 

  return (
    <main className={style.main}>

      <Categories/>
      <Banner/>

      <span className={style.title}>Recomended</span>
      <Products which={howMuch}/>

      <Link href='/products'>
        <ButtonAnimation>See all products</ButtonAnimation>
      </Link>
      
      <Chat/>
      
    </main>
  )
}
