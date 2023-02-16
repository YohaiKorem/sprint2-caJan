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
let allTags = getAllTagsFromGImgs()
console.log(allTags);
let newTags = allTags.filter(tag =>{
   return tag.includes(gSearchFor)
})
let imgs = gImgs.filter((img, idx) =>{
    return img.keyWords === newTags[idx]
})
if(!imgs.length) return gImgs
return imgs
}





function getTagsForDisplay(){
    let tags = getTagsMap()
    let wordMap = []
    let res = tags.forEach(tag =>{
      for(let property in tag){
let value = tag[property]

     if (typeof value === 'string') wordMap.push(value);
      }
    })
       
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
   let keyWords = gImgs.reduce((tags,img) =>{
       tags.push(img.keyWords)
       return tags
    },[])
   
    let newWordMap = []
    keyWords.forEach(word =>{
        tagsMap.forEach(tagObj =>{
            let {tag, wordCount} = tagObj
            if(tag === word) {
                tagObj.wordCount++;
                
            }
            
            if(word === tag){
                newWordMap.push(tagObj)
            }
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
}

function getGDisplay(){
    return gDisplayTags
}