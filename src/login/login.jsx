import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom'

export default function Login(props) {


    const [joke, setJoke] = React.useState("Still Awaiting The Chuck Norris Joke")
    const [websocketUpdate, setWebsocketUpdate] = React.useState("Waiting to get cool Websocket updates here!");

    const {isAuthenticated, setIsAuthenticated} = props;

    function fetchJoke() {
        fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => response.json())
        .then((data) => {
        console.log(data.value);
        setJoke(data.value);});
    }

    React.useEffect(fetchJoke, []);

    setInterval(() => {
        // This is just temporary until I get the real websocket thing going
        const message = "Random User number " + Math.floor(Math.random() * 101) + " Just Generated a QR code!";
        setWebsocketUpdate(message);
    }, 5000)

    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const username = data.get('username');
        const password = data.get('password');

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        // This is just a placeholder until we do the service
        setIsAuthenticated(true);
        navigate("/qr_gen");

    }

    return (
        <main>

            <div className = "chuck-box">
                <p>{joke}</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <label>Login Here</label>
                <input type="text" name="username" placeholder="Username"/>
                <input type="password" name="password" placeholder="Password"/>
                <button type="submit">Login or Register</button>
            </form>

            <div className = "notification-box">
                <p>{websocketUpdate}</p>
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
            <a className = "nav-link" href="https://github.com/BryantSteed/startup">Bryant Steed GitHub Repository</a>
        </nav>
    );
}
