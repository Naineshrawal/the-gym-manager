import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';


function Cart() {
  const { cart, removeFromCart,addToCart, buyNow } = useContext(CartContext);
  const crossSellingItems = [
    { id: 1, name: 'Whey Protein', price: 4999, image: '/images/whey-protien.png' },
    { id: 2, name: 'Creatine', price: 999, image: '/images/Creatine.png' },
  ];

  const upSellingItems = [
    { id: 3, name: 'BCAA', price: 999, image: '/images/BCAA.png' },
    { id: 4, name: 'Pre-Workout', price: 1999, image: '/images/Preworkout.png' },
  ];

  return (
    <div className="cart min-h-screen bg-gray-100">
      <main className="container mx-auto p-6">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">Shopping Cart</h2>
        </section>
        <section className="mb-12">
          {cart.items.length === 0 ? (
            <p className="text-brand-neutral text-center">Your cart is empty.</p>
          ) : (
            <div className="grid  grid-cols-1 md:grid-cols-2  gap-8">
              {cart.items.map(item => (
                <div key={item.id} className="bg-white shadow-md rounded p-6 text-center">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4" />
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{item.name}</h3>
                  <p className="text-lg text-brand-neutral mb-4">₹ {item.price.toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="bg-brand-secondary text-white p-2 rounded hover:bg-brand-dark"
                  >
                    Remove from Cart
                  </button>
                  <button 
                    onClick={() =>buyNow() } 
                    className="bg-brand-secondary text-white p-2 rounded hover:bg-brand-dark"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold text-brand-dark mb-4">You might also like</h3>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
            {crossSellingItems.map(item => (
              <div key={item.id} className="bg-white shadow-md rounded p-6 text-center">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4" />
                <h3 className="text-xl font-bold text-brand-dark mb-2">{item.name}</h3>
                <p className="text-lg text-brand-neutral mb-4">₹ {item.price.toFixed(2)}</p>
                <button onClick={()=>addToCart(item)} className="bg-brand-primary text-white p-2 rounded hover:bg-brand-dark">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-brand-dark mb-4">Recommended for you</h3>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
            {upSellingItems.map(item => (
              <div key={item.id} className="bg-white shadow-md rounded p-6 text-center">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4" />
                <h3 className="text-xl font-bold text-brand-dark mb-2">{item.name}</h3>
                <p className="text-lg text-brand-neutral mb-4">₹ {item.price.toFixed(2)}</p>
                <button onClick={()=>addToCart(item)} className="bg-brand-primary text-white p-2 rounded hover:bg-brand-dark">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Cart;
