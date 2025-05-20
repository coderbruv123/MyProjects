import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../types/Product";
import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

const Featured = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl text-black font-bold text-center mb-8">
        Featured Products
      </h1>
      <div className="w-full max-w-7xl px-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="p-4">
                <div className="bg-white h-[420px] w-full rounded-xl shadow flex flex-col items-center hover:shadow-lg transition">
                  <div className="h-56 w-full rounded-t-xl bg-indigo-100 flex justify-center items-center">
                    <img
                      src=""
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
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Featured;