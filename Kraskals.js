//Kraskal's algorythm

const weightMatrix= [
    [0,  0,  46, 29, 14,  0,  24, 42, 56,  0,  57],
    [0,  0,  0,  0,  0,   0,  81, 0,  0,   64, 19],
    [46, 0,  0,  5,  13,  18, 13, 65, 0,   54, 0],
    [29, 0,  5,  0,  6,   54, 10, 0,  0,   1,  0],
    [14, 0,  13, 6,  0,   42, 0,  35, 100, 0,  80],
    [0,  0,  18, 54, 42,  0,  10, 0,  40,  69, 45],
    [24, 81, 13, 10, 0,   10, 0,  11, 42,  85, 0],
    [42, 0,  65, 0,  35,  0,  11, 0,  36,  0,  92],
    [56, 0,  0,  0,  100, 40, 42, 36, 0,   99, 0],
    [0,  64, 54, 1,  0,   69, 85, 0,  99,  0,  48],
    [57, 19, 0,  0,  80,  45, 0,  92, 0,   48, 0]
  ];
  

const edges = [
    [1, 3, 46],
    [1, 4, 29],
    [1, 5, 14],
    [1, 7, 24],
    [1, 8, 42],
    [1, 9, 56],
    [1, 11, 57],
    [2, 7 ,81],
    [2, 10, 64],
    [2,11, 19],
    [3, 4, 5],
    [3, 5, 13],
    [3, 6, 18],
    [3, 7, 13],
    [3, 8, 65],
    [3, 10, 54],
    [4, 5, 6],
    [4, 6, 54],
    [4, 7, 10],
    [4, 10, 1],
    [5, 6, 42],
    [5, 8, 36],
    [5, 9, 100],
    [5, 11, 80],
    [6, 7, 10],
    [6, 9, 40],
    [6, 10, 69],
    [6, 11, 45],
    [7, 8, 11],
    [7, 9, 42],
    [7, 10, 85],
    [8, 9, 36],
    [8, 11, 92],
    [9, 10, 99],
    [10, 11, 48]
]


function Kraskal(G) {

    //Setting the needed values;
    const edges = [];
    const trees = [];
    let treesCount = 0;
    const weight = [];
    let finalWeight;

    //Sorting edges increasing
    G.sort((a, b) => a[2] > b[2] ? 1 : -1);

    //Processing the shortest edge
    while(G.length > 0) {
        const current = G[0];
        G.shift();
        [first, second, currentWeight] = current;

        //Finding the trees current vertices belong to
        let tree1 = getArrayByVertexIndex(trees, first);
        let tree2 = getArrayByVertexIndex(trees, second);

        //Vertexes don't belong to the same tree
        if(tree1 !== tree2 || tree1 === undefined || tree2 === undefined) {
            let correct;

            //Processing cases
            if(tree1 === undefined && tree2 === undefined) { //Both undefined
                treesCount++;
                correct = treesCount;
                trees.push([first, correct]);
                trees.push([second, correct]);
            } else if(tree1 === undefined || tree2 === undefined) { //One undefined
               
                if(tree1 === undefined) { //The first is undefined
                    correct = tree2;
                    trees.push([first, correct]);
                } else { //The second is undefined
                    correct = tree1;
                    trees.push([second, correct]);
                }

            } else { //Both defined, connecting two trees
                correct = tree1;
                for(let m = 0; m < trees.length; m++) {
                  if(trees[m][1] === tree2) trees[m][1] = tree1;
                }
            }

            //Adding the edge of the final graph and the weight of the edge
            edges.push(current);
            weight.push(currentWeight);
        } 

        //Finding the total weight of the ages
        finalWeight = weight.reduce((a, b) => a + b);

    } return finalWeight;  //Returning the needed final weight
}

console.log(Kraskal(edges));

function getArrayByVertexIndex(array, index) {
    for(let i = 0; i < array.length; i++) {
        if(array[i][0] == index) {
            return array[i][1];
        }
    }
}


