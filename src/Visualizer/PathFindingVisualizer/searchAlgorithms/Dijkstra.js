import { createMinHeap, minHeap } from "../minHeap";

export function dijkstra(grid, startNode, endNode){
    if (!startNode || !endNode || startNode === endNode) {
        return false;
    }

    const visitedNodesInOrder = [];
    startNode.distance = 0;
    let unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
        const closestNode = unvisitedNodes.shift();
        // console.log("Closest Node" + closestNode.distance);
        //Walls
        if (closestNode.isWall) {
            continue;
        }
        //Trapped
        if (closestNode.distance === Infinity) {
            return visitedNodesInOrder;
        }

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        //Target Reached
        if (closestNode === endNode) {
            return visitedNodesInOrder;
        }

        updateNeighbors(closestNode, grid);

    }

    return visitedNodesInOrder;

}

function updateNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
            console.log(node.weight);
            let dist = Math.min(node.distance + node.weight, neighbor.distance);
            if(!(dist == neighbor.distance)) {
                neighbor.distance = node.distance + node.weight;
                neighbor.previousNode = node;
            }

    }
}

//Gets neighbors that haven't been visited
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) {
        neighbors.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1) {
        neighbors.push(grid[row + 1][col]);
    } 
    if (col > 0) {
        neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1){
        neighbors.push(grid[row][col + 1]);
    }
    console.log(neighbors);

    return neighbors.filter(neighbor => !neighbor.isVisited);
  }

  //Gets all nodes and sets distance to infinity
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }  

export function getShortestPath(endNode) {
    const shortestPath = [];
    let currentNode = endNode;
    while ( currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPath;
}

// /////Heap stuff

// function pop(heap, heapLength) {
//         let min = heap[0];
        
//         let temp = heap[0];
//         heap[0] = heap[heapLength-1];
//         heap[heapLength-1] = temp;
//         arrayLength--;
    
//         heapify(this.array, 0, heapLength);
//         console.log("Minimum Value from pop: " + min)
//         return(min.distance);
//     }


// function createMinHeap(array) {
//     for(let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
//         heapify(array, i, array.length);
//     }
//     console.log("CreateMiniHeap() aftermath: " + array)
//     return array;
// }

// function heapify(array, index, length) {
//     let min = index;
//     let left = 2 * index + 1;
//     let right = 2 * index + 2;


//     if(array[left.distance === 0]) {
//         console.log("Zero found");
//     }

//     if(array[right.distance === 0]) {
//         console.log("Zero found right");
//     }


//     if(left < length && array[left].distance < array[min].distance) {
//         min = left;
//     }

//     if(right < length && array[right].distance < array[min].distance) {
//         min = right;
//     }

//     if (min != index) {
//         let temp = array[index];
//         array[index] = array[min];
//         array[min] = temp;

//         heapify(array, min, length);
//     }
// }

