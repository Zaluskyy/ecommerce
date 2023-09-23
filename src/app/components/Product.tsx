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
      <div className={style.container}>
        <div className={style.product}>
          <div className={style.imgContainer}>
            <Image src={img} alt="image"/>
          </div>
          <div className={style.informationContainer}>
            <div className={style.top}>
              <span>{name}</span>
            </div>
            <div className={style.bottom}>
              <button>
                <span>Add to cart</span>
                <Image src={whiteCart} alt="cart icon"/>
              </button>
              <span>{price} zł</span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Product