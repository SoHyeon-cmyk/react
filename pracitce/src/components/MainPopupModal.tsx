import { useCookies } from 'react-cookie';
import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';

export default function MainPopupModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);

  const [cookies, setCookie] = useCookies(['lastClosedDate']);
  const handleClose = () => {
    setIsModalOpen(false);
    document.documentElement.style.overflow = 'auto'
  }

  const handleChangeCheckBox = (e: any) => {
    setIsCheckBoxChecked(e.target.checked);
  };

  useEffect(() => {
    if (!cookies.lastClosedDate) {
      setIsModalOpen(true)
    }
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
    if (isCheckBoxChecked && !isModalOpen) {
      const currentDate = dayjs().format('YYYY-MM-DD');
      const endDate = dayjs().add(1, 'day').startOf('day').toDate();
      setCookie('lastClosedDate', currentDate, {
        path: '/',
        expires: endDate,
      });
    }
  }, [isCheckBoxChecked, isModalOpen]);
  const showMainPopup =
    cookies.lastClosedDate !== dayjs().format('YYYY-MM-DD') && isModalOpen;

  return (
    <div>
      <Modal open={showMainPopup} onBackdropClick={handleClose}>
        <Paper
          elevation={2}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            bgcolor: 'background.paper',
            overflowY: 'auto',
            borderRadius:'10px'

          }}
          className='mainPopupModalWrap'
        >
          <div>
            <h2 className='alter'>잠깐만요!</h2>
            <h4>본 사이트는 주류를 다루는 사이트입니다 <br />
              성인이 아닐시에 부적절한 내용을 담고 있습니다.</h4>
            <p>성인인증 후 자유롭게 이용하시길 바랍니다.</p>
          </div>

          <div className='mainPopupModalCloseWrap'>
            <label className='custom-checkbox'>
              <input type='checkbox' onChange={handleChangeCheckBox} className='TodayBtn' />
              <span className='checkmark'>
                <svg  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg>
              </span>
              오늘 그만 보기
            </label>
            <button className='modalCloseBtn' onClick={handleClose}>
              닫기
            </button>
          </div>
        </Paper>
      </Modal>
    </div>
  );
}