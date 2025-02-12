import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const Tabs = ({ tabs, tabData }) => {
  const [activeTab, setActiveTab] = useState('tab1');


  return (
    <div id='Tab'>




      <div className="tabs">
        <button
          className={activeTab === 'tab1' ? 'active' : ''}
          onClick={() => setActiveTab('tab1')}>
          최근 상품
        </button>

        <button
          className={activeTab === 'tab2' ? 'active' : ''}
          onClick={() => setActiveTab('tab2')}>
          결제내역
        </button>

        <button
          className={activeTab === 'tab3' ? 'active' : ''}
          onClick={() => setActiveTab('tab3')}>
          배송정보
        </button>

        <button
          className={activeTab === 'tab4' ? 'active' : ''}
          onClick={() => setActiveTab('tab4')}>
          작성리뷰
        </button>
        <button
          className={activeTab === 'tab5' ? 'active' : ''}
          onClick={() => setActiveTab('tab5')}>
          개인정보
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'tab1' && <LastGoods />}
        {activeTab === 'tab2' && <PaymentHistory />}
        {activeTab === 'tab3' && <ShippingInfo />}
        {activeTab === 'tab4' && <ReviewList />}
        {activeTab === 'tab5' && <PersonalInfo />}
      </div>
    </div>

  );
}


function LastGoods() {
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
        const limitedKORLiquors = KORLiquorsArray.slice(0, 4);
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
    <div className='Tabs-area'>
      <h2 className='title'>최근 본 상품</h2>
      <div className="tab-main01">

        {KORLiquors.map((KORLiquor, index) => (
          <div key={index} className='TM'>
            <Link to={`/detail/${KORLiquor.KORLIQUOR_ID}`}>
              <div className="TM-card">
                <div className="TMimg-container1">
                  <img className='TM-img' src={`${process.env.PUBLIC_URL}${KORLiquor.KQRLIQUOR_IMG}`} alt={KORLiquor.KORLIQUOR_NM} 
                  style={{width:'250px', height:'250px'}}/>
                </div>
                <div className="card-container">
                  <h2 className="TM-h2">
                    {truncateText(KORLiquor.KORLIQUOR_NM, 13)}
                  </h2>
                  <h3 className="TM-h3">가격:{KORLiquor.KORLIQUOR_PRC}원</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}




function PaymentHistory() {

  return (
    <div className='Tabs-area'>
      <h2 className='title'>결제내역</h2>
        <table>
          <th>
            <tr></tr>
          </th>
        </table>
    </div>
  )
}





function ShippingInfo() {
  return (
    <div className='Tabs-area'>
      <h2 className='title'>배송정보</h2>
    </div>
  )
}





function ReviewList() {
  return (
    <div className='Tabs-area'>
      <h2 className='title'>작성리뷰</h2>
    </div>
  )
}


function PersonalInfo() {
  return (
    <div className='Tabs-area'>
      <h2 className='title'>개인정보</h2>
    </div>
  )
}

export default Tabs;