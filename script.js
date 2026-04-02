// Global variable
const MIN_SIZE = 16;
const MAX_SiZE = 100;
const MAX_RGB = 255;
const MIN_RGB = 0;
const gridContainer = document.getElementById("container-grid");
let currentMode = "paint";
let gridSize;

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

function getRandomRgb() {
    const r = Math.floor(Math.random() * (MAX_RGB + 1));
    const g = Math.floor(Math.random() * (MAX_RGB + 1));
    const b = Math.floor(Math.random() * (MAX_RGB + 1));
    const rgbValue = `rgb(${r}, ${g}, ${b})`
    return rgbValue;
}

function darkenColor(rgbColor) {
    let [r, g, b] = rgbColor.match(/\d+/g).map(Number);
    const DARKEN = 20;
    r -= DARKEN;
    g -= DARKEN;
    b -= DARKEN;

    if(r < MIN_RGB) r = MIN_RGB;
    if(g < MIN_RGB) g = MIN_RGB;
    if(b < MIN_RGB) b = MIN_RGB;
    
    const rgbString = `rgb(${r}, ${g}, ${b})`
    return rgbString;
}

// modying grid element's background color
gridContainer.addEventListener("mouseover", (e) => {
    if(e.target.id === "grid-element"){
        let currentColor = window.getComputedStyle(e.target).backgroundColor;

        if(currentMode === "paint"){
            if(currentColor === "rgba(0, 0, 0, 0)" || currentColor === "rgb(255, 255, 255)" || currentColor === "transparent") e.target.style.backgroundColor  = getRandomRgb();
            else {e.target.style.backgroundColor = darkenColor(currentColor);}
        }
        else if(currentMode === "erase") {
            e.target.style.backgroundColor  = "white";
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
