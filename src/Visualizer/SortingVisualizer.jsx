import React from 'react';
import './SortingVisualizer.css';
import { bubbleSortAnimations, selectionSortAnimations, mergeSortAnimations, insertionSortAnimations, quicksortAnimations } from './sortAlgorithms/sortAlgorithms';

const ANIMATION_SPEED = 1;
const SIZE = 100;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
    

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < SIZE; i++) {
            array.push(randomNumberFromInterval(10,500))
        }
        this.setState({array});
    }

    insertionSort() {
        //Throws an error randomly but works
        const animations = insertionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const swapping = i % 4 !== 0 && i % 4 !== 1 
            if (!swapping) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const color = i % 4 === 0 ? 'red' : 'lightskyblue'
                setTimeout(() => {
                    bars[barOneIndex].style.backgroundColor = color;
                    bars[barTwoIndex].style.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    bars[barOneIndex].style.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }

    }
}

    mergeSort() {
        const animations = mergeSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');

            const colorChanging = i % 3 !== 2;

            //Changing Color
            if(colorChanging) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const color = i % 3 === 0 ? 'red' : 'lightskyblue'
                setTimeout(() => {
                    bars[barOneIndex].style.backgroundColor = color;
                    bars[barTwoIndex].style.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } 
            //
            else {
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    bars[barOneIndex].style.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
        }
    }

    selectionSort() {
        const animations = selectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');

            if(animations[i][0] === "swap")
            {
                setTimeout(() => {
                    const [state, barOneIndex, newHeight] = animations[i];
                    bars[barOneIndex].style.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
            //Changing color
            else {
                const[state, barOneIndex, barTwoIndex] = animations[i];
                const color = i % 2 === 0 ? 'red' : 'lightskyblue'
                setTimeout(() => {
                    bars[barOneIndex].style.backgroundColor = color;
                    bars[barTwoIndex].style.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            }
        }
    }

    quickSort() {
        const animations = quicksortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            if (animations[i][0] === 'ColorOn') {
                const barIndex = animations[i][1];
                const color = 'red'; 
                setTimeout(() => {
                    bars[barIndex].style.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            }
            else if(animations[i][0] === 'ColorOff') {
                const barIndex = animations[i][1];
                const color = 'lightskyblue';
                setTimeout(() => {
                    bars[barIndex].style.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            }  
            else if (animations[i][0] === "PivotOn") {
                const barIndex = animations[i][1];
                const color = 'lightgreen';
                setTimeout(() => {
                    bars[barIndex].style.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            }
            else if (animations[i][0] === 'PivotOff') {
                const barIndex = animations[i][1];
                const color = 'lightskyblue';
                setTimeout(() => {
                    bars[barIndex].style.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            }
            else {
                setTimeout(() => {
                    const [barIndex, newHeight] = animations[i];
                    bars[barIndex].style.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
            
        }
    }

    bubbleSort() {
        const animations = bubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const swapping = i % 4 !== 0 && i % 4 !== 1 
            if (!swapping) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const color = i % 4 === 0 ? 'red' : 'lightskyblue';
                setTimeout(() => {
                    bars[barOneIndex].style.backgroundColor = color;
                    bars[barTwoIndex].style.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    bars[barOneIndex].style.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }

        }
    }


    render() {
        const {array} = this.state;

        return (
            <div>
            <div className="array-container">
            {array.map((value,idx) => (
                <div 
                className="bar" 
                key = {idx}
                style={{height:(`${value}px`)}}>
                    
                </div>
            ))}
            </div>
            
                <button 
                style={{
                    display: 'inline-block', 
                    marginTop: 750}}
                onClick={() => this.resetArray()} >
                Generate Array
                </button>

                <button 
                style={{
                    display: 'inline-block', 
                    marginTop: 750}}
                onClick={() => this.selectionSort()} >
                Selection Sort
                </button>

                <button 
                style={{
                    display: 'inline-block', 
                    marginTop: 750}}
                onClick={() => this.insertionSort()} >
                Insertion Sort
                </button>

                <button 
                style={{
                    display: 'inline-block', 
                    marginTop: 750}}
                onClick={() => this.bubbleSort()} >
                Bubble Sort
                </button>

                <button 
                style={{
                    display: 'inline-block', 
                    marginTop: 750}}
                onClick={() => this.mergeSort()} >
                Merge Sort
                </button>

                <button 
                style={{
                    display: 'inline-block', 
                    marginTop: 750}}
                onClick={() => this.quickSort()} >
                Quick Sort
                </button>

                <button 
                style={{
                    display: 'inline-block', 
                    marginTop: 750}}
                onClick={() => arraysAreEqual(this.state.array, this.state.array.sort())} >
                Check Sort
                </button>

            </div>
        );

    }
}

function randomNumberFromInterval(min, max) {
    return Math.floor(Math.random() *  (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        console.log(false);
        return false;
      }
    }
    console.log(true);
    return true;
  }