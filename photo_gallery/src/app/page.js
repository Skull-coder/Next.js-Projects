import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Introduction from "./components/intoduction/Introduction";
import Information from "./components/Information/Information";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <>

      <div className="w-full h-[calc(100vh+72px)] flex flex-col justify-center gap-15">

      <div className="border-b border-b-gray-400 fixed top-0 w-full backdrop-blur-md">
        <Navbar/>
      </div>


      <div>
        <Hero/>
      </div>

      <div className="bg-[rgb(106_114_127)] py-10">
        <Introduction/>
      </div>

      

      </div>

      <div>
        <Information/>
      </div>

      <div>
        <Footer/>
      </div>
    
    </>
  );
}
