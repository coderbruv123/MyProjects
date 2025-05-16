const Banner = () => {

    const products = 
        {
            id: 1,
            title: "Best Type of Products available on the internet",
            subTitle: "Upgrade your space today",
            image: "https://media.istockphoto.com/id/1168952666/photo/retro-vintage-wooden-chair-isolated-on-white-including-clipping-path.jpg?s=612x612&w=0&k=20&c=DgbWcMoVMczq814LCSXAjVGoxzRyIl9BY4jcEpTmb4w="
        };
      
    

  
    return (
        <div className="lg:container">
            <div className="w-full h-full">
                <div className="px-6">
                    <div
                        key={products.id}
                        className="relative flex flex-wrap gap-10 justify-center w-full min-h-[400px] bg-gray-100 items-stretch"
                    >
                        <div className="text-black w-full md:w-3/5  justify-center">
                            <h2 className="text-4xl md:text-7xl font-bold">{products.title}</h2>
                            <p className="mt-2">{products.subTitle}</p>
                            <button className="mt-4 bg-black text-white px-4 py-2 rounded">Shop Now</button>
                        </div>
                        <div className="w-full md:w-auto h-full flex items-center justify-center">
                            <img
                                src={products.image}
                                alt={products.title}
                                className="w-full h-full object-contain max-h-[400px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;