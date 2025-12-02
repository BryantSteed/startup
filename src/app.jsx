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

async function askAuthenticationStatus(setIsAuthenticated) {
    await fetch("/api/auth", {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        if (data.username) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            console.log("User is not authenticated");
        }
        console.log("Finished checking authentication status");
    });
}

export default function App() {

    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const [websocketUpdate, setWebsocketUpdate] = React.useState("Waiting to get cool Websocket updates here!");

    React.useEffect(() => { askAuthenticationStatus(setIsAuthenticated); }, []);

    const port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    socket.onmessage = async function(event){
        const message = await event.data.text();
        console.log("Received websocket message:", message);
        setWebsocketUpdate(message);
    }

    if (isAuthenticated === null) {
        return (<p>Awaiting your status</p>);
    }

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

                <Route path="/qr_gen" element={<QRGen isAuthenticated={isAuthenticated} websocketUpdate={websocketUpdate} socketSender={socket} />} />
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