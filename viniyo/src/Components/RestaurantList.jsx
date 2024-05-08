import React, { useContext, useState, useEffect,useRef } from 'react';
import Resturant from './Resturant';
import {RestaurantContext} from "../context/RestaurantContext";
import PastOder from './PastOder';
import { Navigate } from 'react-router-dom';
import FoodItem from './FoodItem';


function RestaurantList() {
    const { restaurants, setSelectedRestaurant,selectedRestaurant } = useContext(RestaurantContext);
    console.log(restaurants)
    const [filteredRestaurants, setFilteredRestaurants] = useState([restaurants]);
    const [ratingFilter, setRatingFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const menuRef = useRef(null);

   

    useEffect(() => {
        filterRestaurants();
    }, [ratingFilter, searchTerm, restaurants]);
 
    const handleRestaurantClick = (restaurantId) => {
const rest=(restaurants.find((restaurant) => restaurant._id === restaurantId));
setSelectedRestaurant(rest);
scrollToMenu();
    };
 
    const handleRatingChange = (e) => {
        setRatingFilter(e.target.value);
    };
 
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
 
    const filterRestaurants = () => {
        let filtered = restaurants;
 
        if (ratingFilter) {
            filtered = filtered.filter((restaurant) => restaurant.rating >= parseFloat(ratingFilter));
        }
 
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter((restaurant) =>
                restaurant.name.toLowerCase().includes(searchLower)
            );
        }
 
        setFilteredRestaurants(filtered);
    };
    const scrollToMenu = () => {
        menuRef.current.scrollIntoView({ behavior: 'smooth' });
      };

  return (
    <div className="container pt-5">
        <div className="row">
            <h2 className="header">Restaurant List</h2>
            <div className="filter-container">
                <label htmlFor="rating" className="filter-label">
                    Filter by Rating:
                </label>
                <input
                    type="number"
                    id="rating"
                    value={ratingFilter}
                    onChange={handleRatingChange}
                    className="filter-input"
                />
               
                <label htmlFor="search" className="filter-label mt-10">
                    Search by Name:
                </label>
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="filter-input"
                />
                
            </div>
            <div className='container pt-5'>
            <div className="restaurant-card-container ">
            
  <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredRestaurants.map((restaurant) => (
                     <div className="col" >
                     <div className="card h-100">
                    <Resturant
                        key={restaurant._id}
                        restaurant={restaurant}
                        onClick={() => handleRestaurantClick(restaurant._id)}
                    />
                    </div>
            </div>
                ))}
            
            </div>
            </div>
            </div>
            
 </div>
 {selectedRestaurant && <div ref={menuRef} ><FoodItem /></div>}
        </div>
  )
}

export default RestaurantList