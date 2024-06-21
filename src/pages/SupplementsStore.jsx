import React, {useContext, useState} from 'react';
import { CartContext } from '../context/CartContext';

const products = [
  { id: 1, name: 'Whey Protein', price: 4999, image: '/images/whey-protien.png' },
  { id: 2, name: 'Creatine', price: 999, image: '/images/Creatine.png' },
  { id: 3, name: 'BCAA', price: 999, image: '/images/BCAA.png' },
  { id: 4, name: 'Pre-Workout', price: 1999, image: '/images/Preworkout.png' },
];

function SupplementsStore() {
  const { addToCart } = useContext(CartContext)

const [searchTerm, setSearchTerm] = useState('');

  // Filter supplements based on search term
  const filteredProducts = products.filter(supplement =>
    supplement.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="supplements-store min-h-screen bg-gray-100">
      <main className="container mx-auto p-6">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-brand-dark mb-4">Supplements Store</h2>
          <p className="text-brand-neutral max-w-2xl mx-auto">
            Explore our range of high-quality supplements to help you achieve your fitness goals.
          </p>
          <div className="mb-4">
                <input
                type="text"
                placeholder="Search supplements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded"
                />
          </div>
        </section>
        {searchTerm ?
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
            <div key={product.id} className="border p-4 rounded shadow">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded" />
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="mb-2">{product.description}</p>
                    <p className="text-lg font-bold mb-2">₹ {product.price}</p>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-brand-primary text-white p-2 rounded hover:bg-brand-dark"
                    >
                    Add to Cart
                    </button>
                </div>
            ))}
        </div>
        </>
        :
        <>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map(product => (
                <div key={product.id} className="bg-white shadow-md rounded p-6 text-center">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                    <h3 className="text-xl font-bold text-brand-brand-dark mb-2">{product.name}</h3>
                    <p className="text-lg text-brand-neutral mb-4">₹ {product.price.toFixed(2)}</p>
                    <button 
                    onClick={() => addToCart(product)} 
                    className="bg-brand-primary text-white p-2 rounded hover:bg-brand-dark"
                    >
                    Add to Cart
                    </button>
                </div>
                ))}
            </section>
        </>
        }
      </main>
    </div>
  );
}

export default SupplementsStore;
