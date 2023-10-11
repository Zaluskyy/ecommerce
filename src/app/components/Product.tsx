import React, {FC} from 'react'
import style from './styles/Product.module.scss';

import Image, {StaticImageData} from 'next/image';

import whiteCart from '../../../public/img/icon/whiteCart.svg';

interface ProductProps{
    img: StaticImageData;
    name: string;
    price: number;
}

const Product: FC<ProductProps> = ({img, name, price}) => {

  return(    
    <div className={`${style.Product} ${style.smaller}`}>
      <div className={style.imgContainer}>
        <Image src={img} alt="product image"/>
      </div>
      <span className={style.category}>Phone</span>
      <span className={style.title}>{name}</span>
      <div className={style.bottom}>
        <span className={style.price}>{price} zł</span>
        <div className={style.addToCartContainer}>
          <Image src={whiteCart} alt="add to cart"/>
        </div>
      </div>
    </div>
  )
}

export default Product