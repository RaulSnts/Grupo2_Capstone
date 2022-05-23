const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");

var inicioSesionIncorrecto = false;


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials("partials_absolute_path");
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view options', { layout: 'layaout' });


// Pagina Inicial - Inicio Sesion / Registrarse
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

// Registro


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

app.listen(3000, () => console.log("App listening on port 3000!"));