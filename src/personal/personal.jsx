import React from 'react';
import './personal.css'

export default function Personal() {
    return (
        <main>

            <div className = "qr-gallery">
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
                <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
                </div>
            </div>

            <div className = "notification-box">
                <p>Placeholder for WebSocket connection updates on User's generating their QR codes</p>
            </div>

        </main>
    );
}

export function PersonalName() {
   return (
    <h1 class="header-title">Your Personal QR Codes</h1>
   );
}

export function PersonalNav() {
    return (<nav class="nav-bar">
                <a href = "index.html" class="nav-link">Logout [username]</a>
                <a href= "qr_gen.html" class="nav-link">Back to QR Generation Page</a>
            </nav>);
}