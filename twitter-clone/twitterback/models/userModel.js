
const bcrypt = require("bcrypt");
const staltRound = 10;

const register = (res, user) => {
        connection.query('SELECT * FROM `users` WHERE `email` = "' + user.email + '"',  function (error, results, fields) {
            connection.query('SELECT * FROM `users` WHERE `name` = "' + user.handle + '"',  function (error2, results2, fields2) {

            if(!error && results.length === 0 && !error2 && results2.length === 0){
            /* Encrypt Password */
                bcrypt.hash(user.password, staltRound, function(err, hash) {
                if(!err){
                    /* Create User */
                    connection.query("INSERT INTO `users` (`name`,`email`,`password`,`role_id`) VALUES ('"+ user.handle +"','"+user.email+"','"+hash+"',2)" ,  function (error, results, fields) {
                    delete user.password
                    res.json({ ok:true, data:user})
                    });
                }
                });
            }else{
                    res.json({ ok:false, msg: 'User or Handle Already Exists.'})
            }
            });
        });
};
const login = (res, user) => {
    /* Check if user passwords match */
      connection.query('SELECT * FROM `users` WHERE `email` = "' + user.email + '"',  function (error, results, fields) {
          bcrypt.compare(user.password, results[0].password, function(err, result) {
            if(!err && result){
              delete user.password
              user.handle = results[0].name

              res.json({ ok: true, "msg": "Logged" , user:user});
            }else{
              res.json({ ok: false, "msg": "Cannot be logged in" });
            }
          });
      });
};

module.exports = {
    register,
    login
};



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
