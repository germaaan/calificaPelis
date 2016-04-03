// Pagina de inicio
exports.content = function(req, res) {
	res.render("index", {
		title: "CalificaPelis: Inicio"
	});
};