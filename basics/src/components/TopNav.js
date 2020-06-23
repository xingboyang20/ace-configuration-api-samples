import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import './TopNav.css';

const TopNav = () => (
  <div className="topnav">
    <Link to="/" className="topnav-home-link">
      <Logo /> — Ace Platform Configuration API samples
    </Link>
  </div>
);

export default TopNav;
