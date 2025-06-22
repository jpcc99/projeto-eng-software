const express = require('express');



const app = express();
require("dotenv").config()
const PORT = process.env.PORT;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (_req, res) => {
  res.json({ 'message': 'Hello World' });
});

const UserController = require('./controllers/userController').UserController;

app.get("/users", (req, res) => UserController.getAllUsers(req, res));


app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
})
