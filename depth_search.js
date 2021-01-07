'use strict'

const context = document.getElementById('canvas').getContext('2d');


const centerX = 400;
const centerY = 400;
const radius = 30;
const countVertexes = 11;

const directed = true;

const coordX = [];
const coordY = [];

const matrix = [
    [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
];

const drawVertex = (x, y, text) => {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
    context.font = '24px serif';
    context.fillText(text, x - 6, y + 8);  
}

const getAngle = (x1, y1, x2, y2) => {
    const angle = [];
    const path = Math.sqrt((x2-x1) ** 2 + (y2 - y1) ** 2);
    angle[0] = (y2 - y1) / path;
    angle[1] = (x2 - x1) / path;
    return angle;
}

const lineDrawer = (x1, y1, x2, y2, pointed, tween) => {
    context.beginPath();
  
    if(x1 === x2 && y1 === y2) {
        context.moveTo(x1, y2 + radius);
        context.lineTo(x1 + radius, y1 + radius);
        context.lineTo(x1 + radius, y2);
        context.stroke();
    }

    let angle = getAngle(x1, y1, x2, y2);
    let sin = angle[0];
    let cos = angle[1];
    x1 += radius * cos;
    y1 += radius * sin;
    x2 -= radius * cos;
    y2 -= radius * sin;
    context.moveTo(x1, y1);


    if(tween)  {
        //If vertexes are connected both ways
        const midX = (x1 + x2) / 2 + 15;
        const midY = (y1 + y2) / 2 + 15;
        angle = getAngle(midX, midY, x2, y2);
        sin = angle[0];
        cos = angle[1];
        context.lineTo(midX, midY);
    }

    context.lineTo(x2, y2);
    context.stroke();

    //Drawing a point
    if(pointed) {
        const pointSize = radius / 5;
        const cx1 = x2 - 2 * pointSize * cos - pointSize * sin;
        const cy1 = y2 - 2 * pointSize * sin + pointSize * cos;
        const cx2 = x2 - 2 * pointSize * cos + pointSize * sin;
        const cy2 = y2 - 2 * pointSize * sin - pointSize * cos;

        context.moveTo(x2, y2);
        context.lineTo(cx1, cy1);
        context.lineTo(cx2, cy2);
        context.lineTo(x2, y2);
        context.stroke();
    }
}

//Drawing vertexes

function vertexesDrawing() {
    for(let i = 0; i < countVertexes; i++) {
    const x = (centerX + 300 * Math.cos(2 * Math.PI * i /  countVertexes));
    const y = (centerY + 300 * Math.sin(2 * Math.PI * i / countVertexes));
    coordX.push(x);
    coordY.push(y);
    drawVertex(x, y, i + 1);
   } 
}
vertexesDrawing();

const tweens = [];
let tween = false;

for(let i = 0; i < countVertexes; i++) {
    for(let j = 0; j < countVertexes; j++) {
        if(matrix[i][j]) {
            if(matrix[j][i] && !tweens.includes(`${i}${j}`)) {
                tween = true;
                tweens.push(`${j}${i}`);
            }
            lineDrawer(coordX[i], coordY[i], coordX[j], coordY[j], directed, tween);
        }
        tween = false;
    }
}



function DepthSearch(G, a) {
    const DFS = Array(G.length).fill(0);
    DFS[a] = 1;
    const stack = [];
    stack.push(a);
    let k = 1;
    let goForward = true;
    // loop for processing all active vertexes
    while (stack.length) {
        const v = stack[0];
        // process all relations with active vertex
        if (goForward) {
            // process all vertexes
            for (let j = 0; j < G.length; j++) {
                console.log(`Currently active vertex: ${v}, DFS:  ${DFS}, vertex to compare: ${j}, stack: ${stack}`);
                //The vertex has connection and it's not the active one
                if (G[v][j] === 1 && v !== j) {
                    //If the vertex is new
                    if (DFS[j] === 0) {
                        k++;
                        DFS[j] = k;
                        stack.unshift(j);
                        //console.log(`Stack in iterations: ${stack}`);
                        // If that's the last vertex to compare (move to the next vertex in stack)
                    }
                } else if (j === G.length - 1 && v === stack[0]) {
                    goForward = false;
                }
            }
        } else { //Removing vertex from the stack if there's nowhere to go
            stack.shift();
            const result = [];
            DFS.forEach( (el, i) => {
                if(el > 0) result.push(i);
            });
            let index = k;
            const notVisited = Array(G.length)
                .fill(0)
                .map((el, i) => i)
                .filter(el => !result.includes(el));
            notVisited.forEach(el => {
                if (G[v][el]) {
                    index++;
                    DFS[el] = index;
                    //console.log(`Visited ${el + 1} from ${v + 1}`);
                }
            });
            k = index;
        }
    }
    return `DFS: ${DFS}`;
}

const m1 = [
    [1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 0],
    [1, 0, 1, 0, 0],
];

const m2 = [
    [0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0],
];
console.log(DepthSearch(matrix, 0));