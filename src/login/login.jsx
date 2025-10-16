import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom'

export default function Login(props) {


    const [joke, setJoke] = React.useState("Still Awaiting The Chuck Norris Joke")

    const {isAuthenticated, setIsAuthenticated, websocketUpdate} = props;

    function fetchJoke() {
        fetch("https://icanhazdadjoke.com", 
            {headers: {"Accept": "application/json"}})
        .then((response) => response.json())
        .then((data) => {
        console.log(data.joke);
        setJoke(data.joke);});
    }

    React.useEffect(fetchJoke, []);

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
        console.log("Just authenticated this guy");
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
