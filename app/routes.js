var index = require("./routes/index");

module.exports = function(app) {
	// Inicio
	app.get("/", index.index);
	app.get("/index.html", index.index);

	// Captura errores 404 y los reenvia al manejador de errores
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