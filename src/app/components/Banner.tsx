"use client"
import React, {FC, useRef} from 'react'
import style from './styles/Banner.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
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

    return(
        <div className={style.Banner}>

            <Swiper
            effect={'coverflow'}
            grabCursor={ true }
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            coverflowEffect={
                {
                    rotate: 1,
                    stretch: 1,
                    depth: 100,
                    modifier: 2.5,
                }
            }
            pagination={{el: swiperPaginationRef.current, clickable: true}}
            navigation={{
                nextEl: nextBtnRef.current,
                prevEl: prevBtnRef.current,
                clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={style.swiperContainer}
            >
                <SwiperSlide className={style.slide}>
                    <Image src={banner1} alt="banner"/>
                    {/* slide */}
                </SwiperSlide>
                <SwiperSlide className={style.slide}>
                    <Image src={banner2} alt="banner"/>
                    {/* slide */}
                </SwiperSlide>
                <SwiperSlide className={style.slide}>
                    <Image src={banner3} alt="banner"/>
                    {/* slide */}
                </SwiperSlide>

                <div ref={prevBtnRef} className={style.swiperButtonPrev}>
                    <Image src={arrowIcon} alt="arrow"/>
                </div>
                <div ref={nextBtnRef} className={style.swiperButtonNext}>
                    <Image src={arrowIcon} alt="arrow"/>
                </div>
                
                <div ref={swiperPaginationRef} className={style.swiperPagination}/>
            </Swiper>

        </div>
    )
}

export default Banner