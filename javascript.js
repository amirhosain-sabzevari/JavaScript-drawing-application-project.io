'use strict';




const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const brosh_width = document.querySelector('#brosh_width');
const color_picker = document.querySelector('#color_picker');
const brosh = document.querySelector('.brosh');
const eraser = document.querySelector('.eraser');
const clear = document.querySelector('.clear');
const save = document.querySelector('.save');


let isDraving = false;
let currenWidth = 5;
let currenColor = '';

window.addEventListener('load' , ()=> {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight;
})

function startDraw(){
    isDraving = true
    ctx.beginPath();
    ctx.lineWidth = currenWidth;
}

function drawing(e) {
    if (!isDraving) {
        return 
    }
    ctx.lineTo(e.offsetX , e.offsetY)
    ctx.strokeStyle = `${currenColor}`;
    ctx.stroke()
}
function endDeaw() {
    isDraving = false
}
canvas.addEventListener('mousedown' , startDraw);
canvas.addEventListener('mousemove' , drawing)
canvas.addEventListener('mouseup' , endDeaw);


brosh_width.addEventListener('change' , ()=>{
    currenWidth = brosh_width.value
})

color_picker.addEventListener('change' , ()=>{
    currenColor = color_picker.value
})


eraser.addEventListener('click' , ()=> {
    eraser.classList.add('active')
    brosh.classList.remove('active')
    currenColor = 'white';
})

brosh.addEventListener('click' , ()=> {
    brosh.classList.add('active')
    eraser.classList.remove('active')
    currenColor = color_picker.value;
});

clear.addEventListener('click' , ()=> {
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width ,canvas.height);
});

save.addEventListener('click' , ()=> {
    let link = document.createElement('a');
    link.download = `${Date.now()} .jpg`;
    link.href = canvas.toDataURL();
    link.click();
})