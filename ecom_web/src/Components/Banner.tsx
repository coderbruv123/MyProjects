import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MoveLeft, MoveRight } from "lucide-react";

const Banner = () => {

    const products = [
        {
            id: 1,
            title: "Modern Living Room Essentials",
            subTitle: "Upgrade your space today",
            image: "https://media.istockphoto.com/id/1168952666/photo/retro-vintage-wooden-chair-isolated-on-white-including-clipping-path.jpg?s=612x612&w=0&k=20&c=DgbWcMoVMczq814LCSXAjVGoxzRyIl9BY4jcEpTmb4w="
        },
        {
            id: 2,
            title: "Elegant Bedroom Furniture",
            subTitle: "Sleep in style and comfort",
            image: "https://media.istockphoto.com/id/1168952666/photo/retro-vintage-wooden-chair-isolated-on-white-including-clipping-path.jpg?s=612x612&w=0&k=20&c=DgbWcMoVMczq814LCSXAjVGoxzRyIl9BY4jcEpTmb4w="
        },
        {
            id: 3,
            title: "Office Chairs & Desks",
            subTitle: "Work smarter, not harder",
            image: "https://media.istockphoto.com/id/1168952666/photo/retro-vintage-wooden-chair-isolated-on-white-including-clipping-path.jpg?s=612x612&w=0&k=20&c=DgbWcMoVMczq814LCSXAjVGoxzRyIl9BY4jcEpTmb4w="
        },
        {
            id: 4,
            title: "Outdoor Patio Collection",
            subTitle: "Relax under the open sky",
            image: "https://media.istockphoto.com/id/1168952666/photo/retro-vintage-wooden-chair-isolated-on-white-including-clipping-path.jpg?s=612x612&w=0&k=20&c=DgbWcMoVMczq814LCSXAjVGoxzRyIl9BY4jcEpTmb4w="
        },
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="lg:container">
            <div className="slider-container slider_container w-full h-full">
                <Slider {...settings}>
                    {
                        products?.map((product) => (
                            <div key={product?.id} className="banner_slide_item">

                                <div className="banner_text">
                                    <p className="text-sm font-inter text-[#272343] uppercase font-normal">{product?.subTitle}</p>
                                    <h3 className="text-6xl text-[#272343] font-inter capitalize leading-16 max-w-[631px] w-full font-bold mb-5">{product?.title}</h3>
                                    <button className="max-w-[171px] w-full flex items-center justify-center gap-2 h-[52px] bg-[#029fae] rounded-lg capitalize text-white cursor-pointer">shop now <MoveRight /></button>
                                </div>


                                <div className="banner_image  w-full h-full flex items-center justify-end">
                                    <img src={product?.image} alt={product?.title} />
                                </div>

                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
};

export default Banner;