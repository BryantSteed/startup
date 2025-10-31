import React from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import './personal.css'
import { QRCodeCanvas } from 'qrcode.react'
import { logout } from '../utils/logout';

export default function Personal(props) {
    const { isAuthenticated, websocketUpdate } = props;
    const navigate = useNavigate();
    
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    }, []);

    return (
        <main>

            <QRCodeGallery />

            <WebSocketUpdateBox websocketUpdate={websocketUpdate} />

        </main>
    );
}

async function fetchStoredQRCodes(setQRCodes) {
    const response = await fetch("/api/qr", {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    setQRCodes(data.qrCodes);
}

function QRCodeList() {
    const [qrCodes, setQRCodes] = React.useState(null);
    React.useEffect(() => {
        fetchStoredQRCodes(setQRCodes);
    },[]);
    if (!qrCodes) {
        return (
            <div className = "qr-item">
                    <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                    <p>www.example.com</p>
            </div>
        );
    }
    const qrArray = [];
    for (const qrCode of qrCodes) {
        qrArray.push(
            <div className = "qr-item">
                {<QRCodeCanvas value={qrCode.text} size={128}
                imageSettings={qrCode.image ? {src : qrCode.image} : undefined}/>}
                <p>{qrCode.text}</p>
            </div>
        );
    }

    return qrArray;
}

function QRCodeGallery() {
    return (
    <div className = "qr-gallery">
        <QRCodeList />
    </div>);
}

function WebSocketUpdateBox(props) {
    const { websocketUpdate } = props;
    return (
    <div className = "notification-box">
        <p>{websocketUpdate}</p>
    </div>);
}

export function PersonalName() {
    const username = localStorage.getItem('username');
    return (
    <h1 className="header-title">{username}'s Personal QR Codes</h1>
    );
}

export function PersonalNav(props) {
    const { setIsAuthenticated } = props;
    const username = localStorage.getItem('username');
    return (<nav className="nav-bar">
                <NavLink to="/" onClick={() => logout(setIsAuthenticated)} className="nav-link">Logout [{username}]</NavLink>
                <NavLink to="/qr_gen" className="nav-link">Back to {username}'s QR Generation Page</NavLink>
            </nav>);
}