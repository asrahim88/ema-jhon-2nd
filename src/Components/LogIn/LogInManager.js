import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

export const initializeLogInFrameWork = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
        })
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        })
}

export const handleFacebookSignIn = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
            const credential = result.credential;
            const user = result.user;
            user.success = true;
            console.log(user);
            const accessToken = credential.accessToken;
            console.log(accessToken);
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log(credential, errorMessage, errorCode, email, credential);
        });
}

export const handleSignOut = () => {
    return firebase.auth()
        .signOut()
        .then(() => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                error: '',
                photoURL: '',
            }
            return signedOutUser;
        })
        .catch((err) => {
            console.log(err);
        })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const newUser = res.user;
            newUser.success = true;
            newUser.error = '';
            updateUserName(name);
            return newUser;  
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.success = false;
            newUserInfo.error = error.message;
            return newUserInfo;
        })
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUser = res.user;
            newUser.success = true;
            newUser.error = '';
            return newUser;
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.success = false;
            newUserInfo.error = error.message;
            return newUserInfo;
        });
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