import React from 'react';
import './qr_gen.css';
import { logout } from '../utils/logout';
import { NavLink , useNavigate} from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'

export default function QRGen(props) {
    const { isAuthenticated, websocketUpdate } = props;
    const [qrText, setQrText] = React.useState("");
    const [qrImage, setQrImage] = React.useState(null);
    const navigate = useNavigate();

    const username = localStorage.getItem('username');
    

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    }, []);

    function handleQrFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const text = formData.get('text-input');
        const imageFile = formData.get('image-input');
        const reader = new FileReader();
        setQrText(text);
        reader.onload = (e) => {
            setQrImage(e.target.result);
            commitToStorage(text, e.target.result);
        };
        reader.readAsDataURL(imageFile);
    }

    function commitToStorage(text, image) {
        // Later, this will send our data to the server
        const existingQRcodes = localStorage.getItem("QRcodes");
        const newQRcodes = existingQRcodes ? JSON.parse(existingQRcodes) : [];
        newQRcodes.push({ text: text, image: image });
        localStorage.setItem("QRcodes", JSON.stringify(newQRcodes));
        console.log("Stored " + text + " and " + image + " to local storage");
    }

    return (
        
        <main>
            <form className="qr-input" onSubmit={handleQrFormSubmit}>
                <input className="text-input" name="text-input" type = "text" placeholder = "Enter your text here"/>
                <label className="file-input-label" htmlFor="image-input">Upload an image:</label>
                <input className="file-input" name="image-input" type = "file" accept="image/*"/>
                <input className="submit-button" type = "submit" value = "Generate QR code"/>
            </form>

            <div className="qr-preview">
                {qrText ? <QRCodeCanvas value={qrText} size={256} 
                imageSettings={qrImage ? {src : qrImage} : undefined}/> :
                <img alt="YOU'RE QR PREVIEW TO APPEAR HERE" src="placeholder.png"/>}
            </div>

            <div className = "notification-box">
                <p>{websocketUpdate}</p>
            </div>
        </main>
    );
}

export function QRNav(props) {
    const { setIsAuthenticated } = props;
    const username = localStorage.getItem('username');
    return (
        <nav className="nav-bar">
                <NavLink className="nav-link" to="/" onClick={() => logout(setIsAuthenticated)}>Logout [{username}]</NavLink>
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