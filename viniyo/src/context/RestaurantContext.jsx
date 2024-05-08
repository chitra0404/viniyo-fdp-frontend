import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const RestaurantContext=createContext();
    const RestaurantProvider=({children})=>{
        const [restaurants,setRestaurants]=useState([]);
        const [selectedRestaurant, setSelectedRestaurant] = useState(null);
        const [cartItems, setCartItems] = useState([]);
        const [totalPrice, setTotalPrice] = useState(0);
    

    useEffect(()=>{
        const fetchRest=async()=>{
            try{
                const res=await axios.get("http://localhost:3000/rest/get")
                console.log(res.data)
                setRestaurants(res.data)
            }
        
        catch(err){
console.log("error occured",err)
        } }
        fetchRest();
    },[]);

    const handleAddItem=(food)=>{
        const existingItem=cartItems.findIndex((item)=>item._id===food._id);
        if(existingItem!=-1){
            const updateItem=[...cartItems];
            updateItem[existingItem]={...updateItem[existingItem],quantity:updateItem[existingItem].quantity+1}
            setCartItems(updateItem)
        }
        else{
            setCartItems([...cartItems,{...food,quantity:1}])
        }
        setTotalPrice((prev)=>prev+food.price);
    };
    const handleRemoveItem=(food)=>{
        const existingItem=cartItems.findIndex((item)=>item._id===food._id);
        if(existingItem!=-1){
            const updateItem=[...cartItems];
            if(updateItem[existingItem].quantity>1)
            updateItem[existingItem]={...updateItem[existingItem],quantity:updateItem[existingItem].quantity-1}
            setTotalPrice(totalPrice-cartItems[existingItem].price)
        }
        
        else{
            updateItem.splice(existingItem,1);
            setTotalPrice(totalPrice-cartItems[existingItem].price)

        }
        setCartItems(updateItem);
    };

    const emptycart=()=>{
        setCartItems([]);
        setTotalPrice(0);
    }
  const value={
    restaurants,selectedRestaurant,setSelectedRestaurant,handleAddItem,handleRemoveItem,cartItems,totalPrice,emptycart
  }  

  return(
    <RestaurantContext.Provider value={value}>
        {children}
    </RestaurantContext.Provider>
  );
};

 export {RestaurantContext};
 export {RestaurantProvider};


