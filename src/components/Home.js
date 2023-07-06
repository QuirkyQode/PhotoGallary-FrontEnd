import React from "react";
import { Link } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.css"

function Home() {
  return (
    <div className="container d-flex flex-column  align-items-center justify-content-center vh-100">
      <h1>Welcome to the Photo Gallery!</h1>
      <p>Using Unsplash APIs</p>
      <Link to="/random-images">View Random Images</Link>
      <br />
      <Link to="/user-images">Search Images by Username</Link>
      <br />
      <Link to="/image/123">View Image by ID</Link>
    </div>
  );
}

export default Home;
