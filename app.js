const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // pixel control. in this case: 2d
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";

canvas.width = 700; // canvas width select
canvas.height = 700;// canvas height select

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle = INITIAL_COLOR; // line color select
ctx.fillStyle = INITIAL_COLOR; // fill color select
ctx.lineWidth = 2.5; // canvas 2.5px lineWidth

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting){
        ctx.beginPath(); // if we don't hold mouse, path(path is line. everytime we move mouse, path is created. )
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y); // previous x,y position ~ current x,y position make line
        ctx.stroke(); // fills the current sub-path with the current fill style.
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if (filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if (filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

function handleCM(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}
Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if (range){
    range.addEventListener("input",handleRangeChange);
}
if (mode){
    mode.addEventListener("click",handleModeClick);
}
if (saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}