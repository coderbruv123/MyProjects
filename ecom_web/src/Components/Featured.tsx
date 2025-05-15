import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ShoppingCart } from "lucide-react";

const Featured = () => {
  const Products = [
    {
      id: 1,
      title: "iPhone 15 Pro",
      price: 1200,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Samsung Galaxy S24",
      price: 1100,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Google Pixel 8",
      price: 900,
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      title: "OnePlus 12",
      price: 950,
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      title: "Sony Xperia 5",
      price: 850,
      image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      title: "Motorola Edge",
      price: 700,
      image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
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
        <Slider {...settings}>
          {Products.map((product) => (
            <div key={product.id} className="p-4">
              <div className="bg-white h-[420px] w-full rounded-xl shadow flex flex-col items-center hover:shadow-lg transition">
                <div className="h-56 w-full rounded-t-xl bg-indigo-100 flex justify-center items-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-44 w-44 object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-2 p-4">
                  <p className="text-xl font-semibold text-blue-800">{product.title}</p>
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
      </div>
    </div>
  );
};

export default Featured;