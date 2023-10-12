import React, { FC } from 'react';
import Product from './Product';
import style from './styles/Products.module.scss';

import { StaticImageData } from 'next/image';

import iphoneImg from '../../../public/img/iphone.png';
import airdotsImg from '../../../public/img/airdots.png';
import ipadImg from '../../../public/img/ipad.png';
import macbookImg from '../../../public/img/macbook.png';


interface ProductsProps{}

const Products: FC<ProductsProps> = () => {

    interface IProductsArr{
        id: number
        img: StaticImageData;
        name: string;
        price: number;
    }

    const productsArr: IProductsArr[] = [
        {
            id: 1,
            img: iphoneImg,
            name: 'Apple Iphone 14 256GB Space black',
            price: 44444,
        },
        {
            id: 2,
            img: airdotsImg,
            name: 'Apple AirPods with Charging Case',
            price: 2137,
        },
        {
            id: 3,
            img: ipadImg,
            name: 'APPLE iPad 10,9" Wi-Fi 64GB Niebieski',
            price: 3684,
        },
        {
            id: 4,
            img: macbookImg,
            name: 'APPLE iMac 21,5" Full HD, i5, 8GB',
            price: 3684,
        },
    ]

    const products = productsArr.map((item: IProductsArr)=>{
        return(<Product
        key={item.id}
        id={item.id}
        img={item.img}
        name={item.name}
        price={item.price}
        />)
    })

    return(
        <div className={style.Products}>
            {products}
        </div>
    )
}

export default Products