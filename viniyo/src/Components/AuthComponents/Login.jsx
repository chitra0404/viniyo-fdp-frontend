import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { loginUser } from "../../Redux/Reducer/UserReducer";

function Login() {
 const dispatch=useDispatch();
 const [user, setUser] = useState({email:"", password:""});
 const navigate = useNavigate();
 

 const [open, setOpen] = useState(false)
const handleClose = () => { setOpen(false)}

const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setOpen(true)
    try{
     const res = await axios.post("http://localhost:3000/user/login", user)
     console.log(res);
     if(res?.status === 200){
       setUser({email:"", password:""})
    
       localStorage.setItem("tokenAuth", res.data.token);

       console.log(res.data.token)
       localStorage.setItem("email", res.data.email)
      
       setTimeout(() => {
        navigate("/");
      }, 1000);
     
       dispatch(loginUser(user))
    }
    else{
      handleClose()
      //console.log(response);
    }
   }
   catch(error){
    handleClose()
    console.log(error, error.message);
    setUser({...user, password:""})
    window.alert(`Invalid. Try again`)
   }
}

  return (
    <section className="vh-100 vw-100 justify-content-center" >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
      
          
          <div className="col ">
            
                    <form onSubmit={handleLoginSubmit}>
                      <div className="d-flex align-items-center ">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold">Login</span>
                      </div>

                      <h5
                        className="fw-normal"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div className="form-outline">
                        <label className="form-label" htmlFor="loginemail">
                          Email address :
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          placeholder="Email address"
                          value={user.email}
                          onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                       
                      </div>
                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="loginpassword">
                          Password :
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          placeholder="Enter your Password"
                          value={user.password}
                          onChange={(e) => setUser({...user, password: e.target.value})}
                          
                        />
                      
                      </div>
                      <p className="mb-1 text-center">
                        <span className="text-primary fw-bold">
                          {open ? "Successfully loggedin" : null}
                        </span>
        
                      </p>

                      <div className="pt-1 mb-2">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                     
                    
                      <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link
                          to="/signin"
                          style={{ color: "#393f81" }}
                        >
                          Register here
                        </Link>
                      </p>
                      <p className="small text-muted">
                        Terms of use. Privacy policy
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            
         
    </section>
  );
}

export default Login;