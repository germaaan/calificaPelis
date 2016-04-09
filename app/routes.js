var index = require("./routes/index");
var datos = require("./routes/datos");

module.exports = function(app) {
	// Inicio
	app.get("/", index.index);
	app.get("/index", index.index);
	app.get("/datos", datos.seleccionar);
	app.get("/peliculas", datos.nombresPeliculas);
	app.get("/peliculas/nuevas", datos.crearPeliculas);
	app.post("/peliculas/nuevas", datos.nuevasPeliculas);
	app.get("/criticas/nuevas", datos.crearCriticas);
	//app.post("/criticas/nuevas", datos.nuevasCriticas);
	app.get("/peliculas/:nombre", datos.peliculas);
	app.get("/criticas/:pelicula", datos.criticas);

	// Captura errores 404
	app.use(function(req, res, next) {
		var err = new Error("Error 404: Página no encontrada.");
		err.status = 404;
		next(err);
	});

	// Manejador de errores:
	app.use(function(err, req, res, next) {
		res.status(err.status);
		res.render("error", {
			message: err.message,
			error: err
		});
	});
};
