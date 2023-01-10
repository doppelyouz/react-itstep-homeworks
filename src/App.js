import React from "react";
import './styles/index.css';

import Header from "./components/header/Header";
import Block from "./components/block/Block";
import Footer from "./components/footer/Footer";

function App() {
  return (
  <>
    <div class="App">
      <Header />
      <Block />
      <Footer />
    </div>
  </>
  );
}

export default App;
