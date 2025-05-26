import React, { useEffect, useState } from 'react'
import type { Product } from '../../types/Product'
import { getProducts } from '../../api/productApi';
import { ShoppingCart } from 'lucide-react';

interface ProductListProps{
    selectedCategory: number | null;
}

const ProductList: React.FC<ProductListProps> = ({selectedCategory}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filteredProducts = selectedCategory == null
        ? products  : products.filter(product => product.categoryId === selectedCategory);
        console.log(filteredProducts);
    return (
        <div>
            <h1>Product List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

                    {filteredProducts.map(product => (
                          <div key={product.id} className="p-4">
              <div className="bg-white h-[420px] w-full rounded-xl shadow flex flex-col items-center hover:shadow-lg transition">
                <div className="h-56 w-full rounded-t-xl bg-indigo-100 flex justify-center items-center">
                  <img
                    src={`https://localhost:7032/${product.imagePath}`}
                    alt={product.name}
                    className="h-44 w-44 object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-2 p-4">
                  <p className="text-xl font-semibold text-blue-800">{product.name}</p>
                  <p className="text-lg text-indigo-700 font-bold">${product.price}</p>
                  <button className="bg-indigo-500 text-white text-lg px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition">
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
                    ))}
                    </div>
            )}
            </div>
    );
}

export default ProductList