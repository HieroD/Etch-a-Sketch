// Global variable
const MIN_SIZE = 16;
const MAX_SiZE = 100;
const gridContainer = document.getElementById("container-grid");
let gridSize;
let currentMode = "paint";


function createGridElements() {
    const inputNumber = document.getElementsByName("grid")[0];
    gridSize = inputNumber.valueAsNumber

    if(gridSize < MIN_SIZE) gridSize = MIN_SIZE;
    if(gridSize > MAX_SiZE) gridSize = MAX_SiZE;

    let gridCount = gridSize * gridSize;

    gridContainer.innerHTML = "";
    let gridWidth = gridContainer.offsetWidth / gridSize;
    let gridHeight = gridContainer.offsetHeight / gridSize;

    for(let i = 0; i < gridCount; i++) {
        const gridElement = document.createElement("div");
        gridElement.id = "grid-element";
        gridElement.style.flex = `0 0 ${100 / gridSize}%`; 
        gridElement.style.height = `${100 / gridSize}%`;
        gridElement.style.border = "1px solid grey";
        gridElement.style.boxSizing = "border-box";

        gridContainer.appendChild(gridElement);
    }
    
}

// modying grid element's background color
gridContainer.addEventListener("mouseover", (e) => {
    if(e.target.id === "grid-element"){
        if(currentMode === "paint"){
            e.target.style["background-color"] = "black";
        } 
        else if(currentMode === "erase") {
            e.target.style["background-color"] = "white";
        }
        else if (currentMode === "view"){}
    }
});

let applyBtn = document.getElementById("apply-btn");
applyBtn.addEventListener("click", createGridElements);

let paintBtn = document.getElementById("paint-btn")
paintBtn.addEventListener("click", () => currentMode = "paint");

let eraseBtn = document.getElementById("erase-btn");
eraseBtn.addEventListener("click", () => currentMode = "erase");

let viewBtn = document.getElementById("view-btn");
viewBtn.addEventListener("click", () => currentMode = "view");
