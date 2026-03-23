let hasChild = false;
function create(gridSize, canvas){
    for(let i = 0; i < gridSize; i++){
        const box = document.createElement("div");
        box.classList.add("box");
        canvas.appendChild(box);
    }

    const boxes = document.querySelectorAll(".box");
    boxes.forEach(element => {
        element.addEventListener("click", ()=>{
            element.style.backgroundColor = currentColor;
            element.style.borderColor = currentColor;
        });

        element.addEventListener("contextmenu", (event)=>{
            event.preventDefault();
            element.style.backgroundColor = "#ffffff";
            element.style.borderColor = "#000000";
        })
    });

    hasChild = true;
}

function btn(){
    const canvas = document.querySelector(".canvas");
    const rowInput = document.querySelector(".r");
    const colInput = document.querySelector(".c");

    const row = rowInput.value;
    const col = colInput.value;

    const gridSize = row * col;
    
    canvas.style.gridTemplateColumns = `repeat(${col}, auto)`;
    
    if(hasChild){
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box)=>{
            canvas.removeChild(box);
        })
    }

    create(gridSize, canvas);

    rowInput.value = " "; 
    colInput.value = " ";
    slider.value = 20;
}

const color = document.querySelector(".color");
let currentColor = "#000000";
color.addEventListener("change", ()=>{
    currentColor = color.value;
});

const slider = document.querySelector(".slider");
slider.addEventListener("input", ()=>{
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box)=>{
        box.style.height = `${slider.value}px`;
    })
});

