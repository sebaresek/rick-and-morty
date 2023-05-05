const express = require("express");
const server = express();
const logger = require("morgan");

const routes = require("./routes/index");

server.use(express.json());

const urlencoded = express.urlencoded({ extended: false });
// form -> data

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //Autorizo recibir solicitudes de este dominio
  res.header("Access-Control-Allow-Credentials", true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); //Autorizo recibir solicitudes con dichos hedears
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
  next();
});

server.use(logger("dev"));


server.use("/rickandmorty", routes);

server.get("/",(req,res)=>{
    res.status(200).json({message: "in first server in EXPRESS", app: "SebaResek"})
})

module.exports = server;
