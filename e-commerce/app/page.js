import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/components/Hero";
import './page.css'
import TitleText from "@/components/TitleText";
import Collection from "./collection/page";
import Product from "@/components/Product";
import { products } from "./assets/frontend_assets/assets";
import OurServices from "@/components/OurServices";
import Footer from "@/components/Footer";

export default function Home() {




  return (
    <>



      <div className="heroSection">
        <Hero />
      </div>
      <div className="LatestCollection">
        <TitleText text1={'Latest'} text2={'Collection'} />
        <div className="ProductsGrid">
          {products.slice(0, 10).map((item) => (
            <Product
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image[0]}
            />
          ))}
        </div>
      </div>

      <div className="BestSeller">
        <TitleText text1={'Best'} text2={'Seller'} />

        <div className="ProductsGrid">
          {products
            
            .filter(item => item.bestseller)   // only keep bestseller items
            .map((item) => (
              <Product
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image[0]}
              />
            ))}
        </div>
      </div>

      <div className="OurPolicy">
        <TitleText text1={'Our'} text2={'Policy'} />
        <OurServices/>
      </div>

      

    </>
  );
}
