import * as React from 'react';
import style from './page.module.scss'
import Image from 'next/image';

import bannerImg from '../../public/img/banner.jpg';
import iphoneImg from '../../public/img/iphone.png';
import whiteCart from '../../public/img/icon/whiteCart.svg';

export default function Home() {
  return (
    <main className={style.main}>
      <div className={style.banner}>
        <Image src={bannerImg} alt="banner"/>
        <div className={style.changeImgContainer}>
          <div className={style.changeImg} />
          <div className={style.changeImg} />
          <div className={style.changeImg} />
        </div>
      </div>

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
        <div className={style.productContainer}>
          <div className={style.imgContainer}>
            <Image src={iphoneImg} alt="image"/>
          </div>
          <div className={style.informationContainer}>
            <div className={style.top}>
              <span>Iphone 14</span>
            </div>
            <div className={style.bottom}>
              <button>
                <span>Add to cart</span>
                <Image src={whiteCart} alt="cart icon"/>
              </button>
              <span>2137.00 zł</span>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
