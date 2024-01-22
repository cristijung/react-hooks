import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Home from "../home/Home";
import Gallery from "../gallery/Gallery";
import Posts from "../posts/Posts";
import Clock from "../clock/Clock";
import Counter from "../counter/Counter";

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
          <Route path="/clock" element={<Clock timeZone="America/Sao_paulo"/>} />
          <Route path="/counter" element={<Counter initialCount={0} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default LayoutDefault;
