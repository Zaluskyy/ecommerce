"use client"
import React, { FC, useEffect, useState } from 'react';
import Product from './Product';
import style from './styles/Products.module.scss';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface ProductsProps{
    which: string | number,
}

const Products: FC<ProductsProps> = ({which}) => {

    interface IProductsArr{
        id: number
        img: string;
        category: string
        name: string;
        price: number;
    }

    const initialProductsArr: IProductsArr[] = []

    const [productsArr, setProductsArr] = useState<IProductsArr[]>(initialProductsArr)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const collectionRef = collection(db, 'product');
                const querySnapshot = await getDocs(collectionRef);
                const productsData: IProductsArr[] = [];

                querySnapshot.forEach(async (doc) => {
                    if (doc.exists()) {
                        const productData = doc.data() as IProductsArr;
                        productsData.push(productData);
                    } else {
                        console.error('The document does not exist.');
                    }
                });

                setProductsArr(productsData)
            } catch (error) {
                console.error('Download data failed: ', error);
                setLoading(false);
            }
        };
        
        getData()
    }, []);
    
    useEffect(() => {
    if (productsArr.length > 0) {
        setLoading(false)
    }
    }, [productsArr]);

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
    }, [which, loading, productsArr])            

    return(
        <div className={style.Products}>
            {loading?"Loading...":products}
        </div>
    )
}

export default Products