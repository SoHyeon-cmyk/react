import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';



const TopNav = () => {
  const getNavLinkClass = ({ isActive }) => (isActive ? "active" : "");


  return (
    <div>
    <header className="nav">
      <NavLink to="/" className="logo">
        <img src="/image/jpg/logo.png" alt="Logo" />
        <h3>몰디브한잔</h3>
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
            <NavLink to="/search" className={getNavLinkClass}>Search</NavLink>
            <NavLink to="/recipe" className={getNavLinkClass}>Recipe</NavLink>
            <NavLink to="/comunity" className={getNavLinkClass}>Community</NavLink>
            <NavLink to="/mypage" className={getNavLinkClass}>Mypage</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  </div>
  );
};

export default TopNav;