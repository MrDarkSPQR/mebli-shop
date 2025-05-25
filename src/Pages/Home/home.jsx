import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
    const navigate = useNavigate();

    const handleCategoryClick = (filterType, filterValue) => {
        if (filterValue === 'Кімнати') {
            navigate('/shop', { state: { filters: { purpose: ['Вітальня'] } } });
        } else if (filterValue === 'Спальня') {
            navigate('/shop', { state: { filters: { purpose: ['Спальня'] } } });
        } else if (filterValue === 'Вуличні') {
            navigate('/shop', { state: { filters: { purpose: ['Вулиця'] } } });
        } else if (filterValue === 'Новинки' || filterValue === 'Популярне') { 
            alert(`Функціонал "${filterValue}" поки що недоступний.`);
        }
    };

    return (
        <div className="home-container">
            <div className="banner">
                <img src="/images/fon.png" alt="Фоновий банер" className="banner-image" />
            </div>
            
            <div className="category-cards">
                <div className="category-card" onClick={() => handleCategoryClick('special', 'Новинки')}>
                    <div className="card-placeholder"></div> 
                    <span>Новинки</span>
                </div>
                <div className="category-card" onClick={() => handleCategoryClick('purpose', 'Спальня')}>
                    <img src="/images/bedroom.png" alt="Спальня" className="category-card-image" />
                    <span>Спальня</span>
                </div>
                <div className="category-card" onClick={() => handleCategoryClick('purpose', 'Кімнати')}>
                    <img src="/images/vitalnya.png" alt="Кімнати" className="category-card-image" />
                    <span>Кімнати</span>
                </div>
                <div className="category-card" onClick={() => handleCategoryClick('purpose', 'Вуличні')}>
                    <img src="/images/dvir.png" alt="Вуличні" className="category-card-image" />
                    <span>Вуличні</span>
                </div>
                <div className="category-card" onClick={() => handleCategoryClick('special', 'Популярне')}>
                    <div className="card-placeholder"></div> 
                    <span>Популярне</span>
                </div>
            </div>
        </div>
    );
}

export default Home;