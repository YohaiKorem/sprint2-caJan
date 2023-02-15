'use strict'
let gCanvas
let gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onSetCurrImg(imgId){
    setCurrImg(imgId)
}
function renderEditor(){
    const elEditor = document.querySelector('.editor-container')
    const elGalleryContainer = document.querySelector('.gallery-container')
    elEditor.style.display = 'grid'
    elGalleryContainer.style.display = 'none'
    init()
}

function init(){
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    drawCanvas()
    addListeners()
}


function drawCanvas() {
    
    const img = new Image()
    img.src = gCurrImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) 
        

        gMeme.lines.forEach((line, idx) => drawText(line, idx))
        
    }
}

function drawText(line, idx) {
    
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
        gCtx.fillText(txt, x , y) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
    }, 10)
}

// / gCanvas.width + 10

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

function onChangeStrokeColor(strokeColor){
    changeStrokeColor(strokeColor)
    drawCanvas()
}
function onChangeFillColor(fillColor){
    changeFillColor(fillColor)
    drawCanvas()
}

function measureTxt(txt){
    return gCtx.measureText(txt).width
}

function drawRect(x, y, txtWidth, size) {
    gCtx.strokeStyle = 'red'
    if(!txtWidth) txtWidth = 100
    gCtx.strokeRect(x/2, y-size, txtWidth+x, size*2)
  }

  function onRemoveLine(){
    removeLine()
    drawCanvas()
  }

  function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
      init()
    })}


    function addMouseListeners() {
        gCanvas.addEventListener('mousedown', onDown)
        gCanvas.addEventListener('mousemove', onMove)
        gCanvas.addEventListener('mouseup', onUp)
      }
      
      function addTouchListeners() {
        gCanvas.addEventListener('touchstart', onDown)
        gCanvas.addEventListener('touchmove', onMove)
        gCanvas.addEventListener('touchend', onUp)
      }


       function getEvPos(ev) {
        // Gets the offset pos , the default pos
        let pos = {
          x: ev.offsetX,
          y: ev.offsetY,
        }
        // Check if its a touch ev
        if (TOUCH_EVS.includes(ev.type)) {
          //soo we will not trigger the mouse ev
          ev.preventDefault()
          //Gets the first touch point
          ev = ev.changedTouches[0]
          //Calc the right pos according to the touch screen
          pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
          }
        }
        return pos
      }

      function onDown(ev){
        const pos = getEvPos(ev)
const{x,y} = pos
 isOnTxt(x,y)
drawCanvas()
    }

      function onMove(ev){
        if(!gMeme.lines[gMeme.selectedLineIdx].isDrag) return
        const pos = getEvPos(ev)
        const{x,y} = pos
         moveTxt(x,y)
         drawCanvas()
      }
      function onUp(ev){
        const pos = getEvPos(ev)
        const{x,y} = pos
        moveTxt(x,y, 'stop')

      }