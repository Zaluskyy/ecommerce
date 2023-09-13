import React, {FC} from 'react'
import style from './style/Cart.module.scss';
import Image from 'next/image';

import iphone from '../../../public/img/iphone.png'
import airdots from '../../../public/img/airdots.png'

interface CartProps{}

const Cart: FC<CartProps> = () => {

    //to będzie pobierane z bazy
    const products = [
        {
            img: iphone,
            name: 'Iphone 14',
            price: 2137,
        },
        {
            img: airdots,
            name: 'Apple airdots',
            price: 1488,
        },
    ]

    const productsElements = products.map(item=>{
        return(
            <div key={item.name} className={style.productContainer}>
                <div className={style.top}>
                    <div className={style.imageContainer}>
                        <Image src={item.img} alt={item.name}/>
                    </div>
                    <div className={style.right}>
                        <span className={style.name}>{item.name}</span>
                        <span className={style.price}>{item.price} zł</span>
                    </div>
                </div>
                <div className={style.bottom}>
                    <button>-</button>
                    <div>
                        <span>1</span>
                    </div>
                    <button>+</button>
                </div>
            </div>
        )
    })

    return ( 
        <div className={style.Cart}>
            {productsElements}
        </div>
     );
}
 
export default Cart;