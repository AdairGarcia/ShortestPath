// JavaScript program to find shortest distance
// in a multistage graph.


let INF = Number.MAX_VALUE;

// Returns shortest distance from 0 to
// N-1.
export function shortestDist(matrix,N)
{

    // dist[i] is going to store shortest
    // distance from node i to node N-1.
    let dist = new Array(N);
    let path = new Array(N);

    dist[N - 1] = 0;
    path [N-1] = -1;
    

    // Calculating shortest path for
    // rest of the nodes
    for (let i = N - 2; i >= 0; i--)
    {

        // Initialize distance from i to
        // destination (N-1)
        dist[i] = INF;
        path[i] = -1;

        // Check all nodes of next stages
        // to find shortest distance from
        // i to N-1.
        for (let j = i; j < N; j++)
        {
            // Reject if no edge exists
            if (isNaN(matrix[i][j]) || matrix[i][j] == INF)
            {
                continue;
            }

            // We apply recursive equation to
            // distance to target through j.
            // and compare with minimum distance
            // so far.
            if (dist[i] > matrix[i][j] + dist[j]) {
                dist[i] = matrix[i][j] + dist[j];
                path[i] = j;
            }
        }
    }
    if(dist[0] == INF){
        console.log('No hay camino del nodo de inicio al nodo final');
        return -1;
    }

    let caminoOptimo = [];
    let nodoActual = 0;

    for (let i = 0; i < N; i++) {
        if (nodoActual == -1) {
            break;
        }
        caminoOptimo.push(nodoActual+1);
        nodoActual = path[nodoActual];
    }

    
    return[ dist[0],caminoOptimo.join(' -> ')]
    
}


// This code is contributed by rag2127
