import React, { useState, useEffect } from "react";
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

function RandomImages() {
  const [randomImages, setRandomImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

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


  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === randomImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? randomImages.length - 1 : activeIndex - 1;
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

  const slides = randomImages.map((image, index) => {
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
        <h1>Random Images</h1>
        <Link to="/" className="ms-auto">Home</Link>
      </div>
      {/* {randomImages.map((image, index) => (
        <div>
          <img key={index} src={image.urls.small} alt={`Random Image ${index}`} />
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
        items={randomImages}
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

export default RandomImages;