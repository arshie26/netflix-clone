import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import './Login.css'
import { db } from '../../firebase/init'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = (props) => {
  
  /* REACT STATE VARIABLE FOR REGISTRATION/LOGIN TOGGLE */
  const [formSwitch, updateFormSwitch] = useState(false);

  const [loading, setLoading] = useState(false);

  /* ACTIVATE NAVIGATION HOOK */
  const navigate = useNavigate();

  /* REACT STATE VARIABLES FOR FORM FIELDS */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ON CLICK, TOGGLE TO LOGIN FORM */
  function switchToLogin(){
    updateFormSwitch(true);
    console.log("switched to login");
  }
  
  /* ON CLICK, TOGGLE TO REGISTRATION FORM */
  function switchToRegister(){
    updateFormSwitch(false);
    console.log("switched to registration");
  }
  
  /* ERROR DISPLAY FUNCTION FOR BAD USER INPUT */
  function inputError(){
    /* ERROR: EMAIL ADDRESS DOES NOT INCLUDE @" */
    if(!email.includes("@"))
      {toast.error("Make sure your email includes @domain.com")} 

    /* ERROR: DOMAIN IS MALFORMED */
    else if(!email.includes(".com") || !email.includes(".net"))
      {toast.error("Make sure your domain is spelled correctly")}
  }

  /* LOGIN/REGISTRATION METHOD */
  async function register(event) {
    setLoading(true);
    event.preventDefault();
    console.log("login");
    console.log(event);
     
    /* LOGIN SEQUENCE */
    if(formSwitch){
      /* LOGIN AND NAVIGATE TO HOME PAGE UPON SUCCESSFUL LOGIN*/
      try{
        console.log("Email and password submtted are ", email, password);
        let response = await signInWithEmailAndPassword(props.auth, email, password);
        console.log("login user is now ", response);
        setLoading(false);
        navigate("/");
      }
      /* IF LOGIN IS NOT SUCCESSFUL, DISPLAY ERROR MESSAGE */
      catch(error){
        setLoading(false);
        console.log("error is ", error);
        toast.error(error.code)
      }
    }

    /* REGISTRATION SEQUENCE */
    else {

      /* REGISTER, ADD THE USER TO THE LIST OF USERS AND NAVIGATE TO HOMEPAGE */
      try{
        let { user } = await createUserWithEmailAndPassword(props.auth, email, password);
        console.log("User sign up is now ", user);  
        let newDoc = await addDoc(collection(db, "user"), {
          uid: user.uid,
          name,
          email,
          authProvider: "local"
        })

        console.log("New doc is ", newDoc);
        setLoading(false);
        navigate("/");
      }
      /* UPON ERROR, CATCH AND DISPLAY THE ERROR */
      catch(error){
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      }
    }
  }

  
  return (
    <div>
      {
      /* DISPLAYS LOADING STATE IF ACTIVE */
      loading?  
      <div className="spinner__container" >
        <img src={netflix_spinner} className="spinner" />
      </div>
      :
      <div className="login">
        <img src={logo} onClick={() => {navigate("/")}} className="login__logo"/>
        <div className="login__form">
          <h1 className='login__title'>{formSwitch? "Sign In" : "Sign Up"}</h1>
          <form onSubmit={register /* SUBMISSION STAGE TOGGLE NOT WORKING */}>
            <hr className="divider" />
            {/* IF USER SWITCHES FORM TO LOGIN, THEN NAME INPUT FIELD DISAPPEARS */
            formSwitch? <></>:
              <>
                <label>Your Name</label>
                <br />
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} 
                className="input name__input" placeholder="Your Name" />
              </>
            }
            <label>Email Address</label>
            <br />
            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} onInvalid={() => {inputError()}} 
            className="input email__input" placeholder="email@email.com" />
            <label>Password</label>
            <br />
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="input password__input" placeholder="password" />
            <button type='submit' className='login__btn'>{formSwitch? "Login": "Signup"}</button>
            <div className="form__help">
              <div className="remember">
                <input type="checkbox" />
                <p>Remember Me</p>  
              </div>
              <a>Need help?</a>
            </div>
            <div className="form__switch">

            {/* ALLOWS USER TO SWITCH BACK AND FORTH BETWEEN LOGIN AND REGISTRATION FORMS */
            formSwitch? 
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
    }
    </div>
  )
}

export default Login
