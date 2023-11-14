const express = require("express");
const bcrypt = require("bcrypt");
const cors = require('cors');

const staltRound = 10;
const app = express();
const port = 3000;


app.use(express.json());

app.use(cors());


app.use(
  express.urlencoded({
    extended: true,
  })
);

/* TWEETS */
// app.get("/tweets/", (req, res) => {
//   connection.query('SELECT * FROM `tweets` ',  function (error, results, fields) {
//     if(!error){
//       res.json({ message: "ok", data:results });
//     }else{
//       res.json({ message: "ok", error });
//     }
//   });
// });

app.get("/tweets/:user", (req, res) => {
  let user = req.params.user
  connection.query('SELECT * FROM `tweets` WHERE `user_id` = ' + user,  function (error, results, fields) {
    if(!error){
      res.json({ message: "ok", data:results });
    }else{
      res.json({ message: "ok", error });
    }
  });
});

// app.get("/tweets/followed", (req, res) => {
//   let todo = req.params.todo
//   connection.query('SELECT * FROM `tweets` WHERE ID = ' + todo,  function (error, results, fields) {
//     res.json({ message: "ok", data:results });
//   });
// });

app.post("/tweets/", (req, res) => {
  let tweet = req.body
  connection.query('' ,  function (error, results, fields) {
    res.json({ message: "ok", data:results, error });
  });
});


/* USERS */


app.post("/users/register", (req, res) => {
  let user = req.body
  let password = req.body.password
  console.log(user)
  /* Check if user does not already exists */
    connection.query('SELECT * FROM `users` WHERE `email` = "' + user.email + '"',  function (error, results, fields) {
      if(!error && results.length === 0){
        /* Encrypt Password */
          bcrypt.hash(password, staltRound, function(err, hash) {
            if(!err){
              /* Create User */
              connection.query("INSERT INTO `users` (`name`,`email`,`password`,`role_id`) VALUES ('"+ user.name +"','"+user.email+"','"+hash+"',2)" ,  function (error, results, fields) {
                res.json({ ok:true, data:results });
              });
            }
          });
        }
      else{
        res.json({ ok:false, "msg": "User Already Exists." });
      }
    });
});

app.post("/users/login", (req, res) => {
  let user = req.body
  /* Check if user passwords match */
    connection.query('SELECT * FROM `users` WHERE `email` = "' + user.email + '"',  function (error, results, fields) {
        bcrypt.compare(user.password, results[0].password, function(err, result) {
          if(!err && result){
            delete results[0].password
            res.json({ ok: true, "msg": "Logged" , user:results[0]});
          }else{
            res.json({ ok: false, "msg": "Cannot be logged in" });
          }
        });
    });
});

// app.put("/todos/:todo", (req, res) => {
//   let todo = req.params.todo
//   let body = req.body
//   console.log(todo, body)
//   connection.query('UPDATE `todo` SET `NAME`="'+ body.name +'",`DESCRIPTION`="'+ body.description +'",`EDITED_AT`= CURDATE(),`STATUS`="'+ body.status +'" WHERE  ID = ' + todo ,  function (error, results, fields) {
//     res.json({ message: "ok", data:results, error });
//   });
// });

// app.delete("/todos/:todo", (req, res) => {
//   let todo = req.params.todo
//   connection.query('DELETE FROM `todo` WHERE ID = ' + todo ,  function (error, results, fields) {
//     res.json({ message: "ok", data:results, error });
//   });
// });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


/* SQL */


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'twitter'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

