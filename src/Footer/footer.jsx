import React from "react";
import "./footer.css";

function Footer(){
    return(
        <footer className="footer">
            <div className="footer-content">
                <p>Контакти: +380 066 000 ххх</p>
                <p>Адреса: вул. Назва, №, Місто</p>
                <p>
                    Соціальні мережі:
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a>,
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;