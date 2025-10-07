import React from 'react';
import './qr_gen.css';

export default function QRGen() {
    return (
        <main>
            <form class="qr-input">
                <input class="text-input" type = "text" placeholder = "Enter your text here"/>
                <label class="file-input-label" for="image-input">Upload an image:</label>
                <input class="file-input" id="image-input" type = "file" accept="image/*"/>
                <input class="submit-button" type = "submit" value = "Generate QR code"/>
            </form>

            <div class="qr-preview">
                <img alt="YOU'RE QR PREVIEW TO APPEAR HERE" src="placeholder.png"/>
            </div>

            <div class = "notification-box">
                <p>Placeholder for WebSocket connection updates on User's generating their QR codes</p>
            </div>
        </main>
    );
}

export function QRNav() {
    return (
        <nav class="nav-bar">
                <a class="nav-link" href="index.html">Logout</a>
                <a href="personal.html" class="nav-link">View Personal Page</a>
        </nav>
    );
}

export function QRGenName() {
    return (
        <h1 class="header-title">Your Tab for QR generation!</h1>
    );
}