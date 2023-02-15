'use strict'

const IMGS_STORAGE_KEY = 'imgsDB'
let gImgs = []

_createImgs()



function _createImgs(){
    let imgs = loadFromStorage(IMGS_STORAGE_KEY)
    if(!imgs){
        imgs=[]
        for(let i = 0; i < 18; i++){
          const img =  _createImg(i)
imgs.push(img)
        }
    }
    gImgs = imgs
}

function _createImg(idx){

return {
id:makeId(),
url: `img/${idx+1}.jpg`,
keyWords: makeTags()
}

}