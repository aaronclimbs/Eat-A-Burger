const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000

const routes = require("./controllers/burger_controller")

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.set("view engine", "ejs")

app.use(routes)

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}!`);
});
