import React, { useState } from 'react';
import { createProduct } from '../../api/productApi';
import type { ProductFormData } from '../../types/Product';

const AddProduct: React.FC = () => {
    const [form, setForm] = useState<ProductFormData>({
        name: "",
        price: 0,
        categoryId:0,
        quantity: 0,
        image: undefined,
    });
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange =(
        e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

    )=>{
        const {name,value} = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(form);
      alert('Product created successfully!');
      setForm({ name: '', price: 0, categoryId: 0, quantity:0, image: undefined });
      setPreview(null);
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Error creating product.');
    }
  };
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-white">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category ID</label>
          <input
            type="number"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {preview && (
            <div className="mt-3 flex justify-center">
              <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg border" />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Create Product
        </button>
      </form>
    </div>
  </div>
    );
};

     
export default AddProduct;