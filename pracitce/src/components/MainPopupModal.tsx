import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Modal } from '@mui/material';
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

  const handleChangeCheckBox = (e:any) => {
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
              width: 'auto',
              bgcolor: 'background.paper',
              overflowY: 'auto'
            }}
            className='mainPopupModalWrap'
          >
            <div>
              <h2 className='alter'>잠깐만요!</h2>
              <h4>본 사이트는 주류를 다루는 사이트입니다 <br />
              성인이 아닐시에 부적절한 내용을 담고 있습니다.</h4>
              <p>성인인증후 자유롭게 이용하시길 바랍니다.</p>
            </div>
  
            <div className='mainPopupModalCloseWrap'>
              <label>
                <input type='checkbox' onChange={handleChangeCheckBox} />
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