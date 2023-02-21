import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Register, Login, Chat } from './utils/imports';


function AppRoutes(props) {
  return (
    <>
        <Routes>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<Chat/>} />
        </Routes>
    </>
  )
}

export default AppRoutes