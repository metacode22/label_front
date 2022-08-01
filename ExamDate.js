function subtractDays(numOfDays, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
    
    const calculDate = date.getFullYear() + "-" + (date.getMonth()+1) + '-' + date.getDate()

    return calculDate;
}

// const YMD = subtractDays(1);
const YMD = subtractDays(10, new Date('2022-01-01'));

console.log(YMD);