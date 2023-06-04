import React, { useState } from "react";
import axios from "axios";

function UserImages() {
  const [username, setUsername] = useState("");
  const [userImages, setUserImages] = useState([]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearch = async () => {
    // Fetch images based on the entered username
    // fetch(`backend-server/user-images?username=${username}`)
    //   .then((response) => response.json())
    //   .then((data) => setUserImages(data))
    //   .catch((error) => console.log(error));
    const response = await axios.get(
        `https://api.unsplash.com/users/${username}/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      )
      .then((data) => {
        setUserImages(data.data)
        console.log(data.data[0])
      })
      .catch((error) => console.log(error));    
  };

  return (
    <div>
      <h1>User Images</h1>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter username"
      />
      <button onClick={handleSearch}>Search</button>

      {userImages.map((image, index) => (
        <div>
            <img key={index} src={image.urls.regular} alt={`User Image ${index}`} />
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

export default UserImages;
