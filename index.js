var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var path = require('path');
var logger = require('morgan');
var mysql = require('mysql2');

//variabels que se encargan de conectarse a los modulos de routes
var indexRouter = require('./routes/findex');
var usersRouter = require('./routes/users');
const PORT = process.env.PORT || 3000;
//variabels que se encargan de conectarse a los modulos de routes
var indexRouter = require('./routes/findex');
var usersRouter = require('./routes/users');

//no se muy bien que hacen
const { json, query } = require('express');
const { Console } = require('console');

// configura el motor de visualizacion ejs
app.set('view engine', 'ejs');
//path.join() concatena los directorios
app.set('views', path.join(__dirname, 'views'));

/***********configuracion***********/
// configura el motor de visualizacion ejs
app.set('view engine', 'ejs');
//path.join() concatena los directorios
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended:false}));
app.use(express(json));
var conexion = mysql.createConnection({
  host: 'containers-us-west-146.railway.app',
  database: 'railway',
  user: 'root',
  password:'rlXWedxPLop1pYCVr9uS',
  port:'7964'
});
conexion.connect(function(error){
  if(error){
      throw error;
  }else{

  }
})


app.post('/monitoreo',function(req,res){
  console.log('si funciona el modulo')
  conexion.query('SELECT * FROM ordenador;',(err,result)=>{
    if(err) throw err;
    res.render('monitoreo',{result:result})
  });
});

/*
app.get('/redire',function(req,res){
  res.redirect('/monitoreo')
})
*/

server.listen(PORT,()=>{
    console.log('el servidor esta listo en el purto'+ PORT )
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use((req, res, next)=>{
    res.status(404).render("404")
  })
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


  //console.log(os.cpus());
