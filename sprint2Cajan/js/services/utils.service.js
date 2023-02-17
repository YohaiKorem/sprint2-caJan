'use strict'

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


function makeRandomMemeLines(wordCount = 2){
    const words = ['i hate it when', 'people ask me', 'what\'s cooking good looking', 'are you just happy to see me?', 
    'is that a canvas in your pocket', 'code, code everywhere', 'skidadle skidoodle',
     'eat some bagels', 'tal mooseri the traitor', 'never in my life', 'would you rather', 'have a lovely day', 'howdy partner', 'enough is enough', 'so thirsty']
     let txt = ''

     while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] 
    }
    return txt
}


function makeTags(wordCount = 1) {
    const words = ['funny', 'politics', 'baby', 'sad', 
    'happy', 'dog', 'animal',
     'awkward', 'anime', 'street', 'money', 'coding', 'cooking']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] 
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}