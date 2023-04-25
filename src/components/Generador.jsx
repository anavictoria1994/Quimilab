

import Footer from "./Footer";
import { ThemeProvider } from "styled-components";
import theme from "../temaConfig";


export function Generador(){
   
    
    return (
        <ThemeProvider theme ={theme}>
        <Footer/>
        </ThemeProvider>
    )
}