import React, { createContext, useReducer,  } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.product] };
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.id) };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = product => dispatch({ type: 'ADD_TO_CART', product });
  const removeFromCart = id => dispatch({ type: 'REMOVE_FROM_CART', id });
  const buyNow = ()=>{
    fetch('https://dummyjson.com/products/1')
  .then(res => res.json())
  .then((data)=>console.log(data))
  .catch((err)=>console.log(err))
  }

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart, buyNow }}>
      {children}
    </CartContext.Provider>
  );
};


