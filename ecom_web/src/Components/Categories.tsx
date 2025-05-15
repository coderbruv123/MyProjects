import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const categories = [
  {
    id: 1,
    name: "Smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Headphones",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Cameras",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Wearables",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    name: "Accessories",
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
                      src={cat.image}
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
                      src={cat.image}
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