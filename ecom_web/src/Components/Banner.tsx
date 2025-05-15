
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
            <div className=" w-full h-full">
             
                    
                            <div className=" relative px-6">
                                <div key={products.id} className="relative flex w-full justify-between h-[400px]">
                                    <div className="text-black ">
                                        <h2 className="text-7xl w-3/5 font-bold">{products.title}</h2>
                                        <p className="mt-2">{products.subTitle}</p>
                                        <button className="mt-4 bg-black text-white px-4 py-2 rounded">Shop Now</button>
                                    </div>
                                    <div className=" h-full">
                                        <img src={products.image} alt={products.title} className="w-full h-full " />
                                    </div>
                                </div>
                              
                                </div>
                       
            
            </div>
        </div>
    );
};

export default Banner;