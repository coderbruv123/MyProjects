import { useState } from "react";

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Books" },
  { id: 4, name: "Home" },
];

const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$19.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 1.",
    categoryId: 1,
  },
  {
    id: 2,
    name: "Product 2",
    price: "$29.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 2.",
    categoryId: 2,
  },
  {
    id: 3,
    name: "Product 3",
    price: "$39.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 3.",
    categoryId: 1,
  },
  {
    id: 4,
    name: "Product 4",
    price: "$24.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 4.",
    categoryId: 3,
  },
  {
    id: 5,
    name: "Product 5",
    price: "$34.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 5.",
    categoryId: 4,
  },
  {
    id: 6,
    name: "Product 6",
    price: "$44.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 6.",
    categoryId: 2,
  },
  {
    id: 7,
    name: "Product 7",
    price: "$54.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 7.",
    categoryId: 1,
  },
  {
    id: 8,
    name: "Product 8",
    price: "$64.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 8.",
    categoryId: 3,
  },
  {
    id: 9,
    name: "Product 9",
    price: "$74.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 9.",
    categoryId: 4,
  },
  {
    id: 10,
    name: "Product 10",
    price: "$84.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 10.",
    categoryId: 2,
  },
  {
    id: 11,
    name: "Product 11",
    price: "$94.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 11.",
    categoryId: 1,
  },
  {
    id: 12,
    name: "Product 12",
    price: "$104.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 12.",
    categoryId: 2,
  },
  {
    id: 13,
    name: "Product 13",
    price: "$114.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 13.",
    categoryId: 3,
  },
  {
    id: 14,
    name: "Product 14",
    price: "$124.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 14.",
    categoryId: 4,
  },
  {
    id: 15,
    name: "Product 15",
    price: "$134.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 15.",
    categoryId: 1,
  },
  {
    id: 16,
    name: "Product 16",
    price: "$144.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 16.",
    categoryId: 2,
  },
  {
    id: 17,
    name: "Product 17",
    price: "$154.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 17.",
    categoryId: 3,
  },
  {
    id: 18,
    name: "Product 18",
    price: "$164.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 18.",
    categoryId: 4,
  },
  {
    id: 19,
    name: "Product 19",
    price: "$174.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 19.",
    categoryId: 1,
  },
  {
    id: 20,
    name: "Product 20",
    price: "$184.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 20.",
    categoryId: 2,
  },
  {
    id: 21,
    name: "Product 21",
    price: "$194.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 21.",
    categoryId: 3,
  },
  {
    id: 22,
    name: "Product 22",
    price: "$204.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 22.",
    categoryId: 4,
  },
  {
    id: 23,
    name: "Product 23",
    price: "$214.99",
    image: "https://via.placeholder.com/150",
    description: "A short description of Product 23.",
    categoryId: 1,
  },
];

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
      <div className="flex justify-center mb-8 gap-4 flex-wrap">
        <button
          className={`px-4 py-2 rounded ${selectedCategory === null ? "bg-blue-600 text-white" : "bg-white border"}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded ${selectedCategory === cat.id ? "bg-blue-600 text-white" : "bg-white border"}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <span className="text-blue-600 font-bold mb-4">{product.price}</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;