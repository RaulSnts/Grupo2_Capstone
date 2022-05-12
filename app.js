const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials("partials_absolute_path");
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view options', { layout: 'layaout' });

// VARIABLES

//Renderizar pagina Home
app.get("/", (req, res, next) => res.render("home"));

// Renderizar Esperanza de vida
app.get("/prueba", (req, res, next) => res.render("index"));

// Renderizar Contacto
app.get("/contacto", (req, res, next) => res.render("contacto"));

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