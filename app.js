const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const { MongoClient } = require("mongodb");

var inicioSesionIncorrecto = false;
const uri ="mongodb://localhost/27017";


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials("partials_absolute_path");
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view options', { layout: 'layaout' });


app.use(session({
  secret: "secret8465161616545610raul165513165clave",
  saveUninitialized: true,
  resave: true,
}));

// Pagina Iniciar Sesion
app.get("/", (req, res, next) => {
  res.render("index", { layout: false });
});


// Validación de credenciales de inicio de sesión
app.post("/login", function (req, res) {
  let email = req.body.email;
  let pass = req.body.password;
  let data = { inicioIncorrecto: true };

  if (email === 'a' /*consulta MONGODB USUARIOS*/ ) {
    //SI ES CORRECTO COMPROBAR ESA CONTRASEÑA PARA ESE USUARIO
    res.render("index");
  } else {
    res.render("index", data);
  }
});

// Página Registro
app.get("/registro", (req, res, next) => {
  res.render("registro", { layout: false });
});


// Pagina Home
app.get("/home", (req, res, next) => {
  
  //if (!req.body.email) {
   // res.redirect("/");
    //poner que se muestre mensaje de inicio incorrecto (Sporify)
  //} else {

    //inicio correcto
    //let email = req.body.email;

    res.render("home");
  //}
});


// Página Esperanza De Vida
app.get("/esperanzaVida", (req, res, next) => {

  let data = [
    {
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Americas_on_the_globe_%28red%29.svg/1200px-Americas_on_the_globe_%28red%29.svg.png",
      datos: {
        name: "América",
        global: "79",
        hombres: "77",
        mujeres: "81",
      },
    },
    {
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Europe_on_the_globe_%28red%29.svg/1200px-Europe_on_the_globe_%28red%29.svg.png",
      datos: {
        name: "Europa",
        global: "78",
        hombres: "74",
        mujeres: "81",
      },
    },
    {
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Oceania_on_the_globe_%28red%29_%28Polynesia_centered%29.svg/1200px-Oceania_on_the_globe_%28red%29_%28Polynesia_centered%29.svg.png",
      datos: {
        name: "Oceanía",
        global: "77",
        hombres: "75",
        mujeres: "80",
      },
    },
    {
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Asia_on_the_globe_%28red%29.svg/1200px-Asia_on_the_globe_%28red%29.svg.png",
      datos: {
        name: "Asia",
        global: "72",
        hombres: "70",
        mujeres: "74",
      },
    },
    {
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Africa_on_the_globe_%28red%29.svg/1200px-Africa_on_the_globe_%28red%29.svg.png",
      datos: {
        name: "África",
        global: "60",
        hombres: "58",
        mujeres: "61",
      },
    },
  ];

  res.render("esperanzaVida", {
    data: data,
    esperanzaVidaCard: req.query.data,
  });
});


// Página Natalidad
app.get("/natalidad", (req, res, next) => {
  res.render("natalidad");
});


// Página Contacto
app.get("/contacto", (req, res, next) => {
  res.render("contacto");
});

// Enviar correo con los datos del formulario de contacto
app.post("/contacto", function (req, res) {
    let nombre = req.body.nombre;
    let asunto = req.body.asunto;
    let mensaje = req.body.mensaje;
  
    res.redirect(
      "mailto:raulsr64@gmail.com?&subject=" +
        asunto +
        "&body=" +
        mensaje +
        ". Mensaje de: " +
        nombre
    );
  });



app.get("/*", (request, response, next) => {
  response.render("404",  { layout: false });
});

app.listen(3000, () => console.log("App listening on port 3000!"));