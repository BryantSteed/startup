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
    console.log("Fetching stored QR codes...");
    const response = await fetch("/api/qr", {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    console.log("received QR codes from server")
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
                <p>Fetching your QR codes ... Be Patient Please</p>
            </div>
        );
    }
    if (qrCodes.length === 0) {
        return (
            <div className = "qr-item">
                <img src="placeholder.png" alt = "Your QR codes will appear here"/>
                <p>No QR codes generated yet.</p>
            </div>
        );
    }
    const qrArray = [];
    let keyCounter = 0;
    for (const qrCode of qrCodes) {
        qrArray.push(
            <div key={`${keyCounter++}`} className = "qr-item">
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