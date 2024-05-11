import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/layout/Header';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';

import ContactoPage from './components/pages/ContactoPage';
import HomePage from './components/pages/HomePage';
import PublicacionesPage from './components/pages/PublicacionesPage';
import NovedadesPage from './components/pages/NovedadesPage';

function App() {
  return (
    <div className='App'>
      <Header />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="publicaciones" element={<PublicacionesPage />} />
          <Route path="novedades" element={<NovedadesPage />} />
          < Route path="contacto" element={<ContactoPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
