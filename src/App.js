// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Asegúrate de usar Routes en lugar de Switch
import FormularioPadre from "./components/FormularioPadre"; // Ajusta la ruta según sea necesario
import Footer from "./components/Footer"; // Ajusta la ruta según sea necesario
import Header from "./components/Header";
import About from "./components/About"; // Asegúrate de que el archivo About.js exista

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Barra de navegación */}
        <nav>
          <Header />
        </nav>
        {/* Contenido principal */}
        <main className="App flex-grow">
          <Routes>
            <Route path="/" element={<FormularioPadre />} /> {/* Página principal */}
            <Route path="/about" element={<About />} /> {/* Página "Acerca de" */}
          </Routes>
        </main>
        {/* Footer */}
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
};

export default App;
