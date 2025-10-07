import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './app.css';

import Login, { LoginName, LoginNav } from './login/login.jsx'

import QRGen from './qr_gen/qr_gen.jsx';
import Personal from './personal/personal.jsx';

function NotFound() { 
    return <h2>Page not found</h2>;
}

export default function App() {
    return (
            <BrowserRouter>
            <div className="body">
            <header>
            <div className = "header-title">
                <Routes>
                    <Route path="/" element={<LoginName />} />
                </Routes>
            </div>
            <Routes>
                <Route path="/" element={<LoginNav />} />
            </Routes>

            </header>

            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/qr_gen" element={<QRGen/>} />
                <Route path="/personal" element={<Personal/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <footer>
            <p>&copy; 2025 QR Code Generator. All rights reserved.</p>
            </footer>

            </div>
            </BrowserRouter>

    );
}