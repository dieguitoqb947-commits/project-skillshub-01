import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Explorar from './pages/Explorar/Explorar';
import { CurrentUserProvider } from './context/CurrentUserContext';
import Ofertas from './pages/Ofertas/Ofertas';



function App() {
  return (
    <CurrentUserProvider>
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/ofertas" element={<Ofertas />} />
        </Routes>
      </main>
        <Footer />
      </Router>
    </CurrentUserProvider>
  );
}

export default App;
