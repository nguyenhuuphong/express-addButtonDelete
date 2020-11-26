// server.js
// where your node app starts
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set("views", "./views");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
// database
db.defaults({ todos: [] })
  .write()
//
app.get('/', (req, res) => {
  res.render('home');
});

app.get("/todos", (req, res) => {
  res.render( "index", {
    todo: db.get('todos').value()
});
});  

app.get("/todos/create",(req, res) => {
	res.render("create");
});
app.post("/todos/create", (req, res) => {
    db.get('todos').push(req.body).write();
    res.redirect("/todos");
  
});
app

