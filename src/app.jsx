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
        <h1 className="header-title">404 - Page Not Found</h1>
    );
}

function NotFoundNav() {
    return (
        <nav className="nav-bar">
            <NavLink to="/" className="nav-link">Back To Home</NavLink>
        </nav>
    );
}

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [websocketUpdate, setWebsocketUpdate] = React.useState("Waiting to get cool Websocket updates here!");

    setInterval(() => {
        // This is just temporary until I get the real websocket thing going
        const message = "Random User number " + Math.floor(Math.random() * 101) + " Just Generated a QR code!";
        setWebsocketUpdate(message);
    }, 5000)

    return (
            <BrowserRouter>
            <div className="body">
            <header>
            <div className = "header-title">
                <Routes>
                    <Route path="/" element={<LoginName />} />
                    <Route path="/qr_gen" element={<QRGenName/>} />
                    <Route path="/personal" element={<PersonalName/>} />
                    <Route path="*" element={<NotFoundName />} />
                </Routes>
            </div>
            <Routes>
                <Route path="/" element={<LoginNav />} />
                <Route path="/qr_gen" element={<QRNav setIsAuthenticated={setIsAuthenticated}/>} />
                <Route path="/personal" element={<PersonalNav setIsAuthenticated={setIsAuthenticated}/>} />
                <Route path="*" element={<NotFoundNav />} />
            </Routes>

            </header>

            <Routes>
                <Route path="/" element={<Login isAuthenticated={isAuthenticated} 
                setIsAuthenticated={setIsAuthenticated} websocketUpdate={websocketUpdate}/>} />

                <Route path="/qr_gen" element={<QRGen isAuthenticated={isAuthenticated} websocketUpdate={websocketUpdate}/>} />
                <Route path="/personal" element={<Personal isAuthenticated={isAuthenticated} websocketUpdate={websocketUpdate}/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <footer>
            <p>&copy; 2025 QR Code Generator. All rights reserved.</p>
            </footer>

            </div>
            </BrowserRouter>

    );
}