import { useContext, useState,useRef } from 'react'
import React from 'react'
import { BrowserRouter as Router, Route, Routes,useLocation } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import {RestaurantContext} from "./context/RestaurantContext.jsx"
import Signup from './Components/AuthComponents/Signup'
import Login from './Components/AuthComponents/Login';
import RestaurantList from './Components/RestaurantList';
import Resturant from './Components/Resturant';
import Cart from './Components/Cart.jsx';
import FoodItem from './Components/FoodItem.jsx';
import NavBar from './Components/NavBar.jsx';
import Home from './Components/Home.jsx';
import ProtectedRestaurantList from './Redux/ProtectedResturantList.jsx';

function App() {
  const {selectedRestaurant}=useContext(RestaurantContext)

  return (
    <>
    <Router>
      <NavBar/>
      
      <Routes>
      <Route path="/" element={<Home />} />
    <Route path="/cart" element={<Cart />} />
             <Route path="/rest" element={<ProtectedRestaurantList/>} />
             <Route path="/signin" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            </Routes>
    </Router>
    

    {/* <div className="container">
        <h1 className="header">VINIYO</h1>
        <Cart
            style={{ position: "absolute", right: "20px", top: "20px" }}
        />
        <RestaurantList />
        {selectedRestaurant && <FoodItem />}
    </div> */}
</>
  )
}

export default App
