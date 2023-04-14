import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./temaConfig";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Carrousel from "./components/Carrousel";



function App() {
  return (
    <ThemeProvider theme ={theme}>
      <Navbar/>
      <Carrousel/>
      <Footer/>
    </ThemeProvider>
         
  );
}

export default App;
