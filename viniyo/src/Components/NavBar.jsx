import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FaCartPlus } from 'react-icons/fa';
import { IoSearchSharp } from 'react-icons/io5';
import { loginUser, logoutUser } from "../Redux/Reducer/UserReducer";


function NavBar() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-light p-2 text-white bg-white border-bottom border-3 border-danger">
        <div className="container-fluid">
          <div className="navbar-brand" style={{ textAlign: 'left' }}>
            <Link className="text-dark" to="/">
              <h1 className="fs-1 fst-italic text-danger">viniyo</h1>
            </Link>
          </div>

          <ul className="nav">
            <li className="nav-item nav1">
              <a className="nav-link  active " aria-current="page" href="#" style={{ textAlign: 'left' }}>
                <Link className="text-dark" to="/">
                  <h5>Home</h5>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link  active" aria-current="page" href="#">
                <Link className="text-dark" to="/rest">
                  <h5>
                    <IoSearchSharp />search
                  </h5>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link  active" aria-current="page" href="#">
                <Link className="text-dark" to="/cart">
                  <h5>
                    <FaCartPlus />Cart
                  </h5>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <a className="nav-link" href="#">
                  <Link className="text-dark" to="/logout" onClick={handleLogout}>
                    <h5>
                      <FaUserCircle />Logout
                    </h5>
                  </Link>
                </a>
              ) : (
                <a className="nav-link" href="#">
                  <Link className="text-dark" to="/login">
                    <h5>
                      <FaUserCircle />SignIn
                    </h5>
                  </Link>
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;