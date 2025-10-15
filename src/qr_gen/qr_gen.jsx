import React from 'react';
import './qr_gen.css';
import { NavLink } from 'react-router-dom';

export default function QRGen(props) {
    const { isAuthenticated } = props;
    const username = localStorage.getItem('username');
    if (!isAuthenticated) {
        return (
            <main>
                <h1>{username}, If you want to access your page,
                     You must be logged in</h1>
            </main>
        );
    }
    return (
        
        <main>
            <form className="qr-input">
                <input className="text-input" type = "text" placeholder = "Enter your text here"/>
                <label className="file-input-label" htmlFor="image-input">Upload an image:</label>
                <input className="file-input" id="image-input" type = "file" accept="image/*"/>
                <input className="submit-button" type = "submit" value = "Generate QR code"/>
            </form>

            <div className="qr-preview">
                <img alt="YOU'RE QR PREVIEW TO APPEAR HERE" src="placeholder.png"/>
            </div>

            <div className = "notification-box">
                <p>Placeholder for WebSocket connection updates on User's generating their QR codes</p>
            </div>
        </main>
    );
}

export function QRNav() {
    const username = localStorage.getItem('username');

    return (
        <nav className="nav-bar">
                <NavLink className="nav-link" to="/">Logout [{username}]</NavLink>
                <NavLink className="nav-link" to="/personal">View Personal Page [{username}]</NavLink>
        </nav>
    );
}

export function QRGenName() {
    const username = localStorage.getItem('username');

    return (
        <h1 className="header-title">{username}'s Page for QR generation!</h1>
    );
}