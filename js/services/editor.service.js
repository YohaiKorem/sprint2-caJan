'use strict'
let gCurrImg
let gMeme



function setCurrImg(imgId){
   const img = getImgById(imgId)
   gCurrImg = img
   setMeme(imgId)
  
}

function setMeme(imgId){
   gMeme = _createMeme(imgId)
}


function _createMeme(id){
  return {
      selectedImgId:id,
      selectedLineIdx: 0,
      lines:[
         {
            txt:'coding academy be like',
            size: 30,
            align: 'left',
            strokeColor: 'black',
            fillColor: 'white',
            font:'impact',
            x: 100,
            y: 50
         },
        { txt:'code a meme generator dude',
         size: 30,
         align: 'left',
         strokeColor: 'black',
         fillColor: 'white',
         font:'impact',
         x: 200,
         y: 250}
      ]
   }
}



function  setTxt(txt){
   const selectedLineIdx = gMeme.selectedLineIdx 
   gMeme.lines[selectedLineIdx].txt = txt
   
}


function getImgById(imgId){
   return gImgs.find(img => img.id === imgId)
}

function selectLine(){
   gMeme.selectedLineIdx++
    if( gMeme.selectedLineIdx >= gMeme.lines.length ) gMeme.selectedLineIdx = 0
}


function addLine(){
   const newLine =_createLine()
   gMeme.lines.push(newLine)
   gMeme.selectedLineIdx = gMeme.lines.indexOf(newLine)
}

function _createLine(){
  return {
      txt:'',
      size: 40,
      align: 'left',
      strokeColor: 'black',
      fillColor: 'white',
      font:'impact',
      x: 200,
      y: 150
   }
}

function fontGrow(){
   gMeme.lines[gMeme.selectedLineIdx].size++
}

function fontShrink(){
   gMeme.lines[gMeme.selectedLineIdx].size--

}
function setTxtAlign(align){
   gMeme.lines[gMeme.selectedLineIdx].align = align
}
function setFont(font){
   gMeme.lines[gMeme.selectedLineIdx].font = font

}

function removeLine(){
   const lineIdx =  gMeme.selectedLineIdx
   gMeme.lines.splice(lineIdx, 1)
   if(!gMeme.lines.length) addLine()
}