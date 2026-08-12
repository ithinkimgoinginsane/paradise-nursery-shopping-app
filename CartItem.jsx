import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costString) => parseFloat(costString.replace('$', ''));

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>

      {cart.length === 0 ? (
        <p style={{ marginTop: '20px' }}>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <img className="cart-item-img" src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>Unit Price: {item.cost}</p>
              <p>Total: ${calculateTotalCost(item)}</p>
            </div>
            <div>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <button onClick={() => handleRemove(item)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        ))
      )}

      <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
        <button className="get-started-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="get-started-btn" style={{ backgroundColor: '#0284c7' }} onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;