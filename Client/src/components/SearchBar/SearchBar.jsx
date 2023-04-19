import style from "./SearchBar.module.css";
import { useState } from 'react';

function SearchBar({ onSearch }) {
   const [character, setCharacter] = useState('');

   const handleChange = (event) => {
      setCharacter(event.target.value)
   }

   const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        onSearch(character);
      }
    };

   return (
      <div className={style.container}>
         <input className={style.search} type='search' placeholder="  Ponga un 'ID' " onKeyPress={handleKeyPress} onChange={handleChange} value={character} />
         <button onClick={() =>{onSearch(character); setCharacter('')}}> Buscar </button>
      </div>
   );
}
export default SearchBar;