import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Shop from "@/components/Shop";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import { ProductContextProvider } from "@/components/ProductContext";

export default function Home() {
  return (
    <>
      <Header />
      <Shop />
      <Newsletter />
    </>
  );
}
