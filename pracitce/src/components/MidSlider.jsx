import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { FaPause, FaAngleLeft, FaAngleRight, FaPlay } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import 'swiper/css';

import 'swiper/css/navigation';

const MidSlider = () => {
  const [KORLiquors, setKORLiquos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef(null);

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };
  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        return response.json();
      })
      .then((data) => {
        const KORLiquorsArray = Object.values(data);
        const limitedKORLiquors = KORLiquorsArray.slice(0, 8);
        setKORLiquos(limitedKORLiquors);
        setLoading(false);
      })
      .catch((error) => {
        console.error("JSON 불러오기 오류:", error);
        setLoading(false);
      });

  }, []);

  const toggleAutoplay = () => {
    if (!swiperRef.current?.swiper) return;

    if (isPlaying) {
      swiperRef.current.swiper.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiperRef.current.swiper.autoplay.start();
      setIsPlaying(true);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  if (loading) {
    return <div>데이터 로딩 중...</div>;
  }

  return (
    <>
      <div className="mid-slide">
        <h1>특별 프로모션</h1>
        <Swiper
          ref={swiperRef}
          slidesPerView={4}
          spaceBetween={20}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={false}
          navigation={{
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev2',
            clickable: true,
          }}
          loop={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper1"
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {KORLiquors.map((KORLiquor, index) => (
            <SwiperSlide key={index} className='SW'>
              <Link to={`/detail/${KORLiquor.KORLIQUOR_ID}`}>
                <div className="MDS-card">
                  <div className="img-container1">
                    <img className='MDS-img' src={`${process.env.PUBLIC_URL}${KORLiquor.KQRLIQUOR_IMG}`} alt={KORLiquor.KORLIQUOR_NM} />
                  </div>
                  <div className="card-container">
                    <h2 className="MDS-h2">
                      {truncateText(KORLiquor.KORLIQUOR_NM, 13)}
                    </h2>
                    <h3 className="MDS-h3">가격:{KORLiquor.KORLIQUOR_PRC}원</h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="bottom-slide">
        <div className="control">
          <span onClick={handlePrev} className="swiper-button-prev1">
            <FaAngleLeft />
          </span>
          <span onClick={toggleAutoplay} className="toggle-play">
            {isPlaying ? <FaPause /> : <FaPlay className="play" />}
          </span>
          <span onClick={handleNext} className="swiper-button-next2">
            <FaAngleRight />
          </span>
        </div>
        </div>
      </div>
    </>
  );
}

export default MidSlider;