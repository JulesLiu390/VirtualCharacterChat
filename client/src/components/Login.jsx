import React, { useEffect, useState } from 'react'
import { LoginBackGround } from '../assets/img';
import {motion} from 'framer-motion'
import {FcGoogle} from 'react-icons/fc'
import { app } from '../config/firebase.config';
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {useNavigate} from "react-router-dom"

export const Login = ({setAuth}) => {
  console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("Auth Domain:", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
console.log("Project ID:", process.env.REACT_APP_FIREBASE_PROJECT_ID);
  // console.log("Firebase Config:", firebaseConfig);
  // console.log("Firebase API Key:", process.env.REACT_APP_FIREBASE_API_KEY);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  const navigate = useNavigate();

  // const [{user}, dispatch] = useStateValue();

  // const loginWithGoogle = async() => {
  //   await signInWithPopup(firebaseAuth, provider).then((userCred) => {
  //     if(userCred) {
  //       setAuth(true);
  //       window.localStorage.setItem("auth", "true");

  //       firebaseAuth.onAuthStateChanged((userCred) => {
  //         if(userCred) {
  //           userCred.getIdToken().then((token) => {
  //             validateUser(token).then((data) => {
  //               dispatch({
  //                 type : actionType.SET_USER,
  //                 user : data,
  //               })
  //             })
  //           })
  //           navigate("/", {replace : true});
  //         } else {
  //           setAuth(false);
  //           dispatch({
  //             type : actionType.SET_USER,
  //             user : null,
  //           })
  //           navigate("/login");
  //         }
  //       });
  //     }
  //   });
  const loginWithGoogle = async() => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if(userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if(userCred) {
              console.log(userCred);
              navigate('/', {replace:true});
            } else {
              setAuth(false);
              navigate('/login')
            }
          })
      }
    });
  }

  // }

  useEffect(() => {
    if(window.localStorage.getItem("auth") === "true") {
      navigate("/", {replace:true});
    }
  }, [])

  return (
      
      <div className='relative w-screen h-screen overflow-hidden'>
        <motion.img src={LoginBackGround} alt="Fullscreen Cover" className='absolute w-full h-full object-cover'/>
        <div className='absolute inset-0  flex items-center justify-center p-4'>
          <div className='w-375 md:w-375 p-4 bg-lightOveray shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOveray cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all font-semibold'
              onClick={loginWithGoogle}
            >
              <FcGoogle className='text-xl'/>
                Sign in with Google.
            </div>
          </div>
        </div>  
    </div>
  )
  
}

export default Login;