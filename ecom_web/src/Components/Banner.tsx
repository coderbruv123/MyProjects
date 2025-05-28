const Banner = () => {
    const products = {
        id: 1,
        title: "Best Type of Products available on the internet",
        subTitle: "Upgrade your space today",
        image: "https://media.istockphoto.com/id/1168952666/photo/retro-vintage-wooden-chair-isolated-on-white-including-clipping-path.jpg?s=612x612&w=0&k=20&c=DgbWcMoVMczq814LCSXAjVGoxzRyIl9BY4jcEpTmb4w="
    };

    return (
        <div className="w-full bg-gradient-to-r from-indigo-100 via-white to-pink-100 py-1">
            <div className="container mx-auto px-4">
                <div
                    key={products.id}
                    className="relative flex flex-col md:flex-row items-center justify-between bg-white rounded-3xl shadow-2xl p-8 md:p-12 gap-8"
                >
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight drop-shadow">
                            {products.title}
                        </h2>
                        <p className="text-lg md:text-2xl text-gray-600 mb-6">{products.subTitle}</p>
                        <button className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition duration-200">
                            Shop Now
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <img
                            src={products.image}
                            alt={products.title}
                            className="w-72 h-72 md:w-96 md:h-96 object-contain rounded-2xl shadow-lg border border-gray-200 bg-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;