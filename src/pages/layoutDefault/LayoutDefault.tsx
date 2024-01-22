import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Home from "../home/Home";
import Gallery from "../gallery/Gallery";
import Posts from "../posts/Posts";

function LayoutDefault() {
  return (
    <>
     <BrowserRouter>
      <Header />
      <NavBar />      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default LayoutDefault;
