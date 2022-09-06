const container = document.querySelector(".container");
const btnGrid = document.querySelector(".new-grid");
let draw = false;

function createGrid(boxes) {
    for (let i = 0; i < boxes; i++) {
        const grid = document.createElement("div");
        for (let j = 0; j < boxes; j++) {
            const box = document.createElement("div");
            box.classList.add("box");
            box.style.width = `${container.offsetWidth / boxes}px`;
            box.style.height = `${container.offsetHeight / boxes}px`;
            grid.appendChild(box);
            box.addEventListener("mouseover", () => {
                if (!draw) return;
                box.style.backgroundColor = "black";
            });
            box.addEventListener("mousedown", () => {
                clearSelection();
                box.style.backgroundColor = "black";
            })
        }
        container.appendChild(grid);
    }
}

createGrid(30);

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
}

function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}

document.body.addEventListener("mousedown", () => draw = true);
document.body.addEventListener("mouseup", () => draw = false)
btnGrid.addEventListener("click", newGrid);