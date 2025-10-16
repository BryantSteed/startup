import React from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import './personal.css'
import { QRCodeCanvas } from 'qrcode.react'

export default function Personal(props) {
    const { isAuthenticated, websocketUpdate } = props;
    const navigate = useNavigate();
    
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    }, []);

    function fetchStoredQRCodes() {
        const existingQRcodes = localStorage.getItem("QRcodes");
        if (existingQRcodes) {
            return JSON.parse(existingQRcodes);
        } else {
            return [];
        }
    }

    function QRCodeList() {
        const qrCodes = fetchStoredQRCodes();
        if (qrCodes.length === 0) {
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

    return (
        <main>

            <div className = "qr-gallery">
                <QRCodeList />
            </div>

            <div className = "notification-box">
                <p>{websocketUpdate}</p>
            </div>

        </main>
    );
}

export function PersonalName() {
    const username = localStorage.getItem('username');
    return (
    <h1 className="header-title">{username}'s Personal QR Codes</h1>
    );
}

export function PersonalNav() {
    const username = localStorage.getItem('username');
    return (<nav className="nav-bar">
                <NavLink to="/" className="nav-link">Logout [{username}]</NavLink>
                <NavLink to="/qr_gen" className="nav-link">Back to {username}'s QR Generation Page</NavLink>
            </nav>);
}