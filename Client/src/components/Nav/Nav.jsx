import SearchBar from '../SearchBar/SearchBar';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css';
import React from 'react';



const Nav = ({ onSearch, setAccess }) => {
    const handleLogOut = () => {
        setAccess(false);
    }

    return (
        <nav className={style.nav}>

            <SearchBar onSearch={onSearch}/>
            
            <button className={style.butttonFavorites}>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/favorites'> FAVORITES </NavLink>
            </button>


            <button className={style.butttonHome}>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/home' >HOME</NavLink>
            </button>

            <button className={style.butttonAbout}>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/about' >ABOUT</NavLink>
            </button>

            <nav>
                <button className={style.buttonLog} onClick={handleLogOut}>LOG OUT</button>
            </nav>
            
        </nav>
    )
}

export default Nav;