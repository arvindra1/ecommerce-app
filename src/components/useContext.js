import React, { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.item];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};

const favReducer = (state, action) => {
  switch (action.type) {
    case 'add_to_favorite':
      return [...state, action.item];
    case 'remove_from_favorite':
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const [favItem, disfav] = useReducer(favReducer, []);

  const [userUID, setUserUID] = React.useState(null); // Initialize with null
  const [datauser, setdataUser] = useState(''); // Initialize with null
  const [isCart, setCart ] = useState(null);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        dispatch,
        userUID,
        setUserUID,
        datauser,
        setdataUser,
        favItem,
        disfav,
        isCart, 
        setCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
