'use strict'


function renderGallery(){
    const elGalleryContainer = document.querySelector('.gallery-container')
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