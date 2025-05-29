const loc = document.querySelector('.loc');

function setTime(){
    const hour_mn = document.querySelector('.hour-mn');
    const meri = document.querySelector('.mr');
    const date = new Date();
    
    var hour = date.getHours();
    var mn = date.getMinutes();
    
    var formatted_hour = hour < 10 ? `0${hour}` : hour;
    var formatted_mn = mn < 10 ? `0${mn}` : mn;
    var mr = hour < 12 ? 'AM' : 'PM'

    hour_mn.innerHTML = `${formatted_hour}:${formatted_mn}`;
    meri.innerHTML = `${mr}`;
}
function setSecond(){
    const second = document.querySelector('.second');

    const date = new Date();
    var sec = date.getSeconds();
    var formatted_sec = sec < 10 ? `0${sec}` : sec

    second.innerHTML = `${formatted_sec}`;
}
function setDate(){
    const daydate = document.querySelector('.date');
    const date = new Date();

    var weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    var day = date.getDay()
    
    var ddate = date.getDate()
    var formatted_ddate = ddate < 10 ? `0${ddate}` : ddate;

    var month = date.getMonth() + 1; //month counts from 0
    var formatted_month = month < 10 ? `0${month}` : month;
    
    var year = date.getFullYear().toString().slice(2);

    daydate.innerHTML = `${weekdays[day]} ${formatted_ddate}/${formatted_month}/${year}`
}

//set text for footer with updated year
function setFooter(){
    const footer = document.querySelector('.footer p')
    const date = new Date();

    footer.innerHTML = `&copy; CarrotRP ${date.getFullYear()}`
}

//function calling
//init calling
setTime();
setSecond();
setFooter();
setDate();

//interval calling
setInterval(setSecond, 1000);
setInterval(setTime, 1000*60);
// setInterval(setDate, );