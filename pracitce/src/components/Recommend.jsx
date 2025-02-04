import React, { useState, useEffect } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const Recommend = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const cloudinaryInstance = new Cloudinary({
    cloud: { cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME },
  })


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
        const limitedCocktails = cocktailsArray.slice(0, 15);
        setCocktails(limitedCocktails);
        setLoading(false);
      })
      .catch((error) => {
        console.error("JSON 불러오기 오류:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/resources/image`,
        {
          headers: {
            Authorization: `Basic ${btoa(
              `${process.env.REACT_APP_CLOUDINARY_API_KEY}:${process.env.REACT_APP_CLOUDINARY_API_SECRET}`
            )}`,
          },
        }
      )
    }
  })



  const handleFileUpload = (e) => {
    e.preventDefault();

    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/resources/image/upload?prefix=image`;
    const files = e.target.querySelector("[type=file]").files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "docs_upload_example_us_preset");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Uploaded:", data);
        })
        .catch((err) => console.error("업로드 오류:", err));
    }
  };

  if (loading) {
    return <div>데이터 로딩 중...</div>;
  }

  return (
    <div className="RCM-container">
      <h1>추천 칵테일</h1>
      <div className="RCM">
        {cocktails.map((cocktail, index) => (
          <div key={index} className="card">
            <div className="img-container">
            {images.map((image) => {
              const cldImage = cloudinaryInstance.image(image.public_id);
              return (
                <div key={image.asset_id}>
                  <AdvancedImage cldImg={cldImage} />
                </div>
              );
            })}
            </div>
            <h2>
              {cocktail.Name} ({cocktail.EnglishName})
            </h2>

            <p>
              <strong>설명:</strong> {cocktail.Description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
