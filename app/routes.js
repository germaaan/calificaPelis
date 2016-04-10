var index = require("./routes/index");
var peliculas = require("./routes/peliculas");
var criticas = require("./routes/criticas");

module.exports = function(app) {
	// Rutas de acceso
	app.get("/", index.index);
	app.get("/index", index.index);
	app.get("/consultar", peliculas.data);
	app.get("/peliculas", peliculas.peliculasNombres);
	app.get("/peliculas/nuevas", peliculas.peliculasForm);
	app.post("/peliculas/nuevas", peliculas.peliculasInsert);
	//app.get("/peliculas/editar", datos.peliculasUpdate);
	app.get("/peliculas/:nombre", peliculas.peliculasData);
	app.get("/criticas/nuevas", criticas.criticasForm);
	app.post("/criticas/nuevas", criticas.criticasInsert);
	//app.get("/criticas/eliminar", datos.criticasDelete);
	app.get("/criticas/:pelicula", criticas.criticasData);

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