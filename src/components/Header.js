import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav
        style={{ backgroundColor: "#65B8F9" }}
        className="navbar navbar-expand-lg shadow"
      >
        <Link
          style={{ fontFamily: "Poppins", color: "#ffffff" }}
          className="navbar-brand"
          to="/"
        >
          Leaderboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          <ul className="navbar-nav">
            <li style={{ fontFamily: "Poppins" }} className="nav-item mr-4">
              <Link
                style={{
                  fontFamily: "Poppins",
                  color: "#ffffff",
                  textDecoration: "None",
                }}
                to={"/"}
              >
                All Leaderboard
              </Link>
            </li>
            <li style={{ fontFamily: "Poppins" }} className="nav-item">
              <Link
                style={{
                  fontFamily: "Poppins",
                  color: "#ffffff",
                  textDecoration: "none",
                }}
                to={"/country-leaderboard"}
              >
                Country Leaderboard
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
