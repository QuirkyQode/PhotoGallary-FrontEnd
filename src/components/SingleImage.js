import React, { useState } from "react";
import axios from "axios";

function SingleImage() {
  const [imageId, setImageId] = useState("");
  const [image, setImage] = useState({});

  const handleImageIdChange = (event) => {
    setImageId(event.target.value);
  };

  const handleSearch = async () => {
    // Fetch images based on the entered username
    // fetch(`backend-server/user-images?username=${username}`)
    //   .then((response) => response.json())
    //   .then((data) => setUserImages(data))
    //   .catch((error) => console.log(error));
    const response = await axios.get(
        `https://api.unsplash.com/photos/${imageId}?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      )
      .then((data) => {
        setImage(data.data)
        console.log(data.data)
      })
      .catch((error) => console.log(error));    
  };

  return (
    <div>
      <h1> Image with ID</h1>
      <input
        type="text"
        value={imageId}
        onChange={handleImageIdChange}
        placeholder="Enter Image Id"
      />
      <button onClick={handleSearch}>Search</button>

    
    { image &&    (<div>
            <img  src={image.urls.regular} alt={`Image`} />
            <p>Description : {image.description}</p>
            <p>{image.alt_description}</p>
            <p>Photo ID : {image.id} </p>
            <p>User Name: {image.user.username}</p>
            <p>User Id: {image.user.id}</p>
        </div>)}
    </div>
  );
}

export default SingleImage;
