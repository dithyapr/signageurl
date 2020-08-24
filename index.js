var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var robot = require('robotjs');
var opn = require('opn');


var playnum;

var id;

var signnum;

var fullscreen = false;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signage"
});

con.connect(function(err) {
  if (err) throw err;

  con.query("SELECT * FROM signurl", function (err, result, fields) {
      if (err) throw err;
      // console.log(result);

      // for( var i = 0; i< result.length; i++)
      // {
      //   var row = result[i];
      //   console.log(row);
      // }

       var string=JSON.stringify(result);
        // console.log(string);
        signnum =  JSON.parse(string);
       // to get one value here is the option
        // console.log(signnum[1].url1);
        });
});



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // robot.keyTap("f11");
});

app.get('/1', (req, res) => {
  id = 0;
  res.sendFile(__dirname + '/index.html');
  
  // robot.keyTap("f11");
});

app.get('/2', (req, res) => {
  id = 1;
  
});

app.get('/3', (req, res) => {
  id = 2;
  
});

app.get('/4', (req, res) => {
  id = 3;
  
});

app.get('/5', (req, res) => {
  id = 4;
  
});

app.get('/6', (req, res) => {
  id = 5;
  
});

app.get('/7', (req, res) => {
  id = 6;
  
});

app.get('/8', (req, res) => {
  id = 7;
  
});

app.get('/9', (req, res) => {
  id = 8;
  
});

app.get('/10', (req, res) => {
  id = 9;
  
});

app.get('/controller', (req, res) => {
  res.sendFile(__dirname + '/controller.html');
  // robot.keyTap("f11");
});

var search = false;

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(msg);
    playnum = msg;
    // search = true;

    // if(search == true)
    // {
       switch(playnum)
        {
          case "1":
          console.log("Play 1");

            
              opn(signnum[id].url);
              // robot.keyTap("f11");
            
          break;

          case "2":
          console.log("Play 2");
            opn(signnum[id].url1);

          break;

          case "3":
          console.log("Play 3");
            opn(signnum[id].url2);
          break;

          case "4":
          console.log("Play 4");
            opn(signnum[id].url3);
          break;
        }
    // }

    // search = false;
   
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});



