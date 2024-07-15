import React from 'react'
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import NavbarH from '../components/NavbarH';

const Home = () => {
  const navigate = useNavigate();
  
  const redirectGraph = () => {
    navigate("/graphs");
  }

  const redirectSorting = () => {
    navigate("/sorting");
  }

  return (
    <>
      <NavbarH />
      <hr></hr>
      <div className="main">  
        <button className="home-btn" onClick={()=> redirectGraph()}>Graphs</button>
        <button className="home-btn" onClick={()=> redirectSorting()}>Sorting</button>
      </div>
    </>
  )
}

export default Home
