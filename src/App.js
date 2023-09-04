import React from 'react'
import './App.css';
import SortingVisualizer from './Visualizer/SortingVisualizer';
import PathFindingVisualizer from './Visualizer/PathFindingVisualizer/PathFindingVisualizer';
import {BrowserRouter} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Nav from './nav';
import './nav.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Nav />
        {/* <SortingVisualizer></SortingVisualizer>
        <PathFindingVisualizer></PathFindingVisualizer> */}
        <Routes>
          <Route path="/SortingVisualizer" element={<SortingVisualizer />} />
          <Route path="/PathFindingVisualizer" element={<PathFindingVisualizer />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
