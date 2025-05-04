import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./shop.css";

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        categories: [],
        materials: [],
        purpose: [],
        minPrice: '',
        maxPrice: '',
    });

    const categories = ["Стільці", "Дивани", "Шафи", "Ліжка"];
    const materials = ["Дерево", "Метал", "Пластик"];
    const purpose = ["Вітальня", "Спальня", "Кухня", "Офіс", "Дитяча", "Вулиця"];

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => console.error("Помилка при отриманні товарів:", error));
    }, []);

    const handleCheckboxChange = (filterName, value, checked) => {
        setFilters((prev) => {
            const currentValues = prev[filterName] || [];
            return {
                ...prev,
                [filterName]: checked
                    ? [...currentValues, value]
                    : currentValues.filter((v) => v !== value),
            };
        });
    };

    const handlePriceInputChange = (type, value) => {
        setFilters((prev) => ({ ...prev, [type]: value }));
    };

    const handleApplyFilters = () => {
        console.log("Застосовані фільтри:", filters);
    };

    const renderCheckboxList = (title, items, filterName) => (
        <div>
            <h3>{title}</h3>
            <ul className="filter-list">
                {items.map((item) => (
                    <li key={item}>
                        <label>
                            <input
                                type="checkbox"
                                value={item.toLowerCase()}
                                onChange={(e) => handleCheckboxChange(filterName, item.toLowerCase(), e.target.checked)}
                            />
                            {item}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="shop-container">
            <div className="sort-bar">
                <label htmlFor="sort" className="sort-label">Сортувати:</label>
                <select id="sort" className="sort-select">
                    <option value="price-asc">Ціна (зростання)</option>
                    <option value="price-desc">Ціна (спадання)</option>
                    <option value="popularity">Популярність</option>
                    <option value="new">Нові товари</option>
                </select>
            </div>

            <div className="shop-content">
                <aside className="filters">
                    {renderCheckboxList("Категорії", categories, "categories")}
                    {renderCheckboxList("Матеріали", materials, "materials")}
                    {renderCheckboxList("Призначення", purpose, "purpose")}

                    <h3>Ціна</h3>
                    <div className="price-filter">
                        <div className="price-inputs">
                            <input
                                type="number"
                                placeholder="Мін."
                                value={filters.minPrice}
                                onChange={(e) => handlePriceInputChange("minPrice", e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Макс."
                                value={filters.maxPrice}
                                onChange={(e) => handlePriceInputChange("maxPrice", e.target.value)}
                            />
                        </div>
                        <button onClick={handleApplyFilters}>OK</button>
                    </div>
                </aside>

                <div className="shop-grid">
                    {loading ? (
                        <p>Завантаження товарів...</p>
                    ) : (
                        products.map((product) => (
                            <Link
                                to={`/product/${product._id}`}
                                key={product._id}
                                className="product-card"
                            >
                                <img src={product.image} alt={product.name} className="product-image" />
                                <h3>{product.name}</h3>
                                <p>{product.price} грн</p>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Shop;