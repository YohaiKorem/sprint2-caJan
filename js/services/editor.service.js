'use strict'
let gCurrImg
let gMeme



function setCurrImg(imgId){
   const img = getImgById(imgId)
   gCurrImg = img
   getMeme(imgId)
  
}

function getMeme(imgId){

   gMeme = _createMeme(imgId)
}


function _createMeme(id){
  return {
      selectedImgId:id,
      selectedLineIdx: 0,
      lines:[
         {
            txt:'coding academy be like',
            size: 20,
            align: 'left',
            strokeColor: 'black',
            fillColor: 'white',
            font:'impact',
            x: 200,
            y: 50
         }
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