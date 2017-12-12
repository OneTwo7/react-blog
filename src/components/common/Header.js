import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav>
    <NavLink exact to="/">Home</NavLink>
    {" | "}
    <NavLink to="/new_post">New Post</NavLink>
  </nav>
);

export default Header;
