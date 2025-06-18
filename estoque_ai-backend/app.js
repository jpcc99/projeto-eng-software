const express = require('express');
const cors = require('cors');



const app = express();
const port = 5000;


app.use(cors())


app.get("/", (req, res) => {
    return res.json({message: "API is working"});
});     


app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});