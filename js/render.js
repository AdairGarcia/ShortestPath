// Función para dibujar un grafo ponderado dirigido con D3.js
export function renderizar(matrizAdyacencia, tamaño) {
    d3.select("svg").remove();
    // Crear el contenedor SVG donde se dibujará el gráfico
    var svg = d3.select("body").append("svg")
                .attr("width", tamaño)
                .attr("height", tamaño);

    // Calcular el número de nodos basado en la longitud de la matriz
    var numNodos = matrizAdyacencia.length;

    // Configuración de las posiciones de los nodos en un círculo
    var radio = tamaño / 2 - 50;
    var centerX = tamaño / 2;
    var centerY = tamaño / 2;
    var nodos = [];

    // Calcular las posiciones de los nodos en un círculo
    for (var i = 0; i < numNodos; i++) {
        var angle = (i / numNodos) * 2 * Math.PI;
        var x = centerX + radio * Math.cos(angle);
        var y = centerY + radio * Math.sin(angle);
        nodos.push({ id: i + 1, x: x, y: y }); // Agregamos un ID de nodo (1-based)
    }

    // Objeto para almacenar las aristas ya dibujadas
    var aristasDibujadas = {};

    // Dibujar los enlaces (aristas) entre nodos
    for (var i = 0; i < numNodos; i++) {
        for (var j = 0; j < numNodos; j++) {
            if (matrizAdyacencia[i][j] !== 0 && isFinite(matrizAdyacencia[i][j])) { // Verificar si el valor es finito y distinto de cero
                var peso = matrizAdyacencia[i][j];

                // Verificar si la arista ya ha sido dibujada en ambas direcciones
                if (!aristasDibujadas[`${i}-${j}`] && !aristasDibujadas[`${j}-${i}`]) {
                    // Calcular las coordenadas de inicio y fin de la línea
                    var startX = nodos[i].x;
                    var startY = nodos[i].y;
                    var endX = nodos[j].x;
                    var endY = nodos[j].y;

                    // Calcular el ángulo y la longitud del segmento de flecha
                    var dx = endX - startX;
                    var dy = endY - startY;
                    var angle = Math.atan2(dy, dx);
                    var length = Math.sqrt(dx * dx + dy * dy);

                    // Calcular las coordenadas del punto final de la flecha (a una distancia del nodo destino)
                    var arrowLength = 10; // Longitud de la flecha
                    var arrowX = endX - arrowLength * Math.cos(angle);
                    var arrowY = endY - arrowLength * Math.sin(angle);

                    // Dibujar la línea de la arista con flecha
                    svg.append("line")
                       .attr("x1", startX)
                       .attr("y1", startY)
                       .attr("x2", arrowX)
                       .attr("y2", arrowY)
                       .attr("stroke", "black")
                       .attr("marker-end", "url(#arrow)");

                    // Añadir etiqueta de peso del enlace si no es Infinity
                    svg.append("text")
                       .attr("x", (startX + endX) / 2)
                       .attr("y", (startY + endY) / 2)
                       .text(peso)
                       .attr("font-family", "Arial")
                       .attr("font-size", "12px")
                       .attr("fill", "black");

                    // Marcar la arista como dibujada en ambas direcciones
                    aristasDibujadas[`${i}-${j}`] = true;
                    aristasDibujadas[`${j}-${i}`] = true;
                }
            }
        }
    }

    // Definir la flecha como un marcador en el SVG
    svg.append("defs").append("marker")
       .attr("id", "arrow") // ID único para la flecha
       .attr("viewBox", "0 0 10 10") // Cuadro de vista para la vista de marcador
       .attr("refX", 8) // Posición relativa de la punta de la flecha
       .attr("refY", 5)
       .attr("markerUnits", "strokeWidth")
       .attr("markerWidth", 6) // Ancho del marcador
       .attr("markerHeight", 6) // Altura del marcador
       .attr("orient", "auto") // Orientación automática de la flecha
       .append("path") // Definición del camino de la flecha
       .attr("d", "M0,0 L10,5 L0,10") // Forma de la flecha: triángulo
       .attr("fill", "black"); // Color de la flecha

    // Dibujar los nodos como círculos
    svg.selectAll("circle")
       .data(nodos)
       .enter().append("circle")
       .attr("cx", function(d) { return d.x; })
       .attr("cy", function(d) { return d.y; })
       .attr("r", 20)
       .attr("fill", "steelblue")
       .attr("stroke", "black");

    // Añadir etiquetas a los nodos
    svg.selectAll("text.node-label")
       .data(nodos)
       .enter().append("text")
       .attr("class", "node-label")
       .attr("x", function(d) { return d.x; })
       .attr("y", function(d) { return d.y; })
       .text(function(d) { return d.id; })
       .attr("font-family", "Arial")
       .attr("font-size", "12px")
       .attr("text-anchor", "middle")
       .attr("dy", "0.35em")
       .attr("fill", "white");

    // Añadir título a los nodos (opcional)
    svg.selectAll("title")
       .data(nodos)
       .enter().append("title")
       .text(function(d) { return+ d.id; });

    // Añadir título a las aristas (opcional)
    svg.selectAll("line")
       .data(matrizAdyacencia)
       .append("title")
       .text(function(d, i) {
           var source = i + 1;
           var titles = [];
           for (var j = 0; j < d.length; j++) {
               if (matrizAdyacencia[i][j] !== 0 && isFinite(matrizAdyacencia[i][j])) {
                   var target = j + 1;
                   var weight = matrizAdyacencia[i][j];
                   titles.push("De " + source + " a " + target + ", peso: " + weight);
               }
           }
           return titles.join("\n");
       });

    // Centrar el gráfico SVG en la pantalla
    svg.attr("transform", `translate(${window.innerWidth / 2 - tamaño / 2},${window.innerHeight / 2 - tamaño / 2})`);
}




