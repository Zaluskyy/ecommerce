import React, {FC} from 'react'
import style from './styles/Banner.module.scss';

import bannerImg from '../../../public/img/banner.jpg';

import Image from 'next/image';

interface BannerProps{}

const Banner: FC<BannerProps> = () => {

    return(
        <div className={style.Banner}>
            <Image src={bannerImg} alt="banner"/>
            <div className={style.changeImgContainer}>
                <div className={style.changeImg} />
                <div className={style.changeImg} />
                <div className={style.changeImg} />
            </div>
        </div>
    )
}

export default Banner