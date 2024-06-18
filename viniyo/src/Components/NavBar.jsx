import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle, FaCartPlus } from 'react-icons/fa';
import { IoSearchSharp } from 'react-icons/io5';
import { logoutUser } from "../Redux/Reducer/UserReducer";

function NavBar() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="navbar fixed-top navbar-light p-2 text-white bg-white border-bottom border-3 border-danger">
      <div className="container-fluid">
        <div className="navbar-brand" style={{ textAlign: 'left' }}>
          <Link className="text-dark" to="/">
            <h1 className="fs-1 fst-italic text-danger">viniyo</h1>
          </Link>
        </div>

        <ul className="nav">
          <li className="nav-item nav1">
            <Link className="nav-link text-dark active" aria-current="page" to="/">
              <h5>Home</h5>
            </Link>
          </li>

          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="nav-link text-dark active" aria-current="page" to="/rest">
                  <h5>
                    <IoSearchSharp /> Search
                  </h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark active" aria-current="page" to="/cart">
                  <h5>
                    <FaCartPlus /> Cart
                  </h5>
                </Link>
              </li>
            </>
          )}

          <li className="nav-item">
            {isAuthenticated ? (
              <Link className="nav-link text-dark" to="/logout" onClick={handleLogout}>
                <h5>
                  <FaUserCircle /> Logout
                </h5>
              </Link>
            ) : (
              <Link className="nav-link text-dark" to="/login">
                <h5>
                  <FaUserCircle /> SignIn
                </h5>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
