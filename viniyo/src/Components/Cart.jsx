import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RestaurantContext } from '../context/RestaurantContext';
import PastOder from "./PastOder";
import { Base_Url } from "../config/api";

function Cart() {
  const { cartItems, totalPrice, emptycart } = useContext(RestaurantContext);
  const [check, setCheck] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [open,setOpen]=useState(false);
  const [modalMsg, setmodalMsg] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false)} 
  const [place, setPlace] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // Define and initialize setDialogOpen

  const handleDialogOpen = () => {
    setDialogOpen(true);
    setPlace(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const initPayment = (data, order, email) => {
    const options = {
      key: "rzp_test_Rak7JNwDPS3zsN",
      amount: data.amount,
      currency: data.currency,
      name: email,
      description: "testing payment",
      image: order.order_pic_URL,
      order_id: data.id,
      handler: async (response) => {
        try {
          const token = localStorage.getItem('tokenAuth');
          const config = { headers: { "x-auth-token": token } };
          const verifyURL = `${Base_Url}/payment/verify`;
          const resp = await axios.post(verifyURL, { ...response, ...order, email }, config);
          console.log("verify resp", resp);
          emptycart();
          handleClose();
          setForm(false);
        } catch (error) {
          setPlace(false);
          console.log(error);
          handleClose();
        }
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', async (data) => {
      try {
        const token = localStorage.getItem('tokenAuth');
        const config = { headers: { "x-auth-token": token } };
        const failureURL = `${Base_Url}/payment/failed`;
        const resp = await axios.post(failureURL, { ...data.error.metadata, ...order, email }, config);
        console.log("failed resp", resp);
        emptycart();
        handleClose();
        setForm(false);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handlePayment = async (order) => {
    const token = localStorage.getItem('tokenAuth');
    const email = localStorage.getItem('email');
    if (!token || !email) {
      alert("Login to buy");
    } else {
      setmodalMsg("Placing order..");
      handleOpen();
      try {
        const config = { headers: { "x-auth-token": token } };
        const { data } = await axios.post(`${Base_Url}/payment/orders`, { amount: order.amount }, config);
        console.log("data", data);
        initPayment(data.data, order, email);
      } catch (error) {
        console.error(error);
        handleClose();
      }
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setPlace(true);
    handleDialogClose();
    setOpen(true); // Assuming setOpen is also defined somewhere in your component
    const d = new Date();
    const del = new Date();
    del.setDate(del.getDate() + 10);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const dt = d.getDate();
    const date1 = `${year}${month < 10 ? '0' + month : month}${dt < 10 ? '0' + dt : dt}`;
    const yearDel = del.getFullYear();
    const monthDel = del.getMonth() + 1;
    const dtDel = del.getDate();
    const date2 = `${yearDel}-${monthDel < 10 ? '0' + monthDel : monthDel}-${dtDel < 10 ? '0' + dtDel : dtDel}`;

    const order = {
      order_items: cartItems,
      phone: phone,
      address: addr,
      order_Status: "PLACED",
      order_qty: 1,
      amount: totalPrice,
      order_ETA: date2,
      order_pic_URL: "https://t4.ftcdn.net/jpg/00/79/53/85/360_F_79538507_HbR2XzYpYK9zyI1xJN3uJBjDexA6ei9l.jpg"
    };

    console.log(order);
    handlePayment(order);
  };

  const handleCheck = async () => {
    try {
      setCheck(false);
      await axios.post(`${Base_Url}/order/past`);
      emptycart();
    } catch (err) {
      console.log("Error", err);
    } finally {
      setCheck(false);
    }
  };

  const handleShow = () => {
    setShowOrder(!showOrder);
  };

  return (
    <section className="vh-100 vw-100 pt-5 mt-5">
      <div className="d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 justify-content-center align-items-center">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="cart-container d-flex justify-content-center pt-5">
                  <h2 className="justify-content-center align-items-center">Cart</h2>

                  {cartItems.map((item) => (
                    <div key={item._id} className="cart-item">
                      <div>
                        <h3>{item.name}</h3>
                      </div>
                      <div>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-content">
                  <span style={{ color: "brown" }}>Total Price: </span> ${totalPrice}
                  <button onClick={handleCheck} className="justify-content-center align-items-center">Checkout</button>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p id='pre-orders' onClick={handleShow}>
                    Previous Orders
                  </p>
                  {showOrder && <PastOder handleShow={handleShow} />}
                </div>

                {cartItems.length > 0 && <button onClick={handleDialogOpen}>confirm order</button>}

                <form onSubmit={handleCreateOrder}>
                  <div className="form-outline mb-2">
                    <input
                      type="text"
                      name="cust_phone"
                      className="form-control"
                      placeholder="Enter cust_phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-2">
                    <input
                      type="text"
                      name="cust_address"
                      className="form-control"
                      placeholder="Enter the customer_address"
                      value={addr}
                      onChange={(e) => setAddr(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
