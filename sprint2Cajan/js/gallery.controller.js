'use strict'


function onInit(){
    renderTags()
    renderGallery()
}


function renderGallery(){
    
    const elGalleryContainer = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')
  const elSearchBar =  document.querySelector('.search-bar')
    elGalleryContainer.style.display = 'grid'
    elEditor.style.display = 'none'
    elSearchBar.style.display = 'grid'
  let imgs =  getImgsForDisplay()
  const strHTMLS = imgs.map((img, idx) =>{
  return `<img src="${img.url}"  class="meme-img img${idx + 1}" onclick="onImgClick('${img.id}')">`
    })
    elGalleryContainer.innerHTML = strHTMLS.join('')
    closeMenu()
}

function renderTags(){
    if(gSearchFor) changeTagSize(gSearchFor)
   const tags =  getTagsForDisplay()
   const elSearchList = document.querySelector('.search-tags')
//    console.log('tags from renderTags', tags);

    let strHTMLs =  tags.map(tag =>{
        return `<li class="tag" style="font-size: ${tag.count * 10}px;" onclick="onSearchTag('${tag.txt}')">${tag.txt}</li>`})
        strHTMLs.push(`<span class="more-tags" onclick="onToggleTags()">${gDisplayTags}...</span>`)
    
let strHTML = strHTMLs.join('')
    elSearchList.innerHTML = strHTML
}


function  onImgClick(imgId){
    renderEditor(imgId)
}

function onSearchTag(str){
    str += ''
       searchTag(str)
    //    changeTagSize(str)
       renderGallery()
       renderTags()
}

function onToggleTags(){
    toggleTags()
renderTags()
}


function openMenu(){
    const elMainNav = document.querySelector('.main-nav')
    const elHiddenLogo = document.querySelector('.hidden-logo')
    const elBackdrop = document.querySelector('.backdrop')
    elMainNav.classList.add('open')
    elHiddenLogo.classList.toggle('hidden')
    elBackdrop.classList.add('open')
}

function closeMenu(){
    const elMainNav = document.querySelector('.main-nav')
    const elHiddenLogo = document.querySelector('.hidden-logo')
    const elBackdrop = document.querySelector('.backdrop')
    elMainNav.classList.remove('open')
    elHiddenLogo.classList.toggle('hidden')
    elBackdrop.classList.remove('open')
}