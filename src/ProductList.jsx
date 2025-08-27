// ProductList.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice'; // ✅ Import addItem from CartSlice
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();

  // ✅ Added state for tracking products added to cart
  const [addedToCart, setAddedToCart] = useState({});
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const plantsArray = [
    {
      category: "Indoor Plants",
      plants: [
        {
          name: "Spider Plant",
          description: "A resilient indoor plant with air-purifying qualities.",
          cost: 10,
          image: "https://www.ikea.com/in/en/images/products/chlorophytum-plant-with-pot-spider-plant__0637062_pe698976_s5.jpg"
        },
        {
          name: "Peace Lily",
          description: "An elegant plant known for its white flowers and air cleaning ability.",
          cost: 15,
          image: "https://www.gardendesign.com/pictures/images/900x705Max/site_3/peace-lily-spathiphyllum-flower-shutterstock-com_14424.jpg"
        },
        {
          name: "Snake Plant",
          description: "A hardy plant that thrives on neglect and improves indoor air quality.",
          cost: 12,
          image: "https://www.thesill.com/cdn/shop/files/the-sill_snake-plant-laurentii_variant_xl_growpot_terracotta.jpg"
        }
      ]
    }
  ];

  // ✅ Handle Add to Cart function
  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch to global cart (CartSlice)
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true, // Mark this plant as added locally
    }));
    setCart((prevCart) => [...prevCart, product]); // Keep local cart too
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      {!showCart ? (
        <div>
          <h1>Our Plants</h1>
          <div className="product-grid"> {/* ✅ Wrapper as per earlier task */}
            {plantsArray.map((category, index) => (
              <div key={index}>
                <h1><div>{category.category}</div></h1>
                <div className="product-list">
                  {category.plants.map((plant, plantIndex) => (
                    <div className="product-card" key={plantIndex}>
                      <img
                        className="product-image"
                        src={plant.image}
                        alt={plant.name}
                      />
                      <div className="product-title">{plant.name}</div>
                      <div className="product-description">{plant.description}</div>
                      <div className="product-cost">${plant.cost}</div>

                      {/* ✅ Add to Cart button with addedToCart state */}
                      <button
                        className="product-button"
                        onClick={() => handleAddToCart(plant)}
                        disabled={addedToCart[plant.name]}
                      >
                        {addedToCart[plant.name] ? "Added ✅" : "Add to Cart"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="cart-button" onClick={() => setShowCart(true)}>
            View Cart
          </button>
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} cartItems={cart} />
      )}
    </div>
  );
}

export default ProductList;
