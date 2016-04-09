$(document).ready(function() {
	$.getJSON("/peliculas", function(data) {
		$.each(data, function(clave, valor) {
			$("#listado").append("<option>" + valor.nombre + "</option>");
		});
	});
});
