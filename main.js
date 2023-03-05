var tool = document.querySelector(".tool");

var color = document.querySelector("#color-paint");
var eraser = document.querySelector("#eraser");
var decrease = document.querySelector("#decrease");
var fontSize = document.querySelector("#fsize span");
var increase = document.querySelector("#increase");
var save = document.querySelector("#save");
var clear = document.querySelector("#clear");
var text = document.querySelector("#text")
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d")

var posBefore ={
    x: 0,
    y: 0
}
var posAfter ={
    x: 0,
    y: 0
}
var isDrawing = false;
var changeColor = 'fffff';
var size = 1;
canvas.addEventListener("mousedown",(e)=>{
    posBefore ={
        x: e.offsetX,
        y: e.offsetY
    }
    console.log('posbefore',posBefore)
    
  isDrawing = true;
})
canvas.addEventListener("mousemove",(e)=>{
   if(isDrawing===true){
    posAfter ={
        x: e.offsetX,
        y: e.offsetY
    }
   
    ctx.beginPath()
    
    ctx.arc(posBefore.x, posBefore.y,size,0, 2 * Math.PI);
    ctx.fillStyle = changeColor;
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(posBefore.x,posBefore.y)
    ctx.lineTo(posAfter.x,posAfter.y)
    ctx.strokeStyle = changeColor
    ctx.lineWidth = size*2;
    ctx.closePath()
    
    ctx.stroke()
    posBefore.x = posAfter.x
    posBefore.y = posAfter.y
   }
   
})
document.addEventListener("mouseup",()=>{
    isDrawing = false;
    isEraser = false
})

color.addEventListener("change",(e)=>{
  eraser.style.backgroundColor = 'white'
    changeColor = e.target.value;
    
})
eraser.addEventListener("click",(e)=>{
   
    eraser.style.backgroundColor = 'rgb(71,189,150)'
    changeColor = 'white';
    canvas.style.cursor ='pointer'
   
})
decrease.addEventListener("click",()=>{
   
  if(size>=1){
    size -=1;
    increase.style.display = 'flex'
    decrease.style.display = 'flex'
  }
  else if(size <=1){
    size =1
    decrease.style.display = 'none'
    increase.style.display = 'flex'
  }
  if(size==1){
    decrease.style.display = 'none'
  }
  fontSize.innerText =size;
})
increase.addEventListener("click",()=>{
   
    if(size>=30){
      size =30;
      increase.style.display = 'none'
      decrease.style.display = 'flex'
    }
    else if(size<=30){
      size +=1
      increase.style.display = 'flex'
      decrease.style.display = 'flex'
    }
    if(size==30){
      increase.style.display = 'none'
    }
    fontSize.innerText=size;
    
})
clear.addEventListener('click',()=>{
    const rect = canvas.getClientRects()[0];
    console.log(rect)
    ctx.clearRect(0,0,rect.width,rect.height)
})
save.addEventListener('click',()=>{
    const imageURI = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
    save.setAttribute('href',imageURI)
})


