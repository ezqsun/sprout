export function formatTitle (str){
    return str.split('_').map(word=>{
        return word.charAt(0).toUpperCase().concat(word.substring(1))}).join(' ')
}