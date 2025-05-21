import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("price-asc");
  const [filters, setFilters] = useState({
    categories: [],
    materials: [],
    purpose: [],
    minPrice: '',
    maxPrice: '',
  });

  const categories = ["Стілець", "Диван", "Шафа", "Ліжко", "Стіл"];
  const materials = ["Дерево", "Метал", "Пластик"];
  const purpose = ["Вітальня", "Спальня", "Кухня", "Офіс", "Дитяча", "Вулиця"];

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        const normalized = data.map(item => ({
          ...item,
          price: Number(item.price)
        }));
        setProducts(normalized);
        setLoading(false);
      })
      .catch(error => console.error("Помилка при отриманні товарів:", error));
  }, []);

  const handleCheckboxChange = (filterName, value, checked) => {
    setFilters(prev => {
      const currentValues = prev[filterName] || [];
      return {
        ...prev,
        [filterName]: checked
          ? [...currentValues, value]
          : currentValues.filter(v => v !== value),
      };
    });
  };

  const handlePriceInputChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredProducts = useMemo(() => {
    const { categories, materials, purpose, minPrice, maxPrice } = filters;
    return products
      .filter(product => {
        const tags = product.tags || {};
        const price = product.price;
        const min = Number(minPrice);
        const max = Number(maxPrice);

        const categoryMatch = !categories.length || categories.includes(tags.категорія);
        const materialMatch = !materials.length || materials.includes(tags.матеріал);
        const purposeMatch = !purpose.length || purpose.includes(tags.призначення);
        const minMatch = !minPrice || price >= min;
        const maxMatch = !maxPrice || price <= max;

        return categoryMatch && materialMatch && purposeMatch && minMatch && maxMatch;
      })
      .sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        return 0; 
      });
  }, [products, filters, sortOption]);

  const renderCheckboxList = (title, items, filterName) => (
    <div>
      <h3>{title}</h3>
      <ul className="filter-list">
        {items.map(item => (
          <li key={item}>
            <label>
              <input
                type="checkbox"
                value={item}
                onChange={e =>
                  handleCheckboxChange(filterName, item, e.target.checked)
                }
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
        <select
          id="sort"
          className="sort-select"
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
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
          </div>
        </aside>

        <div className="shop-grid">
          {loading ? (
            <p>Завантаження товарів...</p>
          ) : filteredProducts.length === 0 ? (
            <p>Немає товарів за заданими фільтрами</p>
          ) : (
            filteredProducts.map(product => (
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
