export function bubbleSortAnimations(array) {
    let animations = [];
    let i, j;
        for(i = 0; i < array.length-1; i++)
            for(j = 0; j < array.length-i-1; j++)
            {
                animations.push([j, j+1])
                animations.push([j, j+1])
                if (array[j] > array[j+1])
                {
                    animations.push([j,array[j+1]]);
                    animations.push([j+1, array[j]]);

                    let temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;

                }
                else {
                    animations.push([j,array[j]])
                    animations.push([j+1, array[j+1]])
                }
            }

    return animations;
}

export function insertionSortAnimations(array) {
    let animations = [];

    let i, j;
    for(i = 1; i < array.length; i++)
    {
        let value = array[i];
        j = i - 1;

        while(j >= 0 && array[j] > value) {
            animations.push([j, j+1]);
            animations.push([j, j+1]);

            animations.push([j+1, array[j]]);
            animations.push([j, array[j+1]]);
            
            let temp = array[j+1];
            array[j+1] = array[j];
            array[j] = temp;
            j--;
        }
        animations.push([j, j+1]);
        animations.push([j, j+1]);

        animations.push([[j+1], value]);
        animations.push([[j+1], value]);
        array[j+1] = value;
    }
    return animations;
}



export function selectionSortAnimations(array) {
    let animations = [];

    let i, j, min_index;
    for(i = 0; i < array.length; i++)
    {
        min_index = i;
        
        for(j = i; j < array.length; j++) {
            animations.push(["colorOn", j, min_index])
            animations.push(["colorOff", j, min_index])
            if(array[j] < array[min_index]) {
                min_index = j;
            }
        }
        if(min_index != i) {
            animations.push(["swap", i,array[min_index]]);
            animations.push(["swap", min_index, array[i]]);

            let temp = array[min_index];
            array[min_index] = array[i];
            array[i] = temp;
        }
    }
    return animations;
}

export function mergeSortAnimations(array) {
    const animations = [];
    const fakeArray = array.slice();
    mergeSortHelper(array, fakeArray, 0, array.length-1, animations);
    return animations;
}


function mergeSortHelper(mainArray, fakeArray, left, right, animations) {

    if (left === right) {
        return;
    }

    const mid = Math.floor((left + right) / 2);
    mergeSortHelper(fakeArray, mainArray, left, mid, animations);
    mergeSortHelper(fakeArray, mainArray, mid + 1, right, animations);
    merge(mainArray, fakeArray, left, mid, right, animations);

}

function merge(mainArray, fakeArray, left, mid, right, animations) {

    let i = left;
    let j = mid + 1;
    let k = left;

    while(i <= mid && j <= right)
    {
        animations.push([i, j])

        animations.push([i, j])

        if(fakeArray[i] <= fakeArray[j])
        {
            animations.push([k, fakeArray[i]]);
            mainArray[k] = fakeArray[i];
            i++;
        }
        else {
            animations.push([k, fakeArray[j]]);
            mainArray[k] = fakeArray[j];
            j++;
        }
        k++;
    }

    while(i <= mid) {
        animations.push([i, i])
        animations.push([i, i])
        animations.push([k, fakeArray[i]]);

        mainArray[k] = fakeArray[i];
        k++;
        i++;
    }

    while(j <= right) {
        animations.push([j, j])
        animations.push([j, j])
        animations.push([k, fakeArray[j]])
        
        mainArray[k] = fakeArray[j];
        k++;
        j++;
    }
}

export function quicksortAnimations(array) {
    let animations = [];
    quicksortHelper(array, 0, array.length-1, animations);
    return animations;

}

function quicksortHelper(array, low, high, animations) {
    let mid;
    if (array.length > 1) {
        let mid = partition(array, low, high, animations);
        if(low < mid - 1) {
            quicksortHelper(array, low, mid - 1, animations);
        }
        if(high > mid) {
            quicksortHelper(array, mid, high, animations);
        }
    }
    return array;

}

function partition(array, low, high, animations) {
    let pivot = array[Math.floor((low + high) / 2)];
    animations.push(["PivotOn", Math.floor((low + high) / 2)]);

    let i = low;
    let j = high;
    while(i <= j) {
        while (array[i] < pivot) {
            animations.push(["ColorOn", i]);
            animations.push(["ColorOff", i]);
            i++;
        }
        animations.push(["ColorOn", i]);

        while (array[j] > pivot) {
            animations.push(["ColorOn", j]);
            animations.push(["ColorOff", j]);
            j--;
        }
        animations.push(["ColorOn", j]);

        animations.push(["ColorOff", i]);
        animations.push(["ColorOff", j]);

        if (i <= j) {


            animations.push([j, array[i]]);
            animations.push([i, array[j]]);
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            i++;
            j--;
        }
    }

    animations.push(["PivotOff", Math.floor((low + high) / 2)]);
    return i;
}