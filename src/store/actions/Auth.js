import * as actionTypes from './actionsTypes';
import  firebase from 'firebase/app';
import 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyC0ifleXXk5347PBjXxcPH7TLxwTdoULG8",
    authDomain: "my-burger-35804.firebaseapp.com",
    databaseURL: "https://my-burger-35804.firebaseio.com",
    projectId: "my-burger-35804",
    storageBucket: "",
    messagingSenderId: "656499631018",
    appId: "1:656499631018:web:692e5a813da8a24b48c1d3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  


const initAuth=()=>{

    return{
        type:actionTypes.INITAUTH
    }
}

const auth_success=(token, uid)=>{
    localStorage.setItem("token",token)
    localStorage.setItem("userID",uid)
    
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userID:uid
    }
}

const auth_failed=(error)=>{
    
    return {
        type:actionTypes.AUTH_FAILED,
        error:error
    }
}



const auth_logout=()=>{
    
    return(dispatch)=>{
        setTimeout(()=>{
            dispatch(setlogout())
        },3600000)
    }

}

export const  auth_account= (data,status)=>{
    
    const authdata={
        email:data.Email,
        password:data.Password,
        
    }
    return (dispatch)=>{
    dispatch(initAuth())
    if (!status){
        let authref=firebase.auth()
        authref.createUserWithEmailAndPassword(authdata.email, authdata.password)
        .then(()=>{
        let user=authref.currentUser
        user.updateProfile({displayName:"user"})
        return user;
        })
        .then((response)=>{
        dispatch(auth_success(response.ma, response.uid))
        dispatch(auth_logout())
        })
        .catch((error)=>{
            dispatch(auth_failed(error.message))
        })
    }
    else{
        firebase.auth().signInWithEmailAndPassword(authdata.email, authdata.password)
        .then((response)=>{
            console.log(response)
            dispatch(auth_success(response.user.ma, response.user.uid))
            dispatch(auth_logout())
        })
        .catch((error)=>{
            console.log(error.message)
            dispatch(auth_failed(error.message))
        })
    }
    
    }
    }

    export const setlogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("userID")
        return{
            type:actionTypes.AUTH_LOGOUT
            

        }
    }


    export const authicatedRefresh=()=>{
        const token=localStorage.getItem("token");
        const userId=localStorage.getItem("userID");
        return (dispatch)=>{
            if(token){
                dispatch(auth_success(token,userId))  
                dispatch(auth_logout())
            }

        }

    }