const table = document.querySelector("table");
const color = document.querySelector(".color");
const slider = document.querySelector(".slider");
let currentColor = "#000000";

function create(row, col){
    
    for(let i = 1; i <= row; i++){
        const row = document.createElement("tr");
        for(let j = 1; j <= col; j++){
            const col = document.createElement("td");
            col.className = "box";
            row.appendChild(col);
        }
        table.appendChild(row);
    }

    hasChild = true;
    events();
}

function btn(){
    table.innerHTML = "";
    const rowInput = document.querySelector(".r");
    const colInput = document.querySelector(".c");

    const row = rowInput.value;
    const col = colInput.value;

    create(row, col);

    rowInput.value = ""; 
    colInput.value = "";
    slider.value = 20;
}

function events(){
    
    color.addEventListener("change", ()=>{
        currentColor = color.value;
    });

    slider.addEventListener("input", ()=>{
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box)=>{
            box.style.height = `${slider.value}px`;
            box.style.width = `${slider.value}px`;
        })
    });

    
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
}


