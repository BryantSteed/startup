import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './app.css';

import Login from './login/login.jsx'

export default function App() {
    return (
            <BrowserRouter>
            <div className="body">
            <header>
            <div className = "header-title">
                <h1>
                The Epic QR Code Generator
                </h1>
            </div>
            <nav className = "nav-bar">
                <a className = "nav-link" href="https://github.com/BryantSteed/startup">GitHub Repository</a>
            </nav>

            </header>

            <Routes>
                <Route path="/" element={<Login/>} />

            </Routes>

            <footer>
            <p>&copy; 2025 QR Code Generator. All rights reserved.</p>
            </footer>

            </div>
            </BrowserRouter>

    );
}