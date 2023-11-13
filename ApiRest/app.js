const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/todos/", (req, res) => {
  connection.query('SELECT * FROM `todo` ',  function (error, results, fields) {
    res.json({ message: "ok", data:results });
  });
});

app.get("/todos/:todo", (req, res) => {
  let todo = req.params.todo
  connection.query('SELECT * FROM `todo` WHERE ID = ' + todo,  function (error, results, fields) {
    res.json({ message: "ok", data:results });
  });
});

app.post("/todos/", (req, res) => {
  let todo = req.body
  console.log(todo)
console.log(todo.name)
  connection.query('INSERT INTO `todo`(`NAME`, `DESCRIPTION`, `CREATED_AT`, `EDITED_AT`, `STATUS`) VALUES ("'+ todo.name +'","'+ todo.description +'",CURDATE(),CURDATE(),"'+todo.status+'")' ,  function (error, results, fields) {
    res.json({ message: "ok", data:results, error });
  });
});

app.put("/todos/:todo", (req, res) => {
  let todo = req.params.todo
  let body = req.body
  console.log(todo, body)
  connection.query('UPDATE `todo` SET `NAME`="'+ body.name +'",`DESCRIPTION`="'+ body.description +'",`EDITED_AT`= CURDATE(),`STATUS`="'+ body.status +'" WHERE  ID = ' + todo ,  function (error, results, fields) {
    res.json({ message: "ok", data:results, error });
  });
});

app.delete("/todos/:todo", (req, res) => {
  let todo = req.params.todo
  connection.query('DELETE FROM `todo` WHERE ID = ' + todo ,  function (error, results, fields) {
    res.json({ message: "ok", data:results, error });
  });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


/* SQL */


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'planning'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

