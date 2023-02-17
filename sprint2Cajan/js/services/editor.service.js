'use strict'
let gCurrImg
let gMeme
const MEMES_STORAGE_KEY = 'memesDB'



function setCurrImg(imgId){
   const img = getImgById(imgId)
   gCurrImg = img
   if(gMeme)  return
   
   setMeme(imgId)
}

function setMeme(imgId){
   if(gMeme)  return
   gMeme = _createMeme(imgId)
}
function newMeme(){

   gMeme = null
   gCurrImg = null
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
            x: 50,
            y: 50,
            isDrag: false
         },
        { txt:'code a meme generator dude',
         size: 30,
         align: 'left',
         strokeColor: 'black',
         fillColor: 'white',
         font:'impact',
         x: 50,
         y: 250,
         isDrag: false}
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

function selectLine(line, idx){
   if(!line){

      gMeme.selectedLineIdx++
      if( gMeme.selectedLineIdx >= gMeme.lines.length ) gMeme.selectedLineIdx = 0
      return
   }
   gMeme.selectedLineIdx = idx
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
      y: 150,
      isDrag: false
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
function changeStrokeColor(strokeColor){
   gMeme.lines[gMeme.selectedLineIdx].strokeColor = strokeColor
   
}

function  changeFillColor(fillColor){
   gMeme.lines[gMeme.selectedLineIdx].fillColor = fillColor

}
function removeLine(){
   const lineIdx =  gMeme.selectedLineIdx
   gMeme.lines.splice(lineIdx, 1)
   if(!gMeme.lines.length) addLine()
}
function isOnTxt(x,y){
   gMeme.lines.forEach((line, idx) =>{
      let txtWidth =  measureTxt(line.txt)
    if(  line.x <= x && 
      txtWidth+line.x >= x &&
      line.y-line.size <= y &&
       line.y + line.size >= y)  {
         selectLine(line,idx)
       line.isDrag = true
      }

      //  gMeme.selectedLineIdx = gMeme.lines.indexOf(line)
   //  , y-size, txtWidth*1.05, size*2
   // && line.y-line.size/2 < y && y+ line.size*2 > y 
})

}


function moveTxt(x,y, action){
   gMeme.lines.forEach(line =>{
      if(!line.isDrag)return
      line.x = x;
      line.y = y;
      (action === 'stop') ? line.isDrag = false : line.isDrag = true
   })
}

function save(){
   _saveMemeToStorage(gMeme)
}



function setCustomImg(){

}


function _saveMemeToStorage(val){
   saveToStorage(MEMES_STORAGE_KEY , val)
}
function loadSavedMeme(){
   gMeme = loadFromStorage(MEMES_STORAGE_KEY)
}