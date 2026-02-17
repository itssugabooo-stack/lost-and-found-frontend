import React from "react";
import { useNavigate } from "react-router-dom";


import Button from "./Button";
import "../App.css";

export default function Navbar() {
    const navigate = useNavigate();
return (
    <header className="nav">
      <div className="container navRow">
        <div className="brandRow">
          <div className="brandIcon"><img src="/location.png" alt="location" /></div>
          <div className="brandName">Lost &amp; Found</div>
        </div>

        <div className="navRight">
          <a className="navLink" href="#browse">Browse Items</a>
          <Button variant="primary" onClick={() => navigate("/signin")}>
            Get Started
        </Button></div>
      </div>
    </header>
  );
}
