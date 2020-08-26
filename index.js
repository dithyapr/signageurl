var express = require('express')
var path = require('path');
var app = require('express')();
var port = 3000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mysql = require('mysql');
var ejs  = require('ejs');
var hbs = require('hbs');
var bodyParser = require('body-parser');

//setup database
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_db"
});

//connect to database
conn.connect(function(err) {
  if (err) throw err;
  console.log('MySql Connected . . .')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//setup public folder
app.use(express.static('./public'));
var signnum;
app.get('/cms',(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    var string=JSON.stringify(results);
     // console.log(string);
     signnum =  JSON.parse(string);
     console.log(signnum);
     // var signnum = 'test';
    res.render('cms', { value: signnum});
  });
});

//route for insert data
app.post('/save',(req, res) => {
  let data = {product_name: req.body.product_name, product_price: req.body.product_price};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/cms');
  });
});

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/cms');
  });
});

//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/cms');
  });
});


app.get('/', function(req, res) {
  res.render('pages/index')
});

app.get('/controller', function(req, res) {
  res.render('pages/controller')
});

app.get('/screen', function(req, res) {
  res.render('pages/screen')
});

app.get('/chat', (req, res) => {
  res.render('pages/chat');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      });
});
















app.get('/links', function(req, res) {
  //array with items to send
  var items = [{
      name: 'node.js',
      url: 'https://nodejs.org/en/'
    },
    {
      name: 'ejs',
      url: 'https://ejs.co'
    },
    {
      name: 'expressjs',
      url: 'https://expressjs.com'
    },
    {
      name: 'vuejs',
      url: 'https://vuejs.org'
    },
    {
      name: 'nextjs',
      url: 'https://nextjs.org'
    }
  ];
  res.render('pages/links', {
    links: items
  })
});

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());
//our tiny alert message midleware
function messages(req, res, next) {
  var message;
  res.locals.message = message;
  next();
}
app.get('/form', messages, function(req, res) {
  res.render('pages/form');
});
app.post('/form', function(req, res) {
  var message = req.body;
  res.locals.message = message;
  res.render('pages/form');
});


app.get('/list', function(req, res) {
  //array with items to send
  var items = ['node.js', 'expressjs', 'ejs', 'javascript', 'bootstrap'];
  res.render('pages/list', {
    list: items
  })
});

app.get('/table', function(req, res) {
  //array with items to send
  var items = [{
      name: 'node.js',
      url: 'https://nodejs.org/en/'
    },
    {
      name: 'ejs',
      url: 'https://ejs.co'
    },
    {
      name: 'expressjs',
      url: 'https://expressjs.com'
    },
    {
      name: 'vuejs',
      url: 'https://vuejs.org'
    },
    {
      name: 'nextjs',
      url: 'https://nextjs.org'
    }
  ];
  res.render('pages/table', {
    table: items
  })
});

// app.listen(port, () => console.log(`MasterEJS app Started on port ${port}!`));

server.listen(process.env.PORT || 3000, function(){
    // console.log('Signage Running');
});
