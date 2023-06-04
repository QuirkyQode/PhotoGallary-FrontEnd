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
        console.log(data.data)
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
        <div>
          <img key={index} src={image.urls.small} alt={`Random Image ${index}`} />
          <p>Description : {image.description}</p>
          <p>{image.alt_description}</p>
          <p>Photo ID : {image.id} </p>
          <p>User Name: {image.user.username}</p>
          <p>User Id: {image.user.id}</p>
        </div>
      ))}
    </div>
  );
}

export default RandomImages;