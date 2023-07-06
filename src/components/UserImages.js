import React, { useState } from "react";
import axios from "axios";

import "../../node_modules/bootstrap/dist/css/bootstrap.css"

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import { Link } from "react-router-dom";


function UserImages() {
  const [username, setUsername] = useState("");
  const [userImages, setUserImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);


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

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === userImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? userImages.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const [hover, setHover] = useState(false); // initial false

  const onHover = (e) => {
    e.preventDefault();
    setHover(true); // turn true
    console.log("hovered");
  };

  const offHover = (e) => {
    e.preventDefault(); // turn false
    setHover(false);
  };

  const slides = userImages.map((image, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        {hover && <div className="text-center position-absolute top-10 text-white bg-secondary bg-gradient 
         bg-opacity-25">
        <p>Description: {image.description} </p>
        <p>{image.alt_description }</p>
        <p>Photo ID : {image.id} </p>
        <p>User Name: {image.user.username}</p>
        <p>User Id: {image.user.id}</p>
      </div>}
        <img onMouseEnter={(e) => onHover(e)}
        onMouseLeave={(e) => offHover(e)}
        className="d-block rounded vh-60" src={image.urls.regular} alt={image.alt_description} />
        <CarouselCaption
          captionText=""
          captionHeader="hover for Info"
        >
        </CarouselCaption>
      </CarouselItem>
    );
  });

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex w-100 m-3">
        <h1>User Images</h1>
        <Link to="/" className="ms-auto">Home</Link>
        
      </div>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter username"
        className="m-2"
      />
      <button onClick={handleSearch} className="m-3">Search</button>

      {/* {userImages.map((image, index) => (
        <div>
            <img key={index} src={image.urls.regular} alt={`User Image ${index}`} />
            <p>Description : {image.description}</p>
            <p>{image.alt_description}</p>
            <p>Photo ID : {image.id} </p>
            <p>User Name: {image.user.username}</p>
            <p>User Id: {image.user.id}</p>
        </div>
      ))} */}

<Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      // {...args}
    >
      <CarouselIndicators
        items={userImages}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        className="bg-secondary bg-gradient 
        bg-opacity-10"
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
      className="bg-secondary bg-gradient 
      bg-opacity-10"
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>

    </div>
  );
}

export default UserImages;
