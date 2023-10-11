import * as React from 'react';
import style from './page.module.scss'
import {StaticImageData} from 'next/image';

import iphoneImg from '../../public/img/iphone.png';
import airdotsImg from '../../public/img/airdots.png';

import Product from './components/Product';
import Banner from './components/Banner';

import Chat from './components/Chat';
import Categories from './components/Categories';
import Products from './components/Products';

export default function Home() {


  interface IproductsArr{
    img: StaticImageData;
    name: string;
    price: number;
  }

  const productsArr: IproductsArr[] = [
    {
      img: iphoneImg,
      name: 'Iphone 14',
      price: 2137,
    },
    {
      img: airdotsImg,
      name: 'Apple Airdots',
      price: 1488,
    },
    {
      img: iphoneImg,
      name: 'Iphone 14',
      price: 2137,
    },
    {
      img: airdotsImg,
      name: 'Apple Airdots',
      price: 1488,
    },
    {
      img: iphoneImg,
      name: 'Iphone 14',
      price: 2137,
    },
    {
      img: airdotsImg,
      name: 'Apple Airdots',
      price: 1488,
    },
    {
      img: airdotsImg,
      name: 'Apple Airdots',
      price: 1488,
    },
  ]

  const products = productsArr.map(item=>{
    return (
      <Product 
        key={item.name}
        img={item.img} 
        name={item.name} 
        price={item.price } 
        />
    )
  })

  return (
    <main className={style.main}>

      <Categories/>
      <Banner/>

      <span className={style.title}>Recomended</span>
      <Products/>
      
      <Chat/>
      
    </main>
  )
}
