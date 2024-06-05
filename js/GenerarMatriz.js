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
    for (let i = 1; i <= nodeCount - 1; i++) {
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
}

