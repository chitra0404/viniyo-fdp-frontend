import React, { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import FoodCard from './FoodCard';


function FoodItem(){
    const { selectedRestaurant } = useContext(RestaurantContext);
    console.log("Resturant",selectedRestaurant);

    return(
        <div>
        <h2>Menu</h2>
        {selectedRestaurant && (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {selectedRestaurant.menu.map((food) => (
                    <FoodCard key={food.name} food={food} />
                ))}
            </div>
        )}
    </div>
    )
}

export default FoodItem;