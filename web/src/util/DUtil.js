const GT_FORMAT = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'America/Guatemala',
    year: "numeric", month: "2-digit",
    day: "2-digit", hour: "2-digit",
    minute: "2-digit",
});


function tryParseDate(date){
    let d=null;
    try{
        d = new Date(Date.parse(date));
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        d = new Date(date.getTime() - userTimezoneOffset);

    } catch(err){
    }
    return d
}

function tryParseNum(num){
    let digito=null;
    try{
        digito = parseInt(num);
        digito = digito === -1 ? null : digito;
    } catch(err){
    }
    return digito
}


export {GT_FORMAT, tryParseDate, tryParseNum};