import React from "react";
import "./home.css";

function Home() {
    return (
        <div className="home-container">
            <div className="banner">
                <img src="/images/fon.png" alt="Фоновий банер" className="banner-image" />
            </div>
            
            <div className="category-cards">
                <div className="category-card">
                    <div className="card-placeholder"></div>
                    <span>Новинки</span>
                </div>
                <div className="category-card">
                    <div className="card-placeholder"></div>
                    <span>Розпродаж</span>
                </div>
                <div className="category-card">
                    <div className="card-placeholder"></div>
                    <span>Кімнати</span>
                </div>
                <div className="category-card">
                    <div className="card-placeholder"></div>
                    <span>Вуличні</span>
                </div>
                <div className="category-card">
                    <div className="card-placeholder"></div>
                    <span>Популярне</span>
                </div>
            </div>
        </div>
    );
}

export default Home;