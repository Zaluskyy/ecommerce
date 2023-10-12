import * as React from 'react';
import style from './page.module.scss'
import Banner from './components/Banner';

import Chat from './components/Chat';
import Categories from './components/Categories';
import Products from './components/Products';

export default function Home() {

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
