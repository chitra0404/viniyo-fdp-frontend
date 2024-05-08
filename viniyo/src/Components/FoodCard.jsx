import React, { useContext } from 'react'
import { RestaurantContext } from '../context/RestaurantContext'

function FoodCard({food}) {
const {handleAddItem,handleRemoveItem}=useContext(RestaurantContext);

const handleAdd = () => {
    handleAddItem(food);
};

const handleRemove = () => {
    handleRemoveItem(food);
};
  return (
   
    <div className="dish-card ">
            <h3 className="pt-3" >{food.name}</h3>
            
            <img src={food.image} alt=""  width="200"/>
        
            <p>Price: ${food.price}</p>
 
            <div
                style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                   
                }}
            >
                <button onClick={handleAdd}>+</button>
                {food.quantity}
                <button onClick={handleRemove}>-</button>
                
            </div>
        </div>
  )
}

export default FoodCard