// Conexión a la base de datos
exports.connectionString = "postgres://calificador:calificador@192.168.10.138/calificaciones";

// Manejador de errores
exports.error = function(err, res, mensaje) {
	console.log(err);
	res.status(500);
	res.render("error", {
		mensaje: mensaje
	});
};