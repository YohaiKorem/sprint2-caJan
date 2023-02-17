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
let allTags = getTagsMap()


let filteredTags = allTags.filter(tag =>{
   return tag.txt.includes(gSearchFor)
})
let imgs = filteredTags.map(tag =>{
    return gImgs.filter((img, idx) =>{
        return img.keyWords === tag.txt
        
    })
})

if(!imgs.length) return gImgs
let result =  (arr) =>
{
    return arr
}
imgs = result(...imgs)

return imgs
}


function getTagsForDisplay(){
    let tags =gTags
    if(!tags) tags = getTagsMap()
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
  
  gTags = tagsMapObjs
return gTags
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
keyWords:makeTags()
}
}


function  searchTag(str){
    gSearchFor = str
}


function changeTagSize(str){
   let tags = getTagsForDisplay()

   gTags = tags.map(tag =>{
        if(tag.txt === str)  tag.count++
        // console.log('tag, tag.count', tag, tag.count);
        // console.log('tag, tag.count', tag, tag.count);
        return tag
    })

}

function toggleTags(){
    (gDisplayTags === 'more') ? gDisplayTags = 'less' : gDisplayTags = 'more'
    TAGS_PAGE_SIZE += 5
    if(TAGS_PAGE_SIZE >= 15) TAGS_PAGE_SIZE = 5
}

function getGDisplay(){
    return gDisplayTags
}

function getImgByID(id){
  return  gImgs.find(img=>{
      return  img.id === id
    })
}