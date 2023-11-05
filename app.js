const config = require("./config");
const DAOReservas = require("./DAOReservas");
const DAODestinos = require("./DAODestinos") /*
const utils = require("./utils"); */
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser"); 
const fs = require("fs");
const morgan = require("morgan");
const e = require("express");
const { response } = require("express");
const session = require("express-session");
const sessionMySql = require("express-mysql-session");

// Crear un servidor Express.js
const app = express();

const MySQLStore = sessionMySql(session);
const sessionStore  = new MySQLStore(config.mysqlConfig); 

const middlewareSession = session({
  saveUninitialized: false,
  secret:"tarea22",
  resave: false,
  store: sessionStore
});

app.use(middlewareSession);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Crear un pool de conexiones a la base de datos de MySQL 
const pool = mysql.createPool(config.mysqlConfig);


// Crear una instancia de DAOReservas 
const daoR = new DAOReservas(pool);
const daoD = new DAODestinos(pool);
const ficherosEstaticos = path.join(__dirname, "public");

app.use(express.static(ficherosEstaticos));

// Arrancar el servidor 
app.listen(config.port, function(err) {
    if (err) {
       console.log("ERROR al iniciar el servidor");
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});

app.get('/', (req, res) => {
  daoD.getAllDestinos(cb_getAll);
  
  function cb_getAll(err, result){
    if(err){
        console.log(err.message);
    }
    else{
        destinosList = result;
        res.render('index', {
          destinosList : destinosList,
        });
    }
  }
});

app.get('/index', (req, res) => {
  res.render('index');
}); 


 app.get('/reservas', (req, res) => {
  daoD.getDestinosNombre(req.query.destino,cb_getNombre);

  function cb_getNombre(err, result){
    if(err){
        console.log(err.message);
    }
    else{
        destinosNombreList = result;
        res.render('reservas', {
          destinosNombreList : destinosNombreList,
        });  
    }
  }
});  

   
  /* 
  daoD.getDestinosNombre(nombre,cb_getNombre);
  function cb_getNombre(err, result){
    if(err){
        console.log(err.message);
    }
    else{
        destinosNombreList = result;
        res.render('reservas', {
          destinosNombreList : destinosNombreList,
        });
    }
  } */

/* app.get('/tasks', (req, res) =>{
    
    daoT.getAllTasks(res.locals.userEmail, cb_getAll);
    function cb_getAll(err, result){
        if(err){
            console.log(err.message);
        }
        else{
            taskList = result;
            res.render('tasks', {
                taskList : taskList,
            });
        }
    } */

/* <!-- <% if(destinosList.length > 0) {%>
                    <% destinosList.map(destino => { %>
                        <div class="carousel-item active">
                            <img src="<%= destino.imagen %>" class="d-block w-100" alt="<%= destino.nombre %>"width="60">
                        </div>
                    <% }) %>
                <% } else { %>
                    <p> No existen imagenes </p>
                <% } %> --> */