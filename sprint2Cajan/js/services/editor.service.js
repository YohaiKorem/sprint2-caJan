'use strict'
let gCurrImg
let gMeme
const MEMES_STORAGE_KEY = 'memesDB'
let gAllEmojiCharacters 
const EMOJI_PAGE_SIZE = 8
let gEMojisPageIdx = 0


fetch('https://emoji-api.com/emojis?access_key=38fb8f8378ed75a2a00afee212f440bd1d4d4a3e')
.then(res => res.json())
.then(data => loadEmoji(data))

function changeEmojiPageIdx(changeIdxBy){
gEMojisPageIdx += changeIdxBy
if(gEMojisPageIdx <= 0) return
}

function getEmojisForDisplay(){
   let emojis = gAllEmojiCharacters
   let startIdx = gEMojisPageIdx * EMOJI_PAGE_SIZE
   return emojis.slice(startIdx, startIdx + EMOJI_PAGE_SIZE) 
 }
 
function loadEmoji(data){
   gAllEmojiCharacters = data.map(emoji =>{
  return emoji.character
 })
 }

function setCurrImg(imgId){
   const img = getImgById(imgId)
   gCurrImg = img
   if(gMeme)  return
   setMeme(imgId)
}

function setMeme(imgId){
   if(gMeme)  return
   (gFlex) ? gMeme = getRandomMeme(imgId) : gMeme = _createMeme(imgId)
}
function newMeme(){
   gMeme = null
   gCurrImg = null
}

function getRandomMeme(id){
let numOfLines = getRandomIntInclusive(1,2)
   return {
      selectedImgId:id,
      selectedLineIdx: 0,
      lines: (numOfLines === 1) ? [getRandomLine(150)] : [getRandomLine(150), getRandomLine(300)]
   }
}

function getRandomLine(y){
   return {
      txt:makeRandomMemeLines(),
      size: getRandomIntInclusive(20,50),
      align: 'left',
      strokeColor: getRandomColor(),
      fillColor: getRandomColor(),
      font:getRandomFont(),
      x: 200,
      y,
      isDrag: false
   }
}

function _createMeme(id){
  return {
      selectedImgId:id,
      selectedLineIdx: 0,
      lines:[
         {
            txt:'coding academy be like',
            size: 40,
            align: 'left',
            strokeColor: 'black',
            fillColor: 'white',
            font:'impact',
            x: 50,
            y: 50,
            isDrag: false
         },
        { txt:'code a meme generator dude',
         size: 40,
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

function _createLine(){
   return {
       txt:'',
       size: 20,
       align: 'left',
       strokeColor: 'black',
       fillColor: 'white',
       font:'impact',
       x: 200,
       y: 150,
       isDrag: false
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
   // console.log(x,y);
   gMeme.lines.forEach((line, idx) =>{
      let txtWidth =  measureTxt(line.txt)
      console.log('touched y', y);
      // console.log(`${idx} size`, line.size);
      console.log(`${idx} line.y`, line.y);

     if( line.x/2 <= x && 
      txtWidth+line.x + 30 >= x && line.y<= y &&
        line.y + line.size*2 >= y ) 
      
      {
         //  console.log('in Y');
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

function _saveMemeToStorage(val){
   saveToStorage(MEMES_STORAGE_KEY , val)
}
function loadSavedMeme(){
   gMeme = loadFromStorage(MEMES_STORAGE_KEY)
}


