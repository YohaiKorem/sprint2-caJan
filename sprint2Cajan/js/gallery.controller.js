'use strict'


function renderGallery(){
    const elGalleryContainer = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')
    elGalleryContainer.style.display = 'grid'
    elEditor.style.display = 'none'
    // const imgs = getImgsForDisplay()
    const strHTMLS = gImgs.map((img, idx) =>{
        return `<img src="${img.url}"  class="meme-img img${idx + 1}" onclick="onImgClick('${img.id}')">`
    })
    elGalleryContainer.innerHTML = strHTMLS.join('')
}

function  onImgClick(imgId){
    onSetCurrImg(imgId)
    renderEditor()
}


