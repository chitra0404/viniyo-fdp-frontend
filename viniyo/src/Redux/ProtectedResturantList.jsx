import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RestaurantList from "../Components/RestaurantList";

const ProtectedRestaurantList = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please login to view the restaurant list.");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // or you can render a loading state or a message
  }

  return <RestaurantList />;
};

export default ProtectedRestaurantList;