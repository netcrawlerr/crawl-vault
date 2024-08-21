import "./App.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <div className=" font-amsterdam bg-stone-900 min-h-screen p-5 sm:p-10">
      <NavBar />

      <Hero />

      <About />

      <Footer />
    </div>
  );
}

export default App;
