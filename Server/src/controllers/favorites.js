require("dotenv").config(); // process.env
const { User, Favorite } = require("../DB_connection");



const postFav = async(req, res) => {

  const{id, name, status, species, gender, origin, image, location} = req.body

  try {    
  if(!id || !name || !image)  res.status(401).json({ message: "Faltan datos" });

  const character = {id,
     name, 
     status, 
     species, 
     gender, 
     origin, 
     image, 
     location
    };
    
    const userIdObj = await User.findOne({
      where: { /* criterio de búsqueda */ },
      attributes: ['id'] // Solo recuperamos el atributo 'id'
    });
    
    const userId = userIdObj.id;
    
    

  const char = await Favorite.create(character)

//*******************************************/
  const user = await User.findByPk(userId);
  if (user) {
    await user.addFavorite(char);
  }
  

  const favorites = await Favorite.findAll()

  return res.status(200).json(favorites)

  } catch (error) {
      return res.status(404).send(error.message)
  }

}

const deleteFav = async(req, res) => {

  const {id} = req.params
  try {
      if(!id) return res.status(400).json({message: 'id es not found'})

      const char = await Favorite.findByPk(id)
      if(char) await Favorite.destroy({ where: {id} })

      const favorites = await Favorite.findAll()
      res.status(200).json(favorites)
  } catch (error) {
      
  }
}


module.exports = {
  postFav,
  deleteFav,
};
