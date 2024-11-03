import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="navbar-nav me-auto mb-2 mb-lg-0">
      <NavLink 
        to="/people" 
        className={({ isActive }) => 
          `nav-link ${isActive ? 'active' : ''}`
        }
      >
        People
      </NavLink>
      <NavLink 
        to="/planets" 
        className={({ isActive }) => 
          `nav-link ${isActive ? 'active' : ''}`
        }
      >
        Planets
      </NavLink>
      <NavLink 
        to="/starships" 
        className={({ isActive }) => 
          `nav-link ${isActive ? 'active' : ''}`
        }
      >
        Starships
      </NavLink>
    </nav>
  );
};

export default Navigation;