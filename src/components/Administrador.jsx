import React from "react";
import Footer from "./Footer";
import { ThemeProvider } from "styled-components";
import theme from "../temaConfig";


export function Administrador(){
    return (
        <ThemeProvider theme ={theme}>
        <Footer/>
        </ThemeProvider>
    )
}

