import React, { useEffect, useState } from 'react';

const Welcome = () => {

  const [galleryImagesData, setMGalleryImagesData] = useState([]);

  const loadMGalleryImagesData = async () => {
    // Query API Gateway
    const response = await fetch('https://935bpxssxl.execute-api.us-east-1.amazonaws.com/gallery-images');
    const data = await response.json();

    // Assign results to state variable
    setMGalleryImagesData(data);
  }

  useEffect(() => {
    // Load Menu Links data from API Gateway
    loadMGalleryImagesData();
  }, []);

  return (
    <div className="scene" id="welcome">
      <article className="content">
        <div className="gallery">
          {galleryImagesData.map(galleryImage =>
            <img className={galleryImage.className} src={galleryImage.src} alt={galleryImage.alt}/>
          )}
        </div>
        <h1>Welcome to the Landon&nbsp;Hotel</h1>
        <p>The original Landon perseveres after 50 years in the heart of West London. The West End neighborhood has
          something for everyone—from theater to dining to historic sights. And the not-to-miss Rooftop Cafe is a great
          place for travelers and locals to engage over drinks, food, and good&nbsp;conversation. &nbsp;To learn more
          about the Landon Hotel in the West End, browse our website and <a
            href="files/landon_information_sheet_London.pdf">download our handy information sheet</a>.</p>
      </article>
    </div>
  );
}

export default Welcome;