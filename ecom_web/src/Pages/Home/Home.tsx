import Banner from "../../Components/Banner"
import Categories from "../../Components/Categories"
import Featured from "../../Components/Featured"

const Home = ()=>{

    return(
        <div>

       <div className="w-full min-h-[700px] bg-[#f0f2f3] flex items-center ">
        <Banner/>

       </div>
       <Featured/>
       <Categories/>
       
        </div>
    )
}
export default Home