
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'




function Navbar() {

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
  };

  const closeMenu = () => {
      setIsNavOpen(false);
  };
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div className='container-fluid m-0 p-0'>

          <button className='navbar-toggler' type="button" onClick={toggleNav}>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className={"collapse navbar-collapse " + (isNavOpen ? " show" : "")} id="navbarNav">
            <ul className='navbar-nav mx-auto'> 
              <li className='nav-item'>
                <Link to='/'>Home</Link>
              </li >
              <li className='nav-item'>
                <Link>About</Link>
              </li>
              <li className='nav-item'>
                <Link>contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div >
  )
}

export default Navbar