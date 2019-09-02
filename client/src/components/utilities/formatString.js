 function formatTitle (str){
    return str.split('_').map(word=>{
        return word.charAt(0).toUpperCase().concat(word.substring(1))}).join(' ')
}

function formatSearchString(str){
    let firstWord = str.split(' ')[0]
    return firstWord.charAt(0).toUpperCase().concat(firstWord.substring(1))
}

export {formatTitle, formatSearchString}