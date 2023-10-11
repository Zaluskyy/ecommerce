import React, { FC } from 'react';
import style from './styles/Categories.module.scss';

interface CategoriesProps{}

const Categories: FC<CategoriesProps> = () => {

    return(
        <ul className={style.Categories}>
            <li>Mac</li>
            <li>Ipad</li>
            <li>Iphone</li>
            <li>Watch</li>
            <li>AirPods</li>
            <li>Accessories</li>
        </ul>
    )
}

export default Categories