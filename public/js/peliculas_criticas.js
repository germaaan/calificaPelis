$(document).ready(function() {
	$.getJSON("/peliculas", function(data) {
		$.each(data, function(clave, valor) {
			$("#pelicula").append("<option>" + valor.nombre + "</option>");
		});
	});
});