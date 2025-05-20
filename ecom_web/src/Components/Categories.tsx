import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import type { Category } from "../types/Category";


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

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      getCategories()
        .then(setCategories)
        .finally(() => {
          setLoading(false);
        });
    }, []);
  return (
    <div className="w-full bg-white flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl text-black font-bold text-center mb-8">
        Shop by Category
      </h1>
      <div className="w-full max-w-7xl px-4">
        {categories.length >5 ? (
          <Slider {...settings}>
            {categories.map((cat) => (
              <div key={cat.id} className="p-4">
                <div className="bg-white h-[320px] w-full rounded-xl shadow flex flex-col items-center hover:shadow-lg transition">
                  <div className="h-40 w-full rounded-t-xl bg-indigo-100 flex justify-center items-center">
                    <img
                      src=""
                      alt={cat.name}
                      className="h-32 w-32 object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2 p-4">
                    <p className="text-xl font-semibold text-blue-800">{cat.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4">
                <div className="bg-white h-[320px] w-full rounded-xl shadow flex flex-col items-center hover:shadow-lg transition">
                  <div className="h-40 w-full rounded-t-xl bg-indigo-100 flex justify-center items-center">
                    <img
                      src=""
                      alt={cat.name}
                      className="h-32 w-32 object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2 p-4">
                    <p className="text-xl font-semibold text-blue-800">{cat.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;