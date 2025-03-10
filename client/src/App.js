import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Dashboard, Characters, Login, Game, Test } from './components'
import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'
import NewCharacter from './components/NewCharacter'



function App() {
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === true)

  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((useCred) => {
      if(useCred) {
        console.log(useCred.getIdToken().then((token) => {
          console.log(token)
        }))
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false")
        navigate('/login')
      }
    })
  }, [])

  return (
    <div className='fixed'>
      <Routes>
        <Route path='/game' element={<Game/>} />
        <Route path='/login' element={<Login setAuth={setAuth}/>} />
        <Route path='/*' element={<Home></Home>} />
        <Route path='/dashboard/*' element={<Dashboard />}/>
        <Route path='/characters' element={<Characters/>}/>
        <Route path='/newcharacter' element={<NewCharacter/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </div>
  );
}

export default App;
