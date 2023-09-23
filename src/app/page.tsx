import * as React from 'react';
import style from './page.module.scss'
import {StaticImageData} from 'next/image';

import iphoneImg from '../../public/img/iphone.png';
import airdotsImg from '../../public/img/airdots.png';

import Product from './components/Product';
import Banner from './components/Banner';

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

      <Banner/>

      <div className={style.filters}>
        <select className={style.categories}>
          <option>Categories</option>
          <option>Phone</option>
          <option>Headphones</option>
        </select>

        <select className={style.sort}>
          <option>Sort by</option>
          <option>Rosnąco</option>
          <option>Malejąco</option>
        </select>
      </div>

      <span className={style.title}>Recomended:</span>

      <div className={style.products}>
        {products}
      </div>

    </main>
  )
}
