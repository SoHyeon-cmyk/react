import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaPause, FaAngleLeft, FaAngleRight,FaPlay } from "react-icons/fa6";

const Mainslide = () => {
  const [images, setImages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef(null); 

  useEffect(() => {
    fetch("/data/image.json")
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('JSON 불러오기 실패:', error));
  }, []);


  const toggleAutoplay = () => {
    if (!swiperRef.current) return;
    if (isPlaying) {
      swiperRef.current.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiperRef.current.autoplay.start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="slider">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev2',
          clickable: true,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="bottom-slide">
        <div className="swiper-pagination"></div>
        <div className="control">
          <span
            onClick={() => swiperRef.current?.slidePrev()}
            className="swiper-button-prev1"><FaAngleLeft />
          </span>
          <span 
            onClick={toggleAutoplay} 
            className="toggle-play">
            {isPlaying ? <FaPause /> : <FaPlay className='play' />}
          </span>
          <span onClick={() => swiperRef.current?.slideNext()}
          className="swiper-button-next2"><FaAngleRight />
          </span>
        </div>
      </div>

    </div>



  );
};

export default Mainslide;