var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var robot = require('robotjs');


var id

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signage"
});

con.connect(function(err) {
  if (err) throw err;
});


con.query("SELECT * FROM signurl", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/controller', (req, res) => {
  res.sendFile(__dirname + '/controller.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

var elem = document.body; // Make the body go full screen.
requestFullScreen(elem);