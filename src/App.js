import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
import Home from "./components/Home";
import RandomImages from "./components/RandomImages";
import UserImages from "./components/UserImages";
import SingleImage from "./components/SingleImage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/random-images" element={<RandomImages/>} />
        <Route path="/user-images" element={<UserImages/>} />
        <Route path="/image/:id" element={<SingleImage/>} />
      </Routes>
    </Router>
  );
}

export default App;