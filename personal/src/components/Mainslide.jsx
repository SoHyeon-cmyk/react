import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation,Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const Mainslide = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch('/public/data/image.json') // JSON 파일 경로
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error('Error loading images:', error));
  }, []);


  return (
    <div className={`mySwiper mainslider`}>
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar,Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <img src={image.src} alt={image.alt} style={{ width: '1200px', height: '500px' }} />
        </SwiperSlide>
      ))}
    </Swiper>




    </div>
  );
};

export default Mainslide;