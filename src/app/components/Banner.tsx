"use client"
import React, {FC, useRef} from 'react'
import style from './styles/Banner.module.scss';

import { Swiper as SwiperElement, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination'

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import arrowIcon from '../../../public/img/icon/arrow.svg';

import banner1 from '../../../public/img/banner/1.jpg';
import banner2 from '../../../public/img/banner/2.jpg';
import banner3 from '../../../public/img/banner/3.jpg';

import Image from 'next/image';

interface BannerProps{}

const Banner: FC<BannerProps> = () => {

    const prevBtnRef = useRef(null)
    const nextBtnRef = useRef(null)

    const swiperRef = useRef<Swiper | null>(null);


    const handlePrevSlide = ()=>{
        swiperRef.current.slidePrev();
    }

    const handleNextSlide = ()=>{
        swiperRef.current.slideNext();
    }

    const handleGoTo = (n: number)=>{
        if(n==0) window.location.href = '/products/watch';
        else if(n==1) window.location.href = '/products/mac';
        else if(n==2) window.location.href = '/products/iphone';
    }

    const bannersArr = [banner1, banner2, banner3]

    const banners = bannersArr.map((item, index)=>{
        return(
            <SwiperSlide key={index} onClick={()=>handleGoTo(index)} className={style.slide}>
                <Image 
                src={item} 
                alt="banner"
                width={undefined}
                height={undefined}
                priority={true}
                />
            </SwiperSlide>
        )
    })

    return(
        <div className={style.Banner}>

            <SwiperElement
            effect={'coverflow'}
            grabCursor={ true }
            loop={true}
            slidesPerView={1}
            coverflowEffect={
                {
                    rotate: 1,
                    stretch: 1,
                    depth: 20,
                    modifier: 10,
                }
            }
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={style.swiperContainer}
            onSwiper={(swiper: Swiper) => {
                swiperRef.current = swiper;
            }}
            >

                {banners}

                <div ref={prevBtnRef} className={style.swiperButtonPrev} onClick={handlePrevSlide}>
                    <Image 
                    src={arrowIcon} 
                    alt="arrow" 
                    width={24} 
                    height={24} 
                    priority={false} 
                    />
                </div>
                <div ref={nextBtnRef} className={style.swiperButtonNext} onClick={handleNextSlide}>
                    <Image 
                    src={arrowIcon} 
                    alt="arrow" 
                    width={24} 
                    height={24} 
                    priority={false} 
                    />
                </div>

            </SwiperElement>
        </div>
    )
}

export default Banner