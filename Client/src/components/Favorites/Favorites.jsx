import Card from "../Card/Card";
import { connect, useDispatch } from 'react-redux';
import { filterCards, orderCards } from "../../redux/actions";
import { useState } from 'react';
import styled from './Favorites.module.css'


const Favorites = ({ myFavorites }) => {
    
    const dispatch = useDispatch()
    const [aux, setAux] = useState(false)

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
        setAux(true)
    }

    const handleFilter = (event) => {
        dispatch(filterCards(event.target.value))
    }
    
    return (
        <div >
            <div className={styled.filter}>
                <select onChange={handleOrder} name="Order" id="" class={styled.select}>
                <option value="A">Ascendente</option>
                <option value="D">Descendente</option> </select>

                <select onChange={handleFilter} name="Gender" id="" class={styled.select}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknow">Unknow</option>
                <option value="allCharacters">All Characters</option>
                </select>
            </div>

            <div className={styled.container}>
                <div className={styled.a}>
                    {
                        myFavorites?.map(fav => {
                            return(
                                <Card
                                        key={fav.id}
                                        id={fav.id}
                                        name={fav.name}
                                        species={fav.species}
                                        gender={fav.gender}
                                        image={fav.image}
                                    />
                            )
                        })
                    }
                </div>
             </div>
            
        </div>
    
    )
}
    
    const mapStateToProps = (state) => {
        return {
            myFavorites: state.myFavorites
        }
    }
    
    export default connect(
        mapStateToProps,
        null
    )(Favorites)