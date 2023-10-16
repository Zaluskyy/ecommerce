"use client"
import React from 'react';
import style from './ProductsID.module.scss';
import Products from '@/app/components/Products';


export default function ProductsID ({params}: any){
    return(
        <div className={style.ProductsID}>
            <span className={style.title}>{params.category}</span>
            <Products which={params.category}/>
        </div>
    )
}