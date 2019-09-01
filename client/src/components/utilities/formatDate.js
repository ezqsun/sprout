export function formatToday(){
    let today = new Date()
    let mm = makeTwoDigits(today.getMonth() + 1)
    let dd = makeTwoDigits(today.getDate())
    let yyyy = `${today.getFullYear()}`
    return `${yyyy}-${mm}-${dd}`
}

function makeTwoDigits(n){
    return n<10 ?
    `0${n}`
    :
    `${n}`
}