import React, {FC, useContext, useEffect, useState} from 'react'
import { useCookies } from 'react-cookie';
import style from './style/Cart.module.scss';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import transhIcon from '../../../public/img/icon/trash.svg'
import EcommerceContext from '../store/context';

import toast from 'react-hot-toast';

import ButtonAnimation from '../UI/ButtonAnimation';

interface CartProps{}

const Cart: FC<CartProps> = () => {

    const [cookies, setCookie] = useCookies(['cartProducts']);

    const context = useContext(EcommerceContext)
    const { cartProducts, setCartProducts } = context

    interface ICartProducts {
        id: number,
        name: string,
        price: number,
        img: string,
        piece: number,
    }

    const [productsElements, setProductsElements] = useState<React.ReactNode[] | null>(null);


    const handleChangePiece = (addition: boolean, id: number)=>{
        setCartProducts((prev: ICartProducts[]) => {
            return prev.map(product => {
              if (product.id === id) {

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
    
    const handleRemoveProduct = (productName: string)=>{
        toast.success("Product removed from the cart")
        setCartProducts((prev: ICartProducts[])=>{
            const updatedCart = prev.filter((product) => product.name !== productName);
            return updatedCart;
        })
    }

    const getProducts = ()=>{
        setProductsElements(cartProducts.map((item: ICartProducts)=>{
            return(
                <div key={item.id} className={style.productContainer}>
                    <div className={style.top}>
                        <div className={style.left}>
                            <div className={style.imageContainer}>
                                <Image 
                                src={item.img} 
                                alt={item.name}
                                width={68}
                                height={56}
                                priority={true}
                                />

                            </div>
                        </div>
                        <div className={style.right}>
                            <span className={style.name}>{item.name}</span>
                            <span className={style.price}>{item.price * item.piece
                            } zł</span>
                        </div>
                    </div>
                    <div className={style.bottom}>

                        <div className={style.quantityContainer}>

                            <ButtonAnimation onClick={()=>handleChangePiece(false, item.id)}>-</ButtonAnimation>
                            <div>
                                <span>{item.piece}</span>
                            </div>
                            <ButtonAnimation onClick={()=>handleChangePiece(true, item.id)}>+</ButtonAnimation>

                        </div>
                        
                        <ButtonAnimation onClick={()=>handleRemoveProduct(item.name)} className={style.removeContainer}>
                            <Image 
                            src={transhIcon} 
                            alt="trash icon"
                            width={20}
                            height={20}
                            priority={false}
                            />
                        </ButtonAnimation>

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

    useEffect(() => {
        setCookie('cartProducts', cartProducts);
      }, [cartProducts]);

    return ( 
        <div className={style.Cart}>
            {cartProducts.length>0&&productsElements}
            {!(cartProducts.length>0)&&<div className={style.emptyCart}>
                <span>Your cart is empty</span>
                <Link href='/'><ButtonAnimation>Go to the homepage</ButtonAnimation></Link>
            </div>}
        </div>
     );
}
 
export default Cart;