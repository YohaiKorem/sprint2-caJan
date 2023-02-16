'use strict'


function onInit(){
    renderGallery()
    renderTags()
}


function renderGallery(){
    const elGalleryContainer = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')
  const elSearchBar =  document.querySelector('.search-bar')
    elGalleryContainer.style.display = 'grid'
    elEditor.style.display = 'none'
    elSearchBar.style.display = 'grid'
    getImgsForDisplay()
    // const imgs = getImgsForDisplay()
    const strHTMLS = gImgs.map((img, idx) =>{
        return `<img src="${img.url}"  class="meme-img img${idx + 1}" onclick="onImgClick('${img.id}')">`
    })
    elGalleryContainer.innerHTML = strHTMLS.join('')
}

function renderTags(){
   const tags =  getTagsForDisplay()
   const elSearchList = document.querySelector('.search-tags')
   let display = getGDisplay()
// if(display === 'less'){
    let strHTMLs =  tags.map(tag =>{
        return `<li class="tag" style="font-size: ${tag.wordCount * 8}px;" onclick="onSearchTag('${tag.tag}')">${tag.tag}</li>`})
        strHTMLs.push(`<span class="more-tags" onclick="onMoreTags()">${gDisplayTags}...</span>`)
    // }   
let strHTML = strHTMLs.join('')
    elSearchList.innerHTML = strHTML
}


function  onImgClick(imgId){
    onSetCurrImg(imgId)
    renderEditor()
}

function onSearchTag(str){
       searchTag(str)
}



function onMoreTags(){
moreTags()
renderTags()
}