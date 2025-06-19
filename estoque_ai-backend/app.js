const express = require('express');
const cors = require('cors');



const app = express();
const port = 3001;


app.use(cors())


app.get("/", (_req, res) => {
  return res.json({ message: "Hello World from the API" });
});


app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
