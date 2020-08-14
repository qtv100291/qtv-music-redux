import React from 'react';
import AlbumItem from '../common/albumItem';
import './albumHomePage.scss'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Link } from 'react-router-dom';
import { auto } from '@popperjs/core';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const AlbumHomePage = ({title, album, onOpen, windowWidth}) => {

    const slidesPerView = windowWidth => {
        switch (true){
            case windowWidth >= 1200:
                return 4;
            case 890 <= windowWidth && windowWidth <= 1200:
                return 3; 
            case 580 <= windowWidth && windowWidth < 890:
                return 2;
            case  windowWidth < 580: 
                return 1;
        }
    }

    const slideNumber = slidesPerView(windowWidth);

    return ( 
    <section className="album-section">
        <div className="album-title d-flex align-items-center">
            <div className = "title-point"></div>
            <h2>{title}</h2>
        </div>
        
        <div className="album-container d-flex justify-content-between">
            <Swiper
                spaceBetween={40}
                slidesPerView={slideNumber}
                navigation
                >
                {
                    album.length > 0 &&
                    album.map(albumItem => ( 
                    <SwiperSlide>
                        <AlbumItem {...albumItem} key={albumItem.id} onOpen = {onOpen}/>
                    </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    </section> 
    );
}

export default AlbumHomePage;

