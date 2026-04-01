import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import './Login.css'

const Login = () => {
  
  const [formSwitch, updateFormSwitch] = useState(false);

  function switchToLogin(){
    updateFormSwitch(true);
    console.log("registration");
  }
  
  function switchToRegister(){
    updateFormSwitch(false);
    console.log("registration");
  }
  
  function register(event) {
    console.log("login");
    console.log(event);
    console.log(event.target[0].value);
    console.log(event.target[1].value);
  }
  
  return (
    <div>
      <div className="login">
        <img src={logo} className="login__logo"/>
        <div className="login__form">
          <h1 className='login__title'>{formSwitch? "Sign In" : "Sign Up"}</h1>
          <form onSubmit={register}>
            <hr className="divider" />
            {formSwitch? <></>:
              <>
                <label>Your Name</label>
                <br />
                <input type="text" className="input name__input" placeholder="Your Name" />
              </>
            }
            <label>Email Address</label>
            <br />
            <input type="email" className="input email__input" placeholder="email@email.com" />
            <label>Password</label>
            <br />
            <input type="password" className="input password__input" placeholder="password" />
            <button type='submit' className='btn'>{formSwitch? "Login": "Signup"}</button>
            <div className="form__help">
              <div className="remember">
                <input type="checkbox" />
                <p>Remember Me</p>  
              </div>
              <a>Need help?</a>
            </div>
            <div className="form__switch">

            {formSwitch? 
              <>
                <p className="switch">Don't have an account?</p><span className="switch__button" onClick={switchToRegister}>Click to Register</span>
              </>:
              <>
                <p className="switch" >Already have an account?</p><span className="switch__button" onClick={switchToLogin}>Click to Login</span>
              </>
            }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
