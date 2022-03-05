import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#!"
              role="button"
              
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Notifications Dropdown Menu */}

          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="/"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
