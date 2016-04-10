$(document).ready(function() {
	$.getJSON("peliculas", function(data) {
		data = $(data).sort(ordenarNombres);

		$.each(data, function(clave, valor) {
			$("#listado").append("<option>" + valor.nombre + "</option>");
		});

		cambiaInfoPelicula();
	});

	$("#listado").on("change", function() {
		cambiaInfoPelicula();
	});

	$("#ver").click(function() {
		$("#lista-comentarios").empty();

		$.getJSON("criticas/:" + $("#listado").val(), function(data) {
			$.each(data, function(clave, valor) {
				var critica = "<li class='list-group-item'>" +
					"<span class='badge'>" + valor.nota + " / 10</span>" +
					"<strong>Usuario: </strong>" + valor.usuario +
					"<strong>Fecha: </strong>" + valor.fecha +
					"<br/><strong>Comentario: </strong>" + valor.texto + "</li>";

				$("#lista-comentarios").append(critica);
			});
		});
	});

	function ordenarNombres(a, b) {
		return a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1;
	}

	function cambiaInfoPelicula() {
		$.getJSON("peliculas/:" + $("#listado").val(), function(data) {
			$("#director").val(data[0].director);
			$("#anio").val(data[0].anio);
			$("#genero").val(data[0].genero);
		});

		$("#lista-comentarios").empty();
	}
});