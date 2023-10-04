import React, {FC, useContext, useEffect, useState} from 'react'
import style from './style/Cart.module.scss';
import Image, { StaticImageData } from 'next/image';

import iphone from '../../../public/img/iphone.png'
import airdots from '../../../public/img/airdots.png'
import EcommerceContext from '../store/context';

interface CartProps{}

const Cart: FC<CartProps> = () => {

    const context = useContext(EcommerceContext)
    const { cartProducts, setCartProducts } = context

    interface ICartProducts {
        name: string,
        price: number,
        img: StaticImageData,
        piece: number,
    }

    const [productsElements, setProductsElements] = useState<React.ReactNode[] | null>(null);
    

    const handleChangePiece = (addition: boolean, productName: string)=>{
        setCartProducts((prev: ICartProducts[]) => {
            return prev.map(product => {
              if (product.name === productName) {

                let newPiece = addition ? product.piece + 1 : product.piece - 1;
                newPiece = Math.max(newPiece, 1);
                return {
                    ...product,
                    piece: newPiece,
                  };
              }
              return product;
            });
        });
    }

    const getProducts = ()=>{
        setProductsElements(cartProducts.map((item: ICartProducts)=>{
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
                        <button onClick={()=>handleChangePiece(false, item.name)}>-</button>
                        <div>
                            <span>{item.piece}</span>
                        </div>
                        <button onClick={()=>handleChangePiece(true, item.name)}>+</button>
                    </div>
                </div>
            )
        }))
    }

    useEffect(()=>{
        if(cartProducts) {
            getProducts()
        }
    }, [cartProducts])

    return ( 
        <div className={style.Cart}>
            {cartProducts&&productsElements}
            {!cartProducts&&<div className={style.emptyCart}>
                <span>Your cart is empty</span>
                <a href='/'><div>Go to the homepage</div></a>
            </div>}
        </div>
     );
}
 
export default Cart;