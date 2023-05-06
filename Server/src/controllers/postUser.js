const { User } = require("../DB_connection");

const postUser = async (req, res) => {
    const { email, password, id} = req.body;
    console.log(":::::::::::::::::", id, email, password);

  //   try {
  //     if (!password || !email) {
  //       res.status(400).send('Faltan datos');
  //     }
  //     const user = await User.create({ id, email, password });
  //     res.status(200).json(user);
  //   } catch (error) {
  //       res.status(500).send(error.message);
  //   }
  // }


    if (!email || !password) {
        return res.status(400).send('Faltan datos')
    }
    try {
        const [userCreate, bool] = await User.findOrCreate({
          where: { email },
          defaults: {
            email,
            password,
          },
        });
        return bool
          ? res.status(200).json(userCreate)
          : res.status(400).json('Ese usuario ya existe');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    postUser
}