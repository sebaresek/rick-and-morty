import style from './App.module.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from "./components/Form/Form";
import Favorites from "./components/Favorites/Favorites";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import fondo from './assets/img/fondo1.jpg'


const URL_BASE = 'http://localhost:3001/rickandmorty/character';
// const API_KEY = '04dc260ec2a9.6bb0446d158e45c86b33';
// ?key=${API_KEY}

const email = 'seba@gmail.com';
const password = '123asd';

function App() {
   const location = useLocation();
   const navigate = useNavigate();
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const login = (userData) => {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login';
      axios(URL + `?email=${email}&password=${password}`)
      .then(({ data }) => {
         const { access } = data;
         setAccess(access);
         access && navigate('/home');
      });
   }

   useEffect(() => {
      !access && navigate('/')
   }, [access]);

   const onSearch = (id) => {
      // Verifica si el personaje ya fue buscado
      // Realiza la búsqueda del personaje por ID
      axios
      .get(`${URL_BASE}/${id}`)
      .then(({ data }) => {
         const exist = characters.find((character) => character.id === data.id);
         if (data.error) {
            alert("No se encontró un personaje con ese ID 🙁");
            return;
         }if (exist) {
            alert("Ya has buscado este personaje 😅");
            return;
         } // Actualiza el estado con el nuevo personaje encontrado
         setCharacters((oldChars) => [...oldChars, data]);
      })
      .catch((error) => {
         console.error(error);
         alert("Hubo un error al buscar el personaje 😞");
      });
   };
    

   const onClose = (id) => {
      console.log(id)
      setCharacters(characters.filter(character => character.id !== id))};

   return (
      <div className='App'>
         {location.pathname === '/' ? <Form login={login}/> : <Nav onSearch={onSearch} setAccess={setAccess}/>}


         <Routes>
            <Route path='/home' element={ <Cards characters={characters} onClose={onClose}/> }/>
            <Route path='/about' element={<About/>} />
            <Route path='/detail/:id' element={<Detail/>} />
            <Route path='/favorites' element={<Favorites/>} />
         </Routes> 
        
      </div>
   );
   
}

export default App;
