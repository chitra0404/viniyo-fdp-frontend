import React from 'react'

const Resturant=({restaurant,onClick}) =>{
    console.log(restaurant);
  return (


    

    <div className="dish-card" width="200" onClick={onClick}>
    
    
    <div className="card h-100">

    <h3>{restaurant.name}</h3>
    <div className="image-container">
        <img className="restaurant-image" src={restaurant.image} alt={restaurant.name} width="300" />
    </div>
    <p>Rating: {restaurant.rating}</p>
    </div>
</div>


          
          
  
  )
}

export default Resturant