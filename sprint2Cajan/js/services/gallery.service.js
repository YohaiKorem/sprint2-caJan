'use strict'

const IMGS_STORAGE_KEY = 'imgsDB'
let gSearchFor
let gImgs = []
let TAGS_PAGE_SIZE = 5
let gTagsPageIdx = 0
let gDisplayTags = 'more'
// let gTags = getAllTags()
_createImgs()


function getImgsForDisplay(){
// gImgs.forEach(img => console.log(img.keyWords))
    // gImgs.filter(img =>{
    //     img.keyWords
    // })
}





function getTagsForDisplay(){
    let tags = getTagsMap()
    console.log(tags);
    let startIdx = gTagsPageIdx * TAGS_PAGE_SIZE
    return tags.slice(startIdx, startIdx + TAGS_PAGE_SIZE)
}

function getAllTagsFromGImgs(){
    return  gImgs.map( img=>{
        return img.keyWords
               })
                
}

function getTagsMap(){
       let tags = getAllTagsFromGImgs()
  
   const tagsMap = tags.map(tag => {return tag =  {tag, wordCount:0}})
const keyWords = gImgs.reduce((arr,img) =>{
    arr.push(img.keyWords)
    return arr
},[])
keyWords.forEach(word =>{
    tagsMap.forEach(tag =>{
        if(tag.tag === word) tag.wordCount++
    })
})
return tagsMap
}


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


function  searchTag(str){
    gSearchFor = str
}

function moreTags(){
    (gDisplayTags === 'more') ? gDisplayTags = 'less' : gDisplayTags = 'more'
    TAGS_PAGE_SIZE += 5
    if(TAGS_PAGE_SIZE >= 15) TAGS_PAGE_SIZE = 5
    console.log(TAGS_PAGE_SIZE);
}

function getGDisplay(){
    return gDisplayTags
}