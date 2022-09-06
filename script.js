const container = document.querySelector(".container");
const color = document.querySelector(".input-color");
const btnChoose = document.querySelector(".choose");
const btnGrid = document.querySelector(".new-grid");
const btnClear = document.querySelector(".clear");
const btnEraserOn = document.querySelector(".eraser-ON");
const btnEraserOff = document.querySelector(".eraser-OFF");
const btnGridOff = document.querySelector(".grid-OFF");
const btnGridOn = document.querySelector(".grid-ON");
const btnRandom = document.querySelector(".random");
let draw = false;
let currentSize;

// mouseover sketch color
function mouseOverSketch() {
    if (!draw) return;
    this.style.backgroundColor = color.value;
};

// mousedown sketch color
function mouseDownSketch() {
    // deselecting on mousedown
    clearSelection();
    this.style.backgroundColor = color.value;
};

// mouseover erase color
function mouseOverErase() {
    if (!draw) return;
    this.style.backgroundColor = "white";
}

// mousedown erase color
function mouseDownErase() {
    clearSelection();
    this.style.backgroundColor = "white";
}

// mouseover randomized
function mouseOverRandom() {
    if (!draw) return;
    this.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// mousedown randomized
function mouseDownRandom() {
    clearSelection();
    this.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// set mouseover current function
let currentFunctionOver = mouseOverSketch;

// set mousedown current function
let currentFunctionDown = mouseDownSketch;

// create grid and click to sketch
function createGrid(boxes) {
    for (let i = 0; i < boxes; i++) {
        const grid = document.createElement("div");
        for (let j = 0; j < boxes; j++) {
            const box = document.createElement("div");
            box.setAttribute("data-type", "box");
            box.classList.add("box");
            box.style.width = `${container.offsetWidth / boxes}px`;
            box.style.height = `${container.offsetHeight / boxes}px`;
            grid.appendChild(box);
            box.addEventListener("mouseover", currentFunctionOver);
            box.addEventListener("mousedown", currentFunctionDown);
        }
        container.appendChild(grid);
    }
    return currentSize = boxes;
};

// function to deselect everything
function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
};

// initialize on page load
createGrid(30);

// prompt to create new grid size
function newGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };
    let gridSize = prompt("Please enter your desired size of grid (between 1 - 100).");
    if (gridSize < 1 || gridSize > 100) {
        alert("Please enter a valid size!");
        newGrid();
    } else {
        createGrid(gridSize);
    }
};

// clear grid
function clear() {
    container.innerHTML = "";
    createGrid(currentSize);
};

document.body.addEventListener("mousedown", () => draw = true);
document.body.addEventListener("mouseup", () => draw = false)
btnGrid.addEventListener("click", newGrid);
btnClear.addEventListener("click", clear);
// toggle eraser on
btnEraserOn.addEventListener("click", () => {
    btnEraserOff.classList.remove("pressed");
    btnEraserOn.classList.add("pressed");
    const createdBoxes = document.querySelectorAll("[data-type=box]");
    for (let i = 0; i < createdBoxes.length; i++) {
        createdBoxes[i].removeEventListener("mouseover", currentFunctionOver);
        createdBoxes[i].addEventListener("mouseover", mouseOverErase);
        createdBoxes[i].removeEventListener("mousedown", currentFunctionDown);
        createdBoxes[i].addEventListener("mousedown", mouseDownErase);
    }
    currentFunctionOver = mouseOverErase;
    currentFunctionDown = mouseDownErase;
});
// toggle eraser off
btnEraserOff.addEventListener("click", () => {
    btnEraserOn.classList.remove("pressed");
    btnEraserOff.classList.add("pressed");
    const createdBoxes = document.querySelectorAll("[data-type=box]");
    for (let i = 0; i < createdBoxes.length; i++) {
        createdBoxes[i].removeEventListener("mouseover", currentFunctionOver);
        createdBoxes[i].addEventListener("mouseover", mouseOverSketch);
        createdBoxes[i].removeEventListener("mousedown", currentFunctionDown);
        createdBoxes[i].addEventListener("mousedown", mouseDownSketch);
    }
    btnRandom.classList.remove("pressed");
    btnChoose.classList.add("pressed");
    currentFunctionOver = mouseOverSketch;
    currentFunctionDown = mouseDownSketch;
});
// toggle grid line off
btnGridOff.addEventListener("click", () => {
    btnGridOn.classList.remove("pressed");
    btnGridOff.classList.add("pressed");
    const createdBoxes = document.querySelectorAll("[data-type=box]");
    for (let i = 0; i < createdBoxes.length; i++) {
        createdBoxes[i].classList.remove("box");
    }
});
// toggle grid line on
btnGridOn.addEventListener("click", () => {
    btnGridOff.classList.remove("pressed");
    btnGridOn.classList.add("pressed");
    const createdBoxes = document.querySelectorAll("[data-type=box]");
    for (let i = 0; i < createdBoxes.length; i++) {
        createdBoxes[i].classList.add("box");
    }
});
// color randomized
btnRandom.addEventListener("click", () => {
    btnChoose.classList.remove("pressed");
    btnRandom.classList.add("pressed");
    const createdBoxes = document.querySelectorAll("[data-type=box]");
    for (let i = 0; i < createdBoxes.length; i++) {
        createdBoxes[i].removeEventListener("mouseover", currentFunctionOver);
        createdBoxes[i].addEventListener("mouseover", mouseOverRandom);
        createdBoxes[i].removeEventListener("mousedown", currentFunctionDown);
        createdBoxes[i].addEventListener("mousedown", mouseDownRandom);
    }
    currentFunctionOver = mouseOverRandom;
    currentFunctionDown = mouseDownRandom;
});
// choose color
btnChoose.addEventListener("click", () => {
    btnRandom.classList.remove("pressed");
    btnChoose.classList.add("pressed");
    const createdBoxes = document.querySelectorAll("[data-type=box]");
    for (let i = 0; i < createdBoxes.length; i++) {
        createdBoxes[i].removeEventListener("mouseover", currentFunctionOver);
        createdBoxes[i].addEventListener("mouseover", mouseOverSketch);
        createdBoxes[i].removeEventListener("mousedown", currentFunctionDown);
        createdBoxes[i].addEventListener("mousedown", mouseDownSketch);
    }
    currentFunctionOver = mouseOverSketch;
    currentFunctionDown = mouseDownSketch;
})