import React, { useEffect, useState } from 'react'
import type { Product } from '../../types/Product'
import { getProducts } from '../../api/productApi';
import { addCartItems, getCart } from '../../api/cartApi';
import { ShoppingCart } from 'lucide-react';
import type { Cart, CartItem } from '../../types/Cart';

interface ProductListProps {
    selectedCategory: number | null;
}

const ProductList: React.FC<ProductListProps> = ({ selectedCategory }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [carts, setCarts] = useState<Cart[]>([]);
    const [selectedCart, setSelectedCart] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .finally(() => setLoading(false));
        getCart().then((carts: Cart[] | null) => setCarts(carts ?? []));
    }, []);

    const filteredProducts = selectedCategory == null
        ? products
        : products.filter(product => product.categoryId === selectedCategory);

    const handleAddToCartClick = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
        setSelectedCart(carts.length > 0 ? carts[0].id : null);
        setQuantity(1);
    };

    const handleModalSubmit = async () => {
        if (!selectedProduct || !selectedCart) return;

        const newItem: CartItem = {
            cartId: selectedCart,
            productId: selectedProduct.id,
            quantity,
            price: selectedProduct.price
        };

        try {
            await addCartItems(newItem); // <-- API call
            alert(`Added ${quantity} of "${selectedProduct.name}" to Cart ${selectedCart}`);
            setShowModal(false);w
        } catch (error) {
            console.error("Error adding item to cart", error);
            alert("Failed to add item to cart");
        }
    };

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
                                    <button
                                        className="bg-indigo-500 text-white text-lg px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition"
                                        onClick={() => handleAddToCartClick(product)}
                                    >
                                        <ShoppingCart size={20} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 text-black">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
                        <h2 className="text-xl font-bold mb-4">Add to Cart</h2>
                        <p className="mb-2">Product Id: <span className="font-semibold">{selectedProduct.id}</span></p>
                        <p className="mb-2">Product: <span className="font-semibold">{selectedProduct.name}</span></p>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Select Cart:</label>
                            <select
                                className="w-full border rounded px-2 py-1"
                                value={selectedCart ?? ''}
                                onChange={e => setSelectedCart(Number(e.target.value))}
                            >
                                {carts.map(cart => (
                                    <option key={cart.id} value={cart.id}>
                                        {`Cart ${cart.id}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Quantity:</label>
                            <input
                                type="number"
                                min={1}
                                className="w-full border rounded px-2 py-1"
                                value={quantity}
                                onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Price per unit: Rs {selectedProduct.price}</label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                                onClick={handleModalSubmit}
                                disabled={!selectedCart}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
