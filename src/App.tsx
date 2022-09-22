import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="bg-slate-100">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
