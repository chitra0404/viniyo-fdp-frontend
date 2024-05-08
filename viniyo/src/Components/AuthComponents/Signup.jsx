import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import axios from 'axios';



    function Signup() {
        const [registered, setRegistered] = useState(false);
        const [success, setSuccess] = useState(false);
        // const Navigate = useNavigate();
        
        const HandleSignup = async (name, email, password,phonenumber) => {
          const userData = {
            name,
            email,
            password,
            phonenumber
          };    
          try {
            
            await axios.post(`http://localhost:3000/user/register`, userData)
            .then(res=>console.log(res));
            
            setRegistered(false)
            setSuccess(true);
            setTimeout(() => {
              Navigate("/login");
            }, 1000);
          } catch (error) {
            console.error(error);
            setRegistered(true)
            setSuccess(false)
          }
        };
      
        const validate = (values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "*Required";
          }
          if (!values.email) {
            errors.email = "*Required";
          }
          if (!values.password) {
            errors.password = "*Required";
          }else if(values.password.length<6){
            errors.password="*Minimum 6 character"
          }
          if (!values.repassword) {
            errors.repassword = "*Required";
          }
          if (!(values.repassword === values.password)) {
            errors.repassword = "*Password Mismatch";
          }
           if (!values.phonenumber) {
           errors.phonenumber = "*Required";
             }
          return errors;
          
        };
      
        const Formik = useFormik({
          initialValues: {
            name: "",
            email: "",
            password: "",
            repassword: "",
            phonenumber:"",
          
            
          },
          validate,
          onSubmit: (values) => {
            HandleSignup(
              Formik.values.name,
              Formik.values.email,
              Formik.values.password,
               Formik.values.phonenumber
            );
            Formik.values.name = "";
            Formik.values.email = "";
            Formik.values.password = "";
            Formik.values.repassword = "";
            Formik.values.phonenumber="";
      
          },
        });
      
        return (
          <section className="vw-100 vh-100 justify-content-center pt-5 " >
            <div className="d-flex align-items-center h-100 gradient-custom-3">
              <div className="row d-flex justify-content-center align-items-center h-100">
             
          <h2 className="text-uppercase text-center mb-4">
                          You can register here!
                        </h2>
      
                        <form onSubmit={Formik.handleSubmit}>
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              placeholder="Enter your name"
                              value={Formik.values.name}
                              onChange={Formik.handleChange}
                              onBlur={Formik.handleBlur}
                            />
                            {Formik.touched.name && Formik.errors.name ? (
                              <span className="fw-bold" style={{ color: "red" }}>
                                {Formik.errors.name}
                              </span>
                            ) : null}
                          </div>
      
                          <div className="form-outline mb-2">
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              placeholder="Enter your email"
                              value={Formik.values.email}
                              onChange={Formik.handleChange}
                              onBlur={Formik.handleBlur}
                            />
                            {Formik.touched.email && Formik.errors.email ? (
                              <span className="fw-bold" style={{ color: "red" }}>
                                {Formik.errors.email}
                              </span>
                            ) : null}
                          </div>
      
                          <div className="form-outline mb-2">
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              placeholder="Password"
                              value={Formik.values.password}
                              onChange={Formik.handleChange}
                              onBlur={Formik.handleBlur}                        
                            />
                            {Formik.touched.password && Formik.errors.password ? (
                              <span className="fw-bold" style={{ color: "red" }}>
                                {Formik.errors.password}
                              </span>
                            ) : null}
                          </div>
      
                          <div className="form-outline mb-2">
                            <input
                              type="password"
                              id="repassword"
                              className="form-control"
                              placeholder="Repeat password"
                              value={Formik.values.repassword}
                              onChange={Formik.handleChange}
                              onBlur={Formik.handleBlur}
                            />
                            {Formik.touched.repassword && Formik.errors.repassword ? (
                              <span className="fw-bold" style={{ color: "red" }}>
                                {Formik.errors.repassword}
                              </span>
                            ) : null}
                          </div>
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="phonenumber"
                              className="form-control"
                              placeholder="Enter your phonenumber"
                              value={Formik.values.phonenumber}
                              onChange={Formik.handleChange}
                              onBlur={Formik.handleBlur}
                            />
                            {Formik.touched.phonenumber && Formik.errors.phonenumber ? (
                              <span className="fw-bold" style={{ color: "red" }}>
                                {Formik.errors.phonenumber}
                              </span>
                            ) : null}
                          </div> 
      
                          <div className="form-check d-flex justify-content-center">
                            <label
                              className="form-check-label"
                              htmlFor="checkbox"
                              
                            >
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id="checkbox"
                                checked                                                                             
                              />
                              I agree all statements in Terms of service
                            </label>
                          </div>
                          <div className="form-outline text-center">
                            <span className="text-danger fw-bold">
                              {registered ? "User exist,Try with new mail id" : null}
                            </span>{" "}
                            <br />
                            <span className="text-primary fw-bold">
                              {success
                                ? "Registeration successful"
                                : null}
                            </span>
                          </div>
      
                          <div className="d-flex justify-content-center">
                            <button
                              type="submit"
                              className="btn btn-dark btn-lg btn-block"
                            >
                              Register
                            </button>
                          </div>
      
                          <p className="text-center text-muted">
                            Have already an account?{" "}
                            <Link to="/login" className="fw-bold text-body">
                              <u>Login here</u>
                            </Link>
                          </p>
                        </form>
                      </div>
                    </div>
                
          </section>
        );
      }
      
      export default Signup;
