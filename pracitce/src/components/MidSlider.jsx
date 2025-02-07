import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MidSlider = () => {
  const [KORLiquors, setKORLiquos] = useState([]);
  const [loading, setLoading] = useState(true);

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
          slidesPerView={4}
          spaceBetween={20}
          autoplay={{ delay: 4000, disableOnInteraction: false, }}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
          modules={[Pagination, Navigation,Autoplay]}
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
                <img
                  src={KORLiquor.KORLIQUOR_IMG} 
                  // 집가서 이미지 추가하기
                  alt={truncateText(KORLiquor.KORLIQUOR_NM,15)}
                  className="MDS-img"
                />
                </div>
                <div className="card-container">
                <h2 className="MDS-h2">
                    {truncateText(KORLiquor.KORLIQUOR_NM, 15)}  
                  </h2>
                <h3 className="MDS-h3">{KORLiquor.KORLIQUOR_PRC}</h3>
                </div>
              </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default MidSlider;