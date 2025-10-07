import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './app.css';

import Login, { LoginName, LoginNav } from './login/login.jsx'

import QRGen, {QRGenName, QRNav} from './qr_gen/qr_gen.jsx';
import Personal, {PersonalName, PersonalNav} from './personal/personal.jsx';

function NotFound() { 
    return (
    <main>
    <h2>Page not found sorry bro</h2>
    </main>
    );
}

function NotFoundName() {
    return (
        <h1 class="header-title">404 - Page Not Found</h1>
    );
}

function NotFoundNav() {
    return (
        <nav class="nav-bar">
            <a href = "index.html" class="nav-link">Back To Home</a>
        </nav>
    );
}

export default function App() {
    return (
            <BrowserRouter>
            <div className="body">
            <header>
            <div className = "header-title">
                <Routes>
                    <Route path="/" element={<LoginName />} />
                    <Route path="/qr_gen" element={<QRGenName />} />
                    <Route path="/personal" element={<PersonalName />} />
                    <Route path="*" element={<NotFoundName />} />
                </Routes>
            </div>
            <Routes>
                <Route path="/" element={<LoginNav />} />
                <Route path="/qr_gen" element={<QRNav />} />
                <Route path="/personal" element={<PersonalNav />} />
                <Route path="*" element={<NotFoundNav />} />
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