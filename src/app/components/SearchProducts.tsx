import React, { FC, SetStateAction, useEffect } from 'react';
import style from './styles/SearchProducts.module.scss';
import Image from 'next/image';
import Products from './Products';
import ButtonAnimation from '../UI/ButtonAnimation';

import xImg from '../../../public/img/icon/x.svg';

interface SearchProductsProps{
    search: string;
    setSearch: React.Dispatch<SetStateAction<string>>;
}

const SearchProducts: FC<SearchProductsProps> = ({search, setSearch}) => {

    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return()=>{
            document.body.style.overflow = 'auto';
        }
    }, [])

    return(
        <div className={style.SearchProducts}>
            <div className={style.title}>{search}
            <ButtonAnimation onClick={()=>setSearch('')}>
                <Image src={xImg} alt="clear search"/>
            </ButtonAnimation>
            </div>
            <Products which={search} search={true} setSearch={setSearch}/>
        </div>
    )
}

export default SearchProducts