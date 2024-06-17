import { shortestDist } from './ShortestPath.js'


document.getElementById('tablaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nodeCount = document.getElementById('nodoCount').value;
    generateTable(nodeCount);
});

function generateTable(nodeCount) {
    const tableContainer = document.getElementById('tablaContainer');
    tableContainer.innerHTML = ''; // Limpiar cualquier tabla existente

    const table = document.createElement('table');
    table.setAttribute('class', 'table ')
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    tbody.setAttribute('class', 'table-group-divider')

    // Crear encabezado de la tabla
    const headerRow = document.createElement('tr');
    for (let i = 0; i <= nodeCount; i++) {
        const th = document.createElement('th');
        th.setAttribute('scope', 'col')
        th.textContent = i === 0 ? '' : `Nodo ${i}`;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear filas de la tabla
    for (let i = 1; i <= nodeCount; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j <= nodeCount; j++) {
            if (j === 0) {
                const cell = document.createElement('th');
                cell.setAttribute('scope', 'row');
                cell.textContent = `Nodo ${i}`;

                row.appendChild(cell);

            } else {
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('name', `node_${i}_${j}`);
                input.setAttribute('class', 'form-control');
                cell.appendChild(input);

                row.appendChild(cell);
            }
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableContainer.appendChild(table);

    // Mostrar botón para guardar datos
    document.getElementById('guardarDatos').style.display = 'block';
}

document.getElementById('guardarDatos').addEventListener('click', 
    function() {
        const nodeCount = document.getElementById('nodoCount').value;
        const matrix = [];

        for (let i = 1; i <= nodeCount; i++) {
            const row = [];
            for (let j = 1; j <= nodeCount; j++) {
                const input = document.querySelector(`input[name='node_${i}_${j}']`);
                const value = input.value ? parseFloat(input.value) : Infinity; // Usar Infinity para representar la ausencia de conexión
                row.push(value);
            }
            matrix.push(row);
        }
        const resultado = shortestDist(matrix,nodeCount);
        const resultContainer = document.getElementById('resultado');
        resultContainer.innerHTML = '';

        const resultText = document.createElement('p');
        resultText.textContent = `La distancia más corta es: ${resultado.distancia} km`;
        resultContainer.appendChild(resultText);

        const resultPath = document.createElement('p');
        resultPath.textContent = `El camino óptimo es: `;
        for(let i = 0; i < resultado.camino.length; i++){
            if(!(resultado.camino[i] == null)){
                if(resultado.camino[i + 1] == null){
                    resultPath.textContent += `${resultado.camino[i]}`;
                }else{
                    resultPath.textContent += `${resultado.camino[i]} -> `;
                }
            }
        }
        resultContainer.appendChild(resultPath);

});