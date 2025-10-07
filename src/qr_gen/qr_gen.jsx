import React from 'react';
import './qr_gen.css';
import { NavLink } from 'react-router-dom';

export default function QRGen() {
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
    return (
        <nav className="nav-bar">
                <NavLink className="nav-link" to="/">Logout</NavLink>
                <NavLink className="nav-link" to="/personal">View Personal Page</NavLink>
        </nav>
    );
}

export function QRGenName() {
    return (
        <h1 className="header-title">Your Tab for QR generation!</h1>
    );
}