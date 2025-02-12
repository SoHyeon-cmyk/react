import React, { useState } from 'react';
import { BsGearFill } from "react-icons/bs";
import Tabs from '../components/Tabs';


const Mypage = () => {
  const [alertVisible, setAlertVisible] = useState(false)

  const handleMouseEnter = () => {
    setAlertVisible(true)
  }
  const handleMouseLeave = () => {
    setAlertVisible(false)
  }

  return (
    <div className='MP'>
      <p className='MP-Title'>My Page</p>
      <div className="top-area">
        <div className="MP-card">
          <div className="profile-area">
            <img src="" alt="" />
            <article className="user-info">
              <h2>username</h2>
              <p>가입년도:0000.00.00</p>
              <p>성인인증 여부</p>
            </article>
          </div>
          <button className='Edit-Icon' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><BsGearFill className='PF-icon' /></button>
          <span className='button-container'>
            {alertVisible && (
              <div id="setting">
                <p>Profile Edit</p>
              </div>
            )}
          </span>
          <div className="bottom-profileCard">
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="container">
          <h2>바로가기 서비스</h2>
          <div className="span-container">
          <span>성인인증</span>
          <span>결제내역</span>
          <span>배송정보</span>
          <span>작성한후기</span>
          </div>
        </div>

      </div>
        <Tabs/>
    </div>
  );
};

export default Mypage;