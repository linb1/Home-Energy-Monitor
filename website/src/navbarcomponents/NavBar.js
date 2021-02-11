import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { NavBarData } from './NavBarData';
import './NavBar.css';
import logo from '../assets/logo.png';

function NavBar(props) {
    const checkPath = (pathname) => {
        return pathname === props.location.pathname;
    }

    return (
        <div className="navbar">
            <img src={logo} className="greener-living-logo" alt="logo"/>
            <ul className="navbar-list">
            {NavBarData.map((item, index) => {
                return (
                    <li key={index} className={`navbar-item ${checkPath(item.path) ? 'active' : ''}`}>
                        <Link to={item.path} className="navbar-link">
                            {item.icon}
                            <span className="nav-title">{item.title}</span>
                        </Link>
                    </li>
                );
            })}
            </ul>
        </div>
    );
}

export default withRouter(NavBar);
