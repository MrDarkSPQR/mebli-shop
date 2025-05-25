import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "@google/model-viewer";
import "./product.css";
import { CartContext } from "../Cart/CartContext";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => console.error("Помилка при завантаженні товару:", error));
  }, [id]);

  useEffect(() => {
    const modelViewer = document.querySelector("model-viewer");
    if (modelViewer) {
      modelViewer.scale = "1 1 1";
    }
  }, [product]);

  if (loading) return <h1>Завантаження...</h1>;

  return (
    <div className="product-page">
      <div className="product-layout">
        <div className="product-3d-container">
          {product.model && (
            <model-viewer
              src={product.model}
              alt={product.name}
              scale="1 1 1"
              auto-rotate
              camera-controls
              camera-orbit="180deg 90deg 10m"
            ></model-viewer>
          )}
        </div>

        <div className="product-info-container">
          <div className="product-characteristics">
            <h3>Характеристики</h3>
            {product.tags ? (
              <ul className="product-tags">
                {Object.entries(product.tags).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Інформація відсутня</p>
            )}
          </div>

          <p className="product-price">{product.price} грн</p>
           <button 
            className="add-to-cart" 
            onClick={() => {
              addToCart(product); 
              alert("Товар додано до кошика!"); 
            }}>
            Додати в кошик
          </button>
        </div>
      </div>

      <div className="product-description-container">
        <h2>Опис товару</h2>
        <p className="product-description">{product.description}</p>
      </div>
    </div>
  );
}

export default Product;
