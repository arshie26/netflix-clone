import React from 'react'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Player from './pages/Player/Player'
import Login from './pages/Login/Login'
import { auth, db } from './firebase/init.js'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    console.log("App User is now ", authUser)
    
    /* WHEN USER LOGS IN OR OUT, THE USER 
    VARIABLE IS UPDATED, WHICH IS PASSED 
    BELOW TO HOME SO NAV BAR CAN BE UPDATED */
    onAuthStateChanged(auth, (user) => {
      console.log("App auth has changed", user);
      if(user){
        setAuthUser(user);
      }
      else{
        setAuthUser({});
      }
    })
  }, [/* AUTHUSER IN DEPENDENCY ARRAY NOT WORKING */])
  
  return (
    
      <div>
        <ToastContainer theme="dark"/>
        <Routes>
          <Route path="/" element={<Home user={authUser} />} />
          <Route path="/login" element={<Login auth={auth} db={db} />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </div>
    
  )
}

export default App
