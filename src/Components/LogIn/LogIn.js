import React, { useState, useContext } from 'react';
import './LogIn.css';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGoogleSignIn, handleSignOut, initializeLogInFrameWork, signInWithEmailAndPassword } from './LogInManager';


function LogIn() {

  initializeLogInFrameWork();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, doRedirect) => {
    setUser(res)
    setLoggedInUser(res)
    if(doRedirect) {
      history.replace(from);
    }
  }

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      });
  }


  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  }


  const facebookSignIn = () => {
    handleFacebookSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    success: false
  })

  const handleBlur = (e) => {
    let isFiledValid = true;
    if (e.target.name === 'email') {
      isFiledValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      isFiledValid = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})").test(e.target.value);
    }
    if (isFiledValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleClick = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    e.preventDefault();
  }

  return (
    <div className="body">
      <div>

        {
          user.isSignedIn ?
            <Button onClick={signOut} variant="contained" color="secondary">
              Sign Out
            </Button> :
            <Button onClick={googleSignIn} variant="contained" color="secondary">
              Sign In
            </Button>
        }
        <br />
        <br />

        <Button onClick={facebookSignIn} variant="contained" color="secondary">
          Sign In Using Facebook
            </Button>
      </div>
      <div>
        <h1>Our Authentication System</h1>
        <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
        <label htmlFor="newUser">New User Registration</label>
        <form onClick={handleClick}>
          {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name" required />}
          <br />
          <input type="email" name="email" onBlur={handleBlur} placeholder="Enter Your Email" required />
          <br />
          <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required />
          <br />
          <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
        </form>

        {
          user.success ? <p style={{ color: "green" }}>User {newUser ? "created" : "Signed In"} Successfully</p> :
            <p style={{ color: "red" }}>{user.error}</p>
        }
      </div>

      <div>
        {
          user.isSignedIn && <div>
            <p>Welcome, {user.name}</p>
            <img src={user.photo} alt="" />
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
          </div>
        }
      </div>
    </div>
  );
}

export default LogIn;
