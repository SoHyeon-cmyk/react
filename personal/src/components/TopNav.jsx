import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoIosWine } from "react-icons/io";



const TopNav = () => {
  const [activeNav, setActiveNav] = useState(1)
  const activeStyle={
    
  }


  return (
    <div>
      <header className='nav'>
        <NavLink><img src="" alt="Logo" /></NavLink>
        <nav>
          <ul>
            <li>
              <NavLink to="/" onClick={()=>{setActiveNav(1)}} style={({isActive})=>(isActive ? activeStyle : undefined)}>Home</NavLink>
              <NavLink to="/search" onClick={()=>{setActiveNav(2)}}style={({isActive})=>(isActive ? activeStyle : undefined)}>Search</NavLink>
              <NavLink to="/recipe" onClick={()=>{setActiveNav(3)}}style={({isActive})=>(isActive ? activeStyle : undefined)}>Recipe</NavLink>
              <NavLink to="/comunity" onClick={()=>{setActiveNav(4)}}style={({isActive})=>(isActive ? activeStyle : undefined)}>Comunity</NavLink>
              <NavLink to="/mypage" onClick={()=>{setActiveNav(5)}}style={({isActive})=>(isActive ? activeStyle : undefined)}>Mypage</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default TopNav;