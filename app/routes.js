var index = require("./routes/index");
var ver = require("./routes/ver");

module.exports = function(app) {
	// Inicio
	app.get("/", index.content);
	app.get("/index", index.content);
	app.get("/ver", ver.content);

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