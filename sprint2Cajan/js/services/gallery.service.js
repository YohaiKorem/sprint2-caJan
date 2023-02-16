'use strict'

const IMGS_STORAGE_KEY = 'imgsDB'
let gSearchFor
let gImgs = []
let gTags
let TAGS_PAGE_SIZE = 5
let gTagsPageIdx = 0
let gDisplayTags = 'more'
// let gTags = getAllTags()
_createImgs()


function getImgsForDisplay(){
let allTags = getAllTagsFromGImgs()
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
//     let wordMap = []
//     let res = tags.forEach(tag =>{
//       for(let property in tag){
// let value = tag[property]

//      if (typeof value === 'string') wordMap.push(value);
//       }
//     })
       
// .slice(startIdx, startIdx + TAGS_PAGE_SIZE)

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

   const tagsMap = tags.reduce((tagObj, tag) =>{
if(!tagObj[tag]) tagObj[tag] = 0
tagObj[tag]++
        return tagObj
    }, {})
  let tagsMaps =  Object.entries(tagsMap)
  let tagsMapObjs = []
  tagsMaps.forEach(tag =>{
    tagsMapObjs.push({txt:tag[0], count:tag[1]}) 
    
  });
  
// let res = tagsMaps.reduce()
return tagsMapObjs
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