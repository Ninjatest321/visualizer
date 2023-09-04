import React, { Component } from 'react';

import './Node.css'

export default class Node extends Component {
    render() {
        const {
            row,
            col,
            isFinish, 
            isStart,
            isWall,
            onMouseDown,
            onMouseUp,
            onMouseEnter,
            weight,
            heuristic,
        } = this.props;
        const add_on = 
        isFinish ? 'node-finish' 
        : isStart ? 'node-start' 
        : isWall ? 'node-wall'
        : '';
        return (<div 
            id={`node-${row}-${col}`}
            className={`node ${add_on}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}>
                    {weight}
                
            </div>
            );
    }

}