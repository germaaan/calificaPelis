var index = require("./routes/index");
var datos = require("./routes/datos");

module.exports = function(app) {
	// Inicio
	app.get("/", index.index);
	app.get("/index", index.index);
	app.get("/datos", datos.consultar);
	app.get("/peliculas", datos.nombresPeliculas);
	app.get("/peliculas/nuevas", datos.crearPeliculas);
	app.post("/peliculas/nuevas", datos.nuevasPeliculas);
	app.get("/criticas/nuevas", datos.crearCriticas);
	app.post("/criticas/nuevas", datos.nuevasCriticas);
	app.get("/peliculas/:nombre", datos.datosPeliculas);
	app.get("/criticas/:pelicula", datos.datosCriticas);

	// Captura errores 404
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
