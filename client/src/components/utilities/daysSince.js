export default function daysSince(date) {
    let prevDate = date.split('-')
    let a = new Date(parseInt(prevDate[0], 10), parseInt(prevDate[1], 10), parseInt(prevDate[2], 10))

    let today = new Date()
    let t = new Date(today.getFullYear(), today.getMonth()+1, today.getDate())

    return Math.round((t-a)/(1000*60*60*24));
    }
