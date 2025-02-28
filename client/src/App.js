import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Dashboard, CharacterPage, Login, Game } from './components'



function App() {
  return (
    <div className='fixed'>
      <Routes>
        <Route path='/game' element={<Game/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/*' element={<Home></Home>} />
        <Route path='/dashboard/*' element={<Dashboard />}/>
        <Route path='/character' element={<CharacterPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
