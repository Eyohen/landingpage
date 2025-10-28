import React, { useState } from 'react';
import axios from 'axios';
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home';
// import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';


const App = () => {

  const isAuthenticated = true;

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      {/* 404 Page */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App