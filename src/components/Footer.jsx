import React from "react";
import logounivalle from "../assets/img/logoUV.jpg";
import correo from "../assets/img/correo.png";
import telefono from "../assets/img/telefono.png";
import ubicacion from "../assets/img/edificio.png";

const Footer = () =>{
    return(
        <footer>
        <div class="container--body">
          <div class ="colum1">
            <img src = {logounivalle} alt="Imagen UV" class="img"/>
          </div>
          <div class ="colum2">
              <h1> Universidad del Valle</h1>
              <h2> Santiago de Cali, Valle del Cauca, Colombia</h2>
              <h2> Ciudad Universitaria Melendez</h2>
              <h2> Calle 13 # 100 - 00</h2>

          </div>
          <div class ="colum3">
              <h1> Servicios Varios y Gestión Ambiental</h1>
              <div class="row">
                <img src = {correo} alt="Imagen correo" class="correo"/>
                <label>servicios.varios@correounivalle.edu.co</label>
              </div>
              <div class="row">
                <img src = {telefono} alt="Imagen UV" class="telefono"/>
                <label>+57 602 3212100 - Ext. 2237</label>
              </div>
              <div class="row">
                <img src = {ubicacion} alt="Imagen UV" class="ubicacion"/>
                <label>Edificio E1, espacio 2057</label>
              </div>
          </div>
        </div>
      </footer>
      
    )
}


export default Footer

