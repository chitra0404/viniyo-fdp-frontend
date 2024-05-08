import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PastOder=({handleShow})=>{
    const [order,setOrder]=useState([]);

    useEffect(()=>{
        const fetchOrder=async()=>{
try{
    const response = await axios.get('http://localhost:3000/order/get');
    setOrder(response.data);
}
catch(err){
    console.log("error",err);
}
        }
  fetchOrder();      
    },[])

    return(
        <div className="previous-orders-container">
        <h2>Your Previous Orders</h2>
        <button style={{ backgroundColor: "white", color: "red" }} onClick={handleShow}>Close</button>
        <ul className="orders-list">
            {order.map(orders => (
                <li key={orders.orderId} className="order-card">
                    <h3>Order #{orders.orderId}</h3>
                    <div className="order-details">
                        <div>Items: 1</div>
                        <div>Total Amount: ${orders.amount.toFixed(2)}</div>
                    </div>
                    <div>Ordered on: {new Date(orders.dateOfOrder).toLocaleDateString()}</div>
                </li>
            ))}
        </ul>
    </div>
    )
}

export default PastOder;