import React from "react";
import { NavLink,useNavigate } from "react-router-dom";

function Navbaar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-0 m-0">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Contact Management System
          </NavLink>
          <button className="btn btn-success me-2 m-1" onClick={() => navigate(-1)} >
            Go Back
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbaar;
