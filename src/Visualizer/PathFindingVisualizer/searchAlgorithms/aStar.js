import { createMinHeap, minHeap } from "../minHeap";

export function aStar(grid, startNode, endNode){
    if (!startNode || !endNode || startNode === endNode) {
        return false;
    }

    const visitedNodesInOrder = [];
    startNode.distance = 0;
    let unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        unvisitedNodes.sort((nodeA, nodeB) => (nodeA.distance * 5 + nodeA.heuristic) - (nodeB.distance * 5 + nodeB.heuristic));
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
            let dist = Math.min(node.distance + node.weight, neighbor.distance);
            if(!(dist === neighbor.distance)) {
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

export function getShortestPath2(endNode) {
    const shortestPath = [];
    let currentNode = endNode;
    while ( currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPath;
}

