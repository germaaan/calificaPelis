function listarPeliculas(data) {
	$(document).ready(function() {
		$.each(data, function(clave, valor) {
			$("#listado").append("<option>" + valor.nombre + "</option>");
		});
	});
}