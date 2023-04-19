import style from "./Card.module.css";
import { Link, useLocation } from 'react-router-dom';
import { addFav, removeFav } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";


export default function Card({ id, name, species, gender, image, onClose }) {

   const audioRef = useRef(null);
   function handleMouseEnter() {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
   }

   const myFavorites = useSelector(state => state.myFavorites);
   const dispatch = useDispatch();
   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if (isFav) {
         setIsFav(false);
         dispatch(removeFav(id));
      }
      else {
         setIsFav(true);
         dispatch(addFav({ id, name, species, gender, image, onClose, }))
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   const { pathname } = useLocation();

   return (
      <div className={style.card} onMouseEnter={handleMouseEnter}>
         <div className={style.front} >
            <img src={image} alt={name} />
         </div>
         <div className={style.back} >
            <div>
               <Link to={`/detail/${id}`} className={style.link}>
                  <h2 className={style.name}>{name}</h2>
               </Link>
            </div>
            <div className={style.species} >
               <h2>Specie: {species}</h2>
               <h2>Gender: {gender}</h2>
            </div>
            <div className={style.btn}>
            {pathname !== '/favorites' && (
               <button onClick={() => onClose(id)}>X</button>
               )}
               <button onClick={handleFavorite}>
                     {isFav ? '❤️' : '🤍'}
               </button>
               
            </div>
            <audio ref={audioRef}>
               {/* <source src={process.env.PUBLIC_URL + '/desplegable.mp3'} type="audio/mpeg" /> */}
            </audio>
         </div>
      </div>
   );
};
