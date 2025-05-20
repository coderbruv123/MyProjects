import { useEffect, useState } from "react";
import ProductList from "../../Components/Products/ProductList";
import type { Category } from "../../types/Category";
import { getCategories } from "../../api/categoryApi";

const Product = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
      <div className="flex justify-center mb-8 gap-4 flex-wrap">
        <button
          className={`px-4 py-2 rounded ${selectedCategory === null ? "bg-blue-600 text-white" : "bg-white text-blue-500 border"}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded ${selectedCategory === cat.id ? "bg-blue-600 text-white" :  " text-blue-500 bg-white border"}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <ProductList  selectedCategory={selectedCategory} />
    </div>
  );
};

export default Product;