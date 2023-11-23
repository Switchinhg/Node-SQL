

const getAll = (res) => {
      connection.query('SELECT u.name, t.tweet_text, t.date_created  FROM `tweets` t JOIN `users` u on u.id = t.user_id ORDER BY t.id DESC' ,  function (error, results, fields) {
      if(!error){
        res.json({ ok: true , tweets:results});
      }else{
        res.json({  ok:false, error});
      }
    });
};
const newTweet = (res, user) => {
      connection.query('SELECT * FROM  `users` WHERE name = "' + user.user +'"',  function (error, results, fields) {
        connection.query('INSERT INTO `tweets`(`user_id`, `tweet_text`, `date_created`) VALUES ("'+results[0].id+'", "'+user.text+'", CURDATE())',  function (error, results, fields) {
          if(!error){
            res.json({ok:true})
          }else{
            res.json({ok:false,error})
            
          }
        });
    });
};

module.exports = {
  getAll,
  newTweet
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
