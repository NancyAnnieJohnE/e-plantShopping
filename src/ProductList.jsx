import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Plants array
  const plants = [
    {
      name: 'Spider Plant',
      image: 'https://www.gardendesign.com/pictures/images/675x529Max/site_3/spider-plant-chlorophytum-comosum-shutterstock-com_12434.jpg',
      description: 'An easy-to-grow indoor plant that purifies air.',
      cost: '$10.00',
    },
    {
      name: 'Peace Lily',
      image: 'https://www.gardendesign.com/pictures/images/675x529Max/site_3/peace-lily-spathiphyllum-shutterstock-com_12436.jpg',
      description: 'A beautiful flowering plant that thrives indoors.',
      cost: '$15.00',
    },
    {
      name: 'Snake Plant',
      image: 'https://www.gardendesign.com/pictures/images/675x529Max/site_3/snake-plant-sansevieria-trifasciata-shutterstock-com_12435.jpg',
      description: 'A hardy plant that improves indoor air quality.',
      cost: '$12.00',
    },
  ];

  // Function to add plant to cart
  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, quantity: 1 }));
  };

  // Calculate total number of items in cart
  const calculateTotalQuantity = () => {
    return cartItems && cartItems.length > 0
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  return (
    <div>
      <h1 className="heading">Plant Shop</h1>

      {/* Show total items in cart */}
      <div className="cart-quantity">
        <span>Total items in cart: {calculateTotalQuantity()}</span>
      </div>

      <div className="product-grid">
        {plants.map((plant) => {
          const isAdded = cartItems.some((item) => item.name === plant.name);
          return (
            <div className="product-card" key={plant.name}>
              <img src={plant.image} alt={plant.name} className="product-image" />
              <h3>{plant.name}</h3>
              <p>{plant.description}</p>
              <p className="price">{plant.cost}</p>
              <button
                className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                onClick={() => handleAddToCart(plant)}
                disabled={isAdded}
              >
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
