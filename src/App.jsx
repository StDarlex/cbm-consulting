import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Consulting from "./components/Consulting";
import ThePlace from "./components/ThePlace";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Hero />
        <Consulting />
        <ThePlace />
      </main>

      <Footer />
    </div>
  );
}

export default App;