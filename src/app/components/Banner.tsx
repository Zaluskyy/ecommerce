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
    const swiperPaginationRef = useRef(null)

    const swiperRef = useRef<Swiper | null>(null);


    const handlePrevSlide = ()=>{
        swiperRef.current.slidePrev();
    }

    const handleNextSlide = ()=>{
        swiperRef.current.slideNext();
    }

    const handleGoTo = (n: number)=>{
        if(n==1) window.location.href = '/products/watch';
        else if(n==2) window.location.href = '/products/mac';
        else if(n==3) window.location.href = '/products/iphone';
    }

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
            pagination={{el: swiperPaginationRef.current, clickable: true}}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={style.swiperContainer}
            onSwiper={(swiper: Swiper) => {
                swiperRef.current = swiper;
            }}
            >

                <SwiperSlide onClick={()=>handleGoTo(1)} className={style.slide}>
                    <Image src={banner1} alt="banner"/>
                </SwiperSlide>

                <SwiperSlide onClick={()=>handleGoTo(2)} className={style.slide}>
                    <Image src={banner2} alt="banner"/>
                </SwiperSlide>
                <SwiperSlide onClick={()=>handleGoTo(3)} className={style.slide}>
                    <Image src={banner3} alt="banner"/>
                </SwiperSlide>

                <div ref={prevBtnRef} className={style.swiperButtonPrev} onClick={handlePrevSlide}>
                    <Image src={arrowIcon} alt="arrow"/>
                </div>
                <div ref={nextBtnRef} className={style.swiperButtonNext} onClick={handleNextSlide}>
                    <Image src={arrowIcon} alt="arrow"/>
                </div>
                
                <div ref={swiperPaginationRef} className={style.swiperPagination}/>
            </SwiperElement>
        </div>
    )
}

export default Banner