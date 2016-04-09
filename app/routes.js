var index = require("./routes/index");
var datos = require("./routes/datos");

module.exports = function(app) {
	// Rutas de acceso
	app.get("/", index.index);
	app.get("/index", index.index);
	app.get("/consultar", datos.consultar);
	app.get("/peliculas", datos.nombresPeliculas);
	app.get("/peliculas/nuevas", datos.crearPeliculas);
	app.post("/peliculas/nuevas", datos.nuevasPeliculas);
	app.get("/criticas/nuevas", datos.crearCriticas);
	app.post("/criticas/nuevas", datos.nuevasCriticas);
	app.get("/peliculas/:nombre", datos.datosPeliculas);
	app.get("/criticas/:pelicula", datos.datosCriticas);

	// Captura errores
	app.use(function(req, res, next) {
		var err = new Error("Error: página no encontrada.");
		err.status = 404;
		next(err);
	});

	// Manejador de errores:
	app.use(function(err, req, res, next) {
		res.status(err.status);
		res.render("error", {
			mensaje: err.message,
		});
	});
};