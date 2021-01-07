//Find the shortest way to the vertexby Dijkstra algorythm

function Dijkstra(G, s, t) {

    let l = []; //Distance from the starting vertex to the ending vertex
    let status = []; //Is vertex constant or temporary
    let temporary = [];
    //Step1:
    //Giving the statuses and distances for all vertexes
    for (let i = 0; i < G.length; i++) {
        l[i] = Infinity;
        status[i] = 'temporary';
        temporary[i] = i;
    }
    //Changing the status and weight
    l[s] = 0;
    status[s] = 'permanent';
    delete temporary[s];

    //Step2:
    for (let i = 0; i < 10000; i++) {
        //Checking status
        if (status[s] == 'permanent') {
            //Creating an array of distances
            //const distances = [];
            //Iterating vertexes
            for (let v = 0; v < G.length; v++) {
                let edgeLength = G[s][v];
                //console.log(`The length ${s} - ${v}: ${edgeLength} `);
                //Finding connected vertexes to s
                if (edgeLength > 0) {
                    //Checking the distances
                    if (l[v] > l[s] + edgeLength) {
                        //Finding the needed distances 
                        l[v] = l[s] + edgeLength;
                    }
                }
            }

            //Finding the edge with minimum weight
            for (let m = 0; m < temporary.length; m++) {
                if (temporary[m] >= 0) temporary[m] = l[m];
            }
            let minim = findMinimum(temporary);
            let k = temporary.indexOf(minim);
            delete temporary[k];

            if (k < 0) {
                console.log(`There is no way to this vertex`);
                break;
            }
            if (status[k] == 'temporary') {
                status[k] = 'permanent';

                Step3:
                //Checking whether the needed vertex exist
                if (k == t) {
                    console.log(`You've reached the final vertex`);
                    //If k is the final vertex - end
                    break;
                } else {
                    //Make k an active vertex and move to step 2
                    s = k;
                    continue;
                }
            }
        }
    }
    console.log(`Distances: ${l}`);
    //Return the distance we were looking for
    return l[t];
};

const m = [
    [0, 15, 0, 18, 0, 0],
    [0, 0, 14, 0, 0, 0],
    [0, 0, 0, 0, 0, 28],
    [0, 6, 9, 0, 10, 0],
    [0, 0, 7, 0, 0, 36],
    [0, 0, 0, 0, 0, 0]
]
console.log(Dijkstra(m, 0, 5));


function findMinimum(arr) {
    let a = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            a.push(arr[i]);
        }
    }
    a.sort();
    let min = a[0];
    return min;
}

const weightMatrix = [
    [0, 0, 46, 29, 14, 0, 24, 42, 56, 0, 57],
    [0, 0, 0, 0, 0, 0, 81, 0, 0, 64, 19],
    [46, 0, 0, 5, 13, 18, 13, 65, 0, 54, 0],
    [29, 0, 5, 0, 6, 54, 10, 0, 0, 1, 0],
    [14, 0, 13, 6, 0, 42, 0, 35, 100, 0, 80],
    [0, 0, 18, 54, 42, 0, 10, 0, 40, 69, 45],
    [24, 81, 13, 10, 0, 10, 0, 11, 42, 85, 0],
    [42, 0, 65, 0, 35, 0, 11, 0, 36, 0, 92],
    [56, 0, 0, 0, 100, 40, 42, 36, 0, 99, 0],
    [0, 64, 54, 1, 0, 69, 85, 0, 99, 0, 48],
    [57, 19, 0, 0, 80, 45, 0, 92, 0, 48, 0]
];
  //console.log(Dijkstra(weightMatrix, 0, 9));