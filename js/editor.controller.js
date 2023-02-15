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
    drawImgFromlocal()
}


function drawImgFromlocal() {
    const img = new Image()
    img.src = gCurrImg.url
    img.onload = () => {
      gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xEnd,yEnd
    }
  }

  function drawText() {
    gCtx.beginPath()
    const {txt, size, align,strokeColor, fillColor,font, x, y} = gMeme.lines[gMeme.selectedLineIdx]
    console.log(size);
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size} ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
  
    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
  }

 function onSetTxt(txt){
    setTxt(txt)
    drawText()
 }