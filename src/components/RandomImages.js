import React, { useState, useEffect } from "react";
import axios from "axios";

function RandomImages() {
  const [randomImages, setRandomImages] = useState([]);

  const fetchImages = async () => {
    
    const response = await axios.get(
        `https://api.unsplash.com/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      )
      .then((data) => {
        console.log("data", data.data[0].urls.small)
        setRandomImages(data.data)
      })
      .catch((error) => console.log(error));    
    // console.log("response", response)
  }

  useEffect(() => {
    // Fetch 10 random images from the server
    // fetch("backend-server/random-images")
    fetchImages()
    // console.log("randomImages", randomImages)
  }, []);

  return (
    <div>
      <h1>Random Images</h1>
      {randomImages.map((image, index) => (
        <img key={index} src={image.urls.small} alt={`Random Image ${index}`} />
      ))}
    </div>
  );
}

export default RandomImages;