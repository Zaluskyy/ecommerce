"use client"
import React, {FC, useContext} from 'react'
import { useCookies } from 'react-cookie';
import style from './styles/Product.module.scss';

import Image, {StaticImageData} from 'next/image';

import whiteCart from '../../../public/img/icon/whiteCart.svg';
import EcommerceContext from '../store/context';

interface ProductProps{
    id: number;
    img: StaticImageData;
    category: string;
    name: string;
    price: number;
}

const Product: FC<ProductProps> = ({id, img, category, name, price}) => {

  const [cookies, setCookie] = useCookies(['cartProducts']);

  const context = useContext(EcommerceContext)
  const { cartProducts, setCartProducts } = context

  interface ICartProducts {
    id: number,
    name: string,
    price: number,
    img: StaticImageData,
    piece: number,
}

const handleAddProductToCart = () => {
  const updatedCartProducts = [...cartProducts];
  const productIndex = updatedCartProducts.findIndex((item: ICartProducts) => item.name === name);

  if (productIndex !== -1) {
    updatedCartProducts[productIndex].piece += 1;
  } else {
    updatedCartProducts.push({
      id,
      name,
      price,
      img,
      piece: 1,
    });
  }
  setCartProducts(updatedCartProducts);
  setCookie('cartProducts', updatedCartProducts);
};


  return(    
    <div className={`${style.Product} ${style.smaller}`}>
      <div className={style.imgContainer}>
        <Image 
        src={img} 
        alt="product image"
        width={undefined}
        height={undefined}
        priority={true}
        />
      </div>
      <span className={style.category}>{category}</span>
      <span className={style.title}>{name}</span>
      <div className={style.bottom}>
        <span className={style.price}>{price} zł</span>
        <div onClick={handleAddProductToCart} className={style.addToCartContainer}>
          <Image 
          src={whiteCart} 
          alt="add to cart"
          width={undefined}
          height={undefined}
          priority={true}
          />
        </div>
      </div>
    </div>
  )
}

export default Product