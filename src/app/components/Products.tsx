"use client"
import React, { FC, useEffect, useState } from 'react';
import Product from './Product';
import style from './styles/Products.module.scss';

import { StaticImageData } from 'next/image';

import iphone14Img from '../../../public/img/iphone.png';
import iphone15ProImg from '../../../public/img/iphone15pro.png';
import airdotsImg from '../../../public/img/airdots.png';
import ipadImg from '../../../public/img/ipad.png';
import macbookImg from '../../../public/img/macbook.png';
import watchImg from '../../../public/img/watch9.png';


interface ProductsProps{
    which: string | number,
}

const Products: FC<ProductsProps> = ({which}) => {

    interface IProductsArr{
        id: number
        img: StaticImageData;
        category: string
        name: string;
        price: number;
    }

    const productsArr: IProductsArr[] = [
        {
            id: 0,
            img: iphone14Img,
            category: 'phone',
            name: 'Apple Iphone 14 256GB Space black',
            price: 44444,
        },
        {
            id: 1,
            img: iphone15ProImg,
            category: 'phone',
            name: 'Apple Iphone 15 Pro 128GB Space black',
            price: 7000,
        },
        {
            id: 2,
            img: airdotsImg,
            category: 'headphones',
            name: 'Apple AirPods with Charging Case',
            price: 2137,
        },
        {
            id: 3,
            img: ipadImg,
            category: 'tablet',
            name: 'APPLE iPad 10,9" Wi-Fi 64GB Niebieski',
            price: 3684,
        },
        {
            id: 4,
            img: macbookImg,
            category: 'computer',
            name: 'APPLE iMac 21,5" Full HD, i5, 8GB',
            price: 3684,
        },
        {
            id: 5,
            img: watchImg,
            category: 'watch',
            name: 'Apple Watch Series 9',
            price: 1494,
        },
    ]

    const [products, setProducts] = useState<React.JSX.Element[]>()

    
    const getEveryProducts = ()=>{
        const setElements = productsArr.map((item: IProductsArr)=>{
            return(<Product
                key={item.id}
                id={item.id}
                img={item.img}
                category={item.category}
                name={item.name}
                price={item.price}
            />)
        })
        setProducts(setElements)
    }

    const getNumberProducts = ()=>{

        let numberOfProductsToShow = 0;
        if (typeof which === 'number') {
            numberOfProductsToShow = which;
        } else if (typeof which === 'string') {
            const parsedNumber = parseInt(which);
            if (!isNaN(parsedNumber)) {
                numberOfProductsToShow = parsedNumber;
            }
        }

        let setElements: React.JSX.Element[] = [];

        for (let i: number = 0; i<(numberOfProductsToShow > productsArr.length ? productsArr.length : numberOfProductsToShow); i++){
            setElements.push(
                <Product
                key={productsArr[i].id}
                id={productsArr[i].id}
                img={productsArr[i].img}
                category={productsArr[i].category}
                name={productsArr[i].name}
                price={productsArr[i].price}
            />
            )
        }
        setProducts(setElements)
    }
    
    const getCategoryProducts = () => {
        const filtered = productsArr.filter((item: IProductsArr) => item.category === which);
        const setElements = filtered.map((item: IProductsArr)=>{
            return(<Product
                key={item.id}
                id={item.id}
                img={item.img}
                category={item.category}
                name={item.name}
                price={item.price}
            />)
        })
        setProducts(setElements);
    }

    useEffect(()=>{
        if(which=='EVERY') getEveryProducts()
        else if(typeof which == "number") getNumberProducts()
        else getCategoryProducts()
    }, [which])
            

    return(
        <div className={style.Products}>
            {products}
        </div>
    )
}

export default Products