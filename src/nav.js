import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';


export default function Nav() {

    const navStyle = {
        color: 'white',
        textDecoration: 'none'
    }
    return (
        <nav className='nav'>
            <h3>Amogh's Algorithm Visualizer</h3>
            <ul className="nav-links">
                <Link style={navStyle} to="/SortingVisualizer">
                    <li>Sorting Visualizer</li>
                </Link>

                <Link style={navStyle} to="/PathFindingVisualizer">
                    <li>Path-Finding Visualizer</li>
                </Link>
            </ul>

        </nav>
    );
}