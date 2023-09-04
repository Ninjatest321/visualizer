import React, { Component } from 'react';
import Node from './Node/Node';

import './PathFindingVisualizer.css';
import { dijkstra } from './searchAlgorithms/Dijkstra';
import { getShortestPath } from './searchAlgorithms/Dijkstra';
import { aStar, getShortestPath2 } from './searchAlgorithms/aStar';

const ROWS = 20;
const COLS = 50;

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 10;
const END_NODE_COL = 40;

export default class PathFindingVisualizer extends Component {

    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false
        };
    }

    componentDidMount() {
        const grid = [];
        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLS; col++) {
                const currentNode = createNode(row, col);
                currentRow.push(currentNode);
            }
            grid.push(currentRow);
        }
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        console.log("mouseDown");
         const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
         this.setState({grid: newGrid, mouseIsPressed: true});
      }
    
    handleMouseEnter(row, col) {
        console.log("mouseEnter");

        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
      }
    
    handleMouseUp() {
        console.log("mouseUp");

        this.setState({mouseIsPressed: false});
      }

    runDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
        const nodesInShortestPathOrder = getShortestPath(endNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    animateDijkstra(visitedNodesInOrder, shortestPath) {
        console.log(visitedNodesInOrder);
        for(let i = 1; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(shortestPath);
                }, 10 * i);
                continue;
            }
            
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                if(!node.isFinish)
                {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                  'node node-visited';
                }
              }, 10 * i);
        }

    }

    runAStar() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = aStar(grid, startNode, endNode);
        const nodesInShortestPathOrder = getShortestPath2(endNode);
        this.animateAStar(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    animateAStar(visitedNodesInOrder, shortestPath) {
        console.log(visitedNodesInOrder);
        for(let i = 1; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(shortestPath);
                }, 10 * i);
                continue;
            }
            
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                if(!node.isFinish)
                {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                  'node node-visited';
                }
              }, 10 * i);
        }

    }

    animateShortestPath(shortestPath) {
        for(let i = 1; i < shortestPath.length-1; i++) {
            setTimeout(() => {
                const node = shortestPath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 20 * i);
        }
    }

    reset() {
        console.log("Reset Run")
        const {grid} = this.state;
        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLS; col++) {
                const node = grid[row][col];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                node.isVisited = false;
                node.previousNode = null;
                node.distance = Infinity;
                if(node.isStart === true || node.isFinish === true || node.isWall == true) {
                
                } 
                else {
                    console.log("HI my name is amogh");

                    element.className = 'node';
                }    
                currentRow.push(node);         

            }
            grid[row] = currentRow;
        }

        this.setState({grid});
        console.log(grid);
        this.render();
    }


    render() {
        const {grid, mouseIsPressed} = this.state;

        return (
            <>
            <div className='grid'>
                {grid.map((row, rowidx) => {
                    return (
                        <div key = {rowidx}>
                        {row.map((node, nodeIdx) => {
                            const {row, col, isStart, isFinish, isWall, weight} = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    row={row}
                                    col={col}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                    isWall={isWall}
                                    mouseIsPressed={mouseIsPressed}
                                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                    onMouseUp={() => this.handleMouseUp()}
                                    // weight={0}
                                    ></Node>);
                            })}
                        </div>
                    );
                })}
            </div>
            <button onClick={() => this.reset()}>Reset Grid</button>
            <button onClick={() => this.runDijkstra()}>Dijktra's Algorithm</button>
            <button onClick={() => this.runAStar()}>A* Algorithm</button>
            </>
        )
        
    }
}

const createNode = (row, col) => {
    return {
        col: col,
        row: row,
        isFinish: row === END_NODE_ROW && col == END_NODE_COL,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        distance: 99999999,
        isVisited: false,
        isWall: false,
        previousNode: null,
        weight: 0,//(Math.floor(Math.random() * 2) * 4 + 1),
        heuristic: manhattanDistance(row, col)
    };
};

// const resetNode = (node) => {
//     node.isFinish = node.row === END_NODE_ROW && node.col == END_NODE_COL;
//     node.isStart = node.row === START_NODE_ROW && node.col === START_NODE_COL,
//     distance = Infinity
//     isVisited = false,
//     isWall = false,
//     previousNode = null,
//     weight = (Math.floor(Math.random() * 2))
//     heuristic =manhattanDistance(row, col)
// }

function manhattanDistance(row, col) {
    return Math.abs(row - END_NODE_ROW) + Math.abs(col - END_NODE_COL);
    
}
const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
}