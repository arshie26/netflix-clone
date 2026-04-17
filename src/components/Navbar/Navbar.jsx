import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import {useRef, useEffect} from 'react'
import { auth } from '../../firebase/init.js'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 


const Navbar = (props) => {
  
  /* ACTIVATE REF AND NAVIGATION HOOKS */
  const navRef = useRef();
  const navigate = useNavigate();

  /* STATE VARIABLE FOR MOBILE MENU TOGGLE */
  const [mobile, setMobile] = useState(false);

  /*  ON COMPONENT MOUNT, ADD A SCROLLING TRACKER
      THAT TURNS THE GRADIENT MENU BACKGROUND SOLID */
  useEffect(() => {
    console.log("NavRef Current ", navRef.current);
    window.addEventListener('scroll', () => {
      if(window.scrollY >= 80){
        console.log("NavRef Current ", navRef.current);
        navRef.current.classList.add("dark-menu");
      }
      else{
        console.log("NavRef Current ", navRef.current);
        navRef.current.classList.remove("dark-menu");
      }
    })
    
  }, [])
  
  /* TOGGLES MOBILE MENU */
  function openMenu(){
    console.log("mobile menu clicked", mobile);
    if(!mobile){
      document.body.classList += " mobile";
      setMobile(true);
    }
    else{
      document.body.classList.remove("mobile");
      setMobile(false);
    }
  }

  /* USER LOGOUT */
  async function logout(){
    signOut(auth);
    console.log("Signed out");
  }

  return (
    <div ref={navRef} className='navbar'>
      {/* LEFT NAVBAR */}
      <div className='navbar-left'>
        <img src={logo /* ONCLICK NAV NOT WORKING */} alt=""/>
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Categories</li>
        </ul>
      </div>
      
      {/* HAMBURGER MENU BUTTON */}
      <button className="btn__menu" onClick={openMenu}>
        <FontAwesomeIcon icon={["fas", "bars"]} />
      </button>

      {/* LEFT NAVPANE FOR MOBILE */}
      <div className="navpane__left">
        <button className="btn__menu" onClick={openMenu}>
          <FontAwesomeIcon icon={["fas", "times"]} />
        </button>
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Categories</li>
        </ul>
      </div>

      {/* RIGHT NAVBAR */}
      <div className="navbar__right--container">

        <div className='navbar-right'>
          <img src={search_icon} alt="" className='icons'/>
          <p>Children</p>
          <img src={bell_icon} alt="" className='icons'/>
          <div className='navbar-profile'>
            {Object.keys(props.user).length > 0 ? 
            <>
              <img src={profile_img} alt="" className='profile'/>
              <img src={caret_icon} alt=""/>
              <div className='dropdown'>
                <p>{props.user.email}</p>
                <p onClick={logout}>Sign Out of Netflix</p>
              </div>
            </> :
            <>
              <button onClick={() => {navigate("/login")}} className="login__button">Login</button>
            </>
            }
          </div>
        </div>
      </div>
    </div>
    
    
  )
}

export default Navbar
