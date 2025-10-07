import React from 'react';
import './login.css';

export default function Login() {
    return (
        <main>

            <div className = "chuck-box">
                <p>Chuck Norris joke of the Day[3rd Party API call]</p>
            </div>

            <form className="login-form" action="/qr_gen.html">
                <label>Login Here</label>
                <input type="text" name="username" placeholder="Username"/>
                <input type="password" name="password" placeholder="Password"/>
                <button type="submit">Login</button>
            </form>

            <div className = "notification-box">
                <p>Placeholder for WebSocket connection updates on User's generating their QR codes</p>
            </div>
        </main>
    );
}

export function LoginName() {
    return (
    <h1>
    The Epic QR Code Generator
    </h1> );
}

export function LoginNav() {
    return (
        <nav className = "nav-bar">
            <a className = "nav-link" href="https://github.com/BryantSteed/startup">GitHub Repository</a>
        </nav>
    );
}
