'use strict'
let gCanvas
let gCtx

function onSetCurrImg(imgId){
    setCurrImg(imgId)
}
function renderEditor(){
    const elEditor = document.querySelector('.editor-container')
    const elGalleryContainer = document.querySelector('.gallery-container')
    elEditor.classList.toggle('hidden')
    elGalleryContainer.style.display = 'none'
    renderCanvas()
}

function renderCanvas(){
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    drawCanvas()

}


function drawCanvas() {
    
    const img = new Image()
    img.src = gCurrImg.url
    img.onload = () => {
        gMeme.lines.forEach((line, idx) => drawText(line, idx))
        // drawText()
        // gCtx.beginPath()
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) 
        
        //img,x,y,xEnd,yEnd
    }
}

function drawText(line, idx) {
    gCtx.clearRect(0,0, gCanvas.width, gCanvas.height)
    // drawCanvas()
    let {txt, size, align,strokeColor, fillColor,font, x, y} = line
    setTimeout(()=>{
        if(gMeme.selectedLineIdx === idx){
            let txtWidth = measureTxt(txt)
            drawRect(x, y, txtWidth, size)
        }
        gCtx.lineWidth = 2
        gCtx.strokeStyle = strokeColor
        gCtx.fillStyle = fillColor
        gCtx.font = `${size}px ${font}`
        gCtx.textAlign = align
        gCtx.textBaseline = 'middle'
        gCtx.fillText(txt, x / gCanvas.width + 10, y) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(txt, x / gCanvas.width+ 10, y) // Draws (strokes) a given text at the given (x, y) position.
    }, 10)
}

function onAddLine(){
    addLine()
    drawCanvas() 
}


  function onSetTxt(txt){
      setTxt(txt)
drawCanvas()   
 }

function onSelectLine(){
    selectLine()
    drawCanvas()   
}

function onFontGrow(){
    fontGrow()
    drawCanvas()
}

function onFontShrink(){
    fontShrink()
    drawCanvas()
}

function onSetTxtAlign(align){
setTxtAlign(align)
drawCanvas()
}

function onSetFont(font){
setFont(font)
drawCanvas()
}



function measureTxt(txt){
    return gCtx.measureText(txt).width
}

function drawRect(x, y, txtWidth, size) {
    gCtx.strokeStyle = 'red'
    if(!txtWidth) txtWidth = 100
    gCtx.strokeRect(x/txtWidth, y-size, txtWidth*1.05, size*2)
  }

  function onRemoveLine(){
    removeLine()
    drawCanvas()
  }

