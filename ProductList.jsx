import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?w=400", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400", description: "Filters toxins easily.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=400", description: "Thrives in shade.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400", description: "Loves high humidity.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400", description: "Rich glossy leaves.", cost: "$20" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400", description: "Soothing gel properties.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=400", description: "Calming scent.", cost: "$16" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400", description: "Fresh culinary herb.", cost: "$8" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400", description: "Fragrant perennial.", cost: "$12" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?w=400", description: "Sweet night-blooming flowers.", cost: "$22" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400", description: "Refreshing aromatic leaves.", cost: "$18" },
        { name: "Thyme", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400", description: "Versatile herb.", cost: "$9" }
      ]
    },
    {
      category: "Low Maintenance",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-65f2c79b9a6c?w=400", description: "Nearly indestructible.", cost: "$25" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400", description: "Fast-growing vine.", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400", description: "Tolerates neglect.", cost: "$20" },
        { name: "Succulent Trio", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400", description: "Needs minimal water.", cost: "$15" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400", description: "Symbol of good luck.", cost: "$14" },
        { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=400", description: "Thrives in low light.", cost: "$18" }
      ]
    }
  ];

  const isAdded = (plantName) => cartItems.some(item => item.name === plantName);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>Paradise Nursery</div>
        <div className="navbar-links">
          <span className="nav-link" onClick={() => setShowCart(false)}>Plants</span>
          <div className="cart-icon-container" onClick={() => setShowCart(true)}>
            🛒 <span className="cart-count">{totalCartCount}</span>
          </div>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-listing">
          {plantsArray.map((categoryObj, idx) => (
            <div key={idx}>
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="product-grid">
                {categoryObj.plants.map((plant, pIdx) => (
                  <div key={pIdx} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button
                      className="add-to-cart-btn"
                      disabled={isAdded(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isAdded(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;