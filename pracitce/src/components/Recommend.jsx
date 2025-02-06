import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Recommend = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/main.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        return response.json();
      })
      .then((data) => {
        const cocktailsArray = Object.values(data);
        const limitedCocktails = cocktailsArray.slice(0,8);
        setCocktails(limitedCocktails);
        setLoading(false);
      })
      .catch((error) => {
        console.error("JSON 불러오기 오류:", error);
        setLoading(false);
      });

  }, []);



  if (loading) {
    return <div>데이터 로딩 중...</div>;
  }



  return (
    <div className="RCM-container">
      <h1>추천 칵테일</h1>
      <div className="RCM">
        {cocktails.map((cocktail, index) => {
          return (
            <Link >
            <div key={index} className="card">
              <div className="img-container">
                <img
                  src={cocktail.imageURL}
                  alt={cocktail.Name}
                  style={{ borderRadius: '8px' }} 
                />
              </div>
              <h2>{cocktail.Name} ({cocktail.EnglishName})</h2>
              <p><strong>설명:</strong> {cocktail.Description}</p>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
  
};

export default Recommend;
