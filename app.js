const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const Usuario = require("./models/Usuarios")



var contrasenasDiferentes = false;
var emailYaRegistrado = false;
var datosIncompletos = false;

var emailIncorrecto = false;
var contraseñaIncorrecta = false;


const password = "MOl48FssxblU2L6b";
const uri = `mongodb+srv://raul_admin:${password}@cluster0.pjv02.mongodb.net/?retryWrites=true&w=majority`;



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
  resave: false,
}));


// Conexion a la bases de datos
mongoose.connect(uri);

// Pagina Iniciar Sesion
app.get("/", (req, res, next) => {
  res.render("index", { layout: false });
});


// Validación de credenciales de inicio de sesión
app.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;


  if((email.length <= 0) || (password.length <= 0)){
    datosIncompletos = true;
    res.render("index", { datosIncompletos, layout: false });
  }else{

    const checkEmail = await Usuario.findOne({ correo_electronico: email});

    if(checkEmail){
      const checkPassword = await Usuario.findOne({ correo_electronico: email, password: password});

      if(checkPassword){

        let consuta = await Usuario.find( { correo_electronico: email }, "nombre" );
        var nombreUsuario = consuta[0].nombre;

        req.session.email = email;
        req.session.save(function (err) {
          res.render("home", { nombreUsuario });
        })
        
      }else{
        contraseñaIncorrecta = true;
        res.render("index", { contraseñaIncorrecta, layout: false });
      }
    }else{
      emailIncorrecto = true;
      res.render("index", { emailIncorrecto, layout: false });
    }
  }
});

// Página Registro
app.get("/registro", (req, res, next) => {
  res.render("registro", { layout: false });
});

// Registro
app.post("/registro", async (req, res) => {
  let nombre = req.body.nombre;
  let email = req.body.email;
  let pass1 = req.body.password1;
  let pass2 = req.body.passwordConfirmacion;

  
  
  if((nombre.length <= 0) || (email.length <= 0) ){
    datosIncompletos = true;
    res.render("registro", { datosIncompletos, layout: false });
  }else if((password == null) || (pass1 != pass2)){
    contrasenasDiferentes = true;
    res.render("registro", { contrasenasDiferentes, layout: false });
  }else{
    const checkEmail = await Usuario.findOne({ correo_electronico: email});
    if(!checkEmail){
      const user = new Usuario({ nombre: nombre, correo_electronico: email, password: pass1})
      user.save();
      req.session.email = email;
        req.session.save(function (err) {
          res.render("home", { nombre });
      })
    }else{
      emailYaRegistrado = true;
      res.render("registro", { emailYaRegistrado, layout: false });
    }
  } 
});


// Pagina Home
app.get("/home", async (req, res) => {
  
  if (!req.session.email) {
    res.redirect("/");
  }else{
    let consuta = await Usuario.find( { correo_electronico: req.session.email }, "nombre" );
    var nombreUsuario = consuta[0].nombre;

    res.render("home", { nombreUsuario });
  }
});


// Página Esperanza De Vida
app.get("/esperanzaVida", (req, res, next) => {

  if (!req.session.email) {
    res.redirect("/");
  }else{
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
  }
});


// Página Natalidad
app.get("/natalidad", (req, res, next) => {
  if (!req.session.email) {
    res.redirect("/");
  }else{
    res.render("natalidad");
  }
});


// Página Contacto
app.get("/contacto", (req, res, next) => {
  if (!req.session.email) {
    res.redirect("/");
  }else{
    res.render("contacto");
  }
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


// Ajustes
app.get("/ajustes", async (req, res) => {

  if (!req.session.email) {
    res.redirect("/");
  }else{
    let email = req.session.email;

    let consuta = await Usuario.find( { correo_electronico: email }, "nombre" );
    var nombreUsuario = consuta[0].nombre;

    res.render("ajustes", { email, nombreUsuario });
  }
});


//Cambiar contraseña
app.post("/cambiarContrasena", async (req, res) =>{
  let contraseñaActual = req.body.pssActual;
  let contraseñaNueva = req.body.pssNueva;
  let contraseñaNueva2 = req.body.pssNueva2;

  let email = req.session.email;
  let consutaUser = await Usuario.find( { correo_electronico: email }, "nombre" );
  var nombreUsuario = consutaUser[0].nombre;

  let consuta = await Usuario.find( { correo_electronico: email }, "password" );
  var contraseña = consuta[0].password;

  console.log(nombreUsuario);
  console.log(contraseña);

  if(contraseñaActual.length <= 0){
    datosIncompletos = true;
    res.render("ajustes", { datosIncompletos, email, nombreUsuario });
  }else if(contraseñaActual != contraseña){
    contraseñaIncorrecta = true;
    console.log("asdd");
    res.render("ajustes", { contraseñaIncorrecta, email, nombreUsuario });
  }else if(contraseñaNueva.length <=0 ||contraseñaNueva2 <= 0){
    datosIncompletos = true;
    res.render("ajustes", { datosIncompletos, email, nombreUsuario });
  }else if(contraseñaNueva != contraseñaNueva2){
    contrasenasDiferentes = true;
    res.render("ajustes", { contrasenasDiferentes, email, nombreUsuario });
  }else{
    await Usuario.findOneAndUpdate({ correo_electronico: email }, { password: contraseñaNueva });
    res.render("ajustes", { email, nombreUsuario });
  }
});

// Cerrar sesion
app.get("/cerrarSesion", (req, res) => {
  
  req.session.destroy();
  res.redirect("/");
});

// Eliminar cuenta
app.get("/eliminarCuenta", async (req, res) => {
  
  await Usuario.findOneAndDelete( { correo_electronico: req.session.email } );
  req.session.destroy();
  res.render("index",  { layout: false } );
});

// Página de error 404
app.get("/*", (request, response, next) => {
  response.render("404",  { layout: false });
});

app.listen(3000, () => console.log("App listening on port 3000!"));