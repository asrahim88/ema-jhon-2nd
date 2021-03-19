import React, { useState, useContext } from 'react';
import './LogIn.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import Button from '@material-ui/core/Button';
import { UserContext }from '../../App';
import { useHistory, useLocation } from 'react-router';







if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
 


function LogIn() {
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    success: false
  })

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        const credential = result.credential;
        const user = result.user;
        console.log(user);
        const accessToken = credential.accessToken;
        console.log(accessToken);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(credential, errorMessage, errorCode, email, credential);
      });
  }

  const handleMaterialSignIn = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        }
        setUser(signedInUser);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      })
  }
  const handleMaterialSignOut = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          error: '',
          photoURL: '',
        }
        setUser(signedOutUser);
      })
      .catch((err) => {
        console.log(err);
      })
  }
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
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUser = { ...user }
          newUser.success = true;
          newUser.error = '';
          setUser(newUser);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
          console.log(error.message);
        })
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUser = { ...user }
          newUser.success = true;
          newUser.error = '';
          setUser(newUser)
          setLoggedInUser(newUser);
          history.replace(from);
          console.log('sign in user', res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
          console.log(error.message);
        });
    }
    e.preventDefault();
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(function () {
      console.log("profile updated successfully", user);
    }).catch(function (error) {
      console.log(error.message);
    });
  }

  return (
    <div className="body">
      <div>
        
        {
          user.isSignedIn ?
            <Button onClick={handleMaterialSignOut} variant="contained" color="secondary">
              Sign Out
            </Button> :
            <Button onClick={handleMaterialSignIn} variant="contained" color="secondary">
              Sign In
            </Button>
        }
        <br />
        <br />

        <Button onClick={handleFacebookSignIn} variant="contained" color="secondary">
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
