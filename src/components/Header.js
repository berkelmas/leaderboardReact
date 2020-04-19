import React from "react";

const Header = () => {
  return (
    <>
      <nav
        style={{ backgroundColor: "#65B8F9" }}
        className="navbar navbar-expand-lg shadow"
      >
        <a
          style={{ fontFamily: "Poppins", color: "#ffffff" }}
          className="navbar-brand"
        >
          Leaderboard
        </a>
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
              <a style={{ fontFamily: "Poppins", color: "#ffffff" }}>
                All Leaderboard
              </a>
            </li>
            <li style={{ fontFamily: "Poppins" }} className="nav-item">
              <a style={{ fontFamily: "Poppins", color: "#ffffff" }}>
                Country Leaderboard
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
