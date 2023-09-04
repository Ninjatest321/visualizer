

export class minHeap {

    constructor(array, arrayLength) {
        this.popped = 0;
        this.array = createMinHeap(array, arrayLength);
    }


    pop() {
        let min = this.array[0];

        let temp = this.array[0];
        this.array[0] = this.array[this.array.length-1-this.popped];
        this.array[this.array.length-1-this.popped] = temp;
        this.popped++;
    
        heapify(this.array, 0, this.array.length-this.popped);
        return(min);
    }

}
export function createMinHeap(array, arrayLength) {
    for(let i = Math.floor(arrayLength / 2) - 1; i >= 0; i--) {
        heapify(array, i, arrayLength);
    }
    return array;
}

export function heapify(array, index, length) {
    let min = index;
    let left = 2 * index + 1;
    let right = 2 * index + 2;


    if(left < length && array[left].distance < array[min].distance) {
        min = left;
    }

    if(right < length && array[right].distance < array[min].distance) {
        min = right;
    }

    if (min != index) {
        let temp = array[index];
        array[index] = array[min];
        array[min] = temp;

        heapify(array, min, length);
    }
}

