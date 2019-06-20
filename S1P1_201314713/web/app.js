var express = require("express");
var path = require('path');
var morgan = require('morgan');

var app = express();
var urlencodedParser = express.urlencoded({extended: false});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* set up sql connection */
app.use(morgan('dev'));
var mysql = require("mysql");
var connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});

/* throw an error if sql connect fails. it should fail a couple times in docker 
 before successfully connecting. the container takes longer to boot up, essentially.
 */
connection.connect(function(err){
	if(err){
		console.error("error connecting: " + err.stack);
		return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
	}
	console.log("connected as id " + connection.threadId);
});


/* -------------------------------------- */
/* Get routes below */
//const customerController = require('../controllers/customerController');

app.get('/', function(req, res){
    connection.query('SELECT * FROM product', (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('customers', {
        data: customers
     });
    });
  });
app.post('/add', function(req, res){
  const data = req.body;
  console.log(req.body)
    const query = connection.query('INSERT INTO product set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/');
    });
  });

app.get('/update/:id', function(req, res){
  const { id } = req.params;
    connection.query("SELECT * FROM product WHERE id = ?", [id], (err, rows) => {
      res.render('customers_edit', {
        data: rows[0]
      });
    });
  });

app.post('/update/:id', function(req, res){
  const { id } = req.params;
  const newCustomer = req.body;

  connection.query('UPDATE product set ? where id = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/');
  });
  });


app.get('/delete/:id', function(req, res){
  const { id } = req.params;
    connection.query('DELETE FROM product WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });

app.use(express.static(path.join(__dirname, 'public')));

/* Port and listening info below */
/* might want to set up argv for easily changing the port */
var port = 3258;

app.listen(port, function(){
	console.log("app listening on port: " + port);
});
