import './App.css'
import React from 'react';

import { HashRouter, Routes, Route } from 'react-router-dom';

import AdminUploadPage from './Pages/AdminUploadPage';
import UserPage from './Pages/UserPage';
import AboutUs from './Pages/AboutUs';
function App() {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<UserPage/>}/>
                    <Route path="/secretUploadAdmin" element={<AdminUploadPage/>}/>
                    <Route path="/aboutUs" element={<AboutUs/>} />
                </Routes>
            </HashRouter>
        </>
    )
}

export default App
