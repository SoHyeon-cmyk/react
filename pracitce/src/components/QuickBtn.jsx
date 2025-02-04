import React, { useEffect, useState } from 'react';
import { IoArrowUpOutline } from "react-icons/io5";

const QuickBtn = () => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }
  return isVisible && (
    <div className={`quickBtn ${isVisible ? "scrolled" : ""}`} onClick={scrollTop}>
      <button className='quick-top'><IoArrowUpOutline className='upArrow' /></button>
    </div>
  );
};


export default QuickBtn;