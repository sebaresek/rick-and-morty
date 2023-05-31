const server = require("./app")
const port = process.env.PORT ||3001;
const { conn } = require("./DB_connection")

conn.sync({ alter: true }).then(() => {
    server.listen(port, () => {
      console.log("Server raised in port: " + port);
    });
}).catch((error) => {
    console.log(error.message);
})

module.exports = server;