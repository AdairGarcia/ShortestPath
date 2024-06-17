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

    dist[N - 1] = 0;

    // Calculating shortest path for
    // rest of the nodes
    for (let i = N - 2; i >= 0; i--)
    {

        // Initialize distance from i to
        // destination (N-1)
        dist[i] = INF;

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
            dist[i] = Math.min(dist[i], matrix[i][j]
                + dist[j]);
        }
    }
    // console.log(`distnacia más corta: ${dist[0]}`);
    console.log(dist[0]);
    return dist[0];
}


// This code is contributed by rag2127
