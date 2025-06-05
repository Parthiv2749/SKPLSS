import Navbar from "../../UI/Navbar/Navbar"
import Footer from "../../UI/Footer/Footer";
import Banner from "./Banner";
import Events from "./Events";
import Partners from "./Partners";
function HomePage(){

    return(
        <>
            <Navbar/>
            <Banner/>
            <Events/>
            <Partners/>
            <Footer/>
        </>
    );
}

export default HomePage;