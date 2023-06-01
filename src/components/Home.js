import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Photo Gallery!</h1>
      <Link to="/random-images">View Random Images</Link>
      <br />
      <Link to="/user-images">Search Images by Username</Link>
      <br />
      <Link to="/image/123">View Image by ID</Link>
    </div>
  );
}

export default Home;
