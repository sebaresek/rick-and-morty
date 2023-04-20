import SearchBar from '../SearchBar/SearchBar';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css';
import React from 'react';
import github from '../../assets/img/github.png';

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

            <a  href="https://github.com/sebaresek/rick-and-morty.git" target="_blank">
                <img src={ github } className={style.buttonGithub} alt="GitHub" width="40" height="40"/>
            </a>
        </nav>
    )
}

export default Nav;


// https://github.com/sebaresek/rick-and-morty.git