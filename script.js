const table = document.querySelector("table");
const color = document.querySelector(".color");
const slider = document.querySelector(".slider");
const eraser = document.querySelector(".eraser");
const borderless = document.querySelector(".borderless");
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
    eraserEvent();
    rowInput.value = ""; 
    colInput.value = "";
    slider.value = 20;
}

function events(){
    

    const boxes = document.querySelectorAll(".box");

    color.addEventListener("change", ()=>{
        currentColor = color.value;
    });

    slider.addEventListener("input", ()=>{
        boxes.forEach((box)=>{
            box.style.height = `${slider.value}px`;
            box.style.width = `${slider.value}px`;
        })
    });

    
    boxes.forEach(element => {
        element.addEventListener("click", ()=>{
            element.style.backgroundColor = currentColor;
            element.style.borderColor = currentColor;
        });

        element.addEventListener("contextmenu", (event)=>{
            event.preventDefault();
            element.style.backgroundColor = "transparent";
            element.style.borderColor = "#fff";
            isright = true;
        });

        
    });
    holding();

}
let isHolding = false;
let isright = false;
let isSpacebarHeld = false;

function holding() {
    const boxes = document.querySelectorAll(".box");

    // Paint handler defined once per box
    boxes.forEach(element => {
        function paint() {
            if (isHolding) {
                element.style.backgroundColor = currentColor;
                element.style.borderColor = currentColor;
            }

            if (isSpacebarHeld) {
                element.style.backgroundColor = "transparent";
                element.style.borderColor = "#fff";
            }

        }

        element.addEventListener("mouseover", paint);
    });

    // Just toggle the flag on hold
    table.addEventListener('mousedown', (event) => {
        if (event.button === 0) {
            isHolding = true;
        } else if (event.button === 2) {
            isright = true;
        }
    });

    table.addEventListener('mouseup', () => {
        isHolding = false;
        isright = false;
    });

    table.addEventListener('mouseleave', () => {
        isHolding = false;
        isright = false;
    });

    // Spacebar hold detection
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            isSpacebarHeld = true;
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            isSpacebarHeld = false;
        }
    });
}

function eraserEvent(){
    
    const boxes = document.querySelectorAll(".box");
    eraser.addEventListener("click", ()=>{
        boxes.forEach(element =>{
            element.style.backgroundColor = "transparent";
            element.style.borderColor = "#fff";
            borderless.classList.add("highlight");
            table.classList.remove("disabled");
        }) 
    });
}

let visibleBorder = true;
borderless.addEventListener("click", ()=>{
    
    const boxes = document.querySelectorAll(".box");
	if(visibleBorder){
		visibleBorder = false;
        borderless.classList.remove("highlight");
        table.classList.add("disabled");
		boxes.forEach(element =>{
			if(element.style.backgroundColor === "" || element.style.backgroundColor === "transparent"){
				element.style.borderColor = "transparent";
			}	
		});

    }
    else{
		visibleBorder = true;
        borderless.classList.add("highlight");
        table.classList.remove("disabled");
		boxes.forEach(element =>{
			if(element.style.backgroundColor === "" || element.style.backgroundColor === "transparent"){
				element.style.borderColor = "#fff";
			}
			else{
				element.style.borderColor = element.style.backgroundColor;
			}
		});
	}
});
