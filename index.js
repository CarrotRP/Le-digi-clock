const loc = document.querySelector('.loc');
const country_list = document.querySelector('.country');
var selected_timezone = '';

// ADD MORE COUNTRY HERE
// NOTE: iso 3166-1 alpha-3 = officially assigned three letter country name
// format, 'country name(all cap) : { 'iso 3166-1 alpha-3': 'iana timezone}
// or type lowercase if you want as long as the iana tz is correct to the tz identifier(check 'iana tz' link)
const country = {
    'CANADA': { 'CAN': 'Canada/Central' },
    'CAMBODIA': { 'KHM': 'Asia/Phnom_Penh' },
    'FRANCE': { 'FRA': 'Europe/Paris' },
    'ICELAND': { 'ISL': 'Atlantic/Reykjavik' },
    'ITALY': { 'ITA': 'Europe/Rome' },
    'JAPAN': { 'JPN': 'Asia/Tokyo', },
    'MALAYSIA': { 'MYS': 'Asia/Kuala_Lumpur' },
    'PORTUGAL': { 'PRT': 'Europe/Lisbon' },
    'SAMOA': { 'WSM': 'Pacific/Pago_Pago' },
    'SOUTH KOREA': { 'KOR': 'Asia/Seoul' },
    'SPAIN': { 'ESP': 'Europe/Madrid' },
    'SWEDEN': { 'SWE': 'Europe/Stockholm' },
    'UK': { 'GBR': 'Europe/London' },
    'USA. NEW YORK': { 'USA': 'America/New_York' }
};
// iso 3166-1: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
// iana tz: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

function setupCountryList() {
    var html = '';
    var active_class = ''
    for (var key in country) {
        //whether to add country_active class(for displaying which country is currently selected)
        if (Object.values(country[key])[0] === selected_timezone) {
            active_class = 'country-active'
        } else {
            active_class = ''
        };
        html += `<p class=${active_class}>${key}</p>`
    }
    country_list.innerHTML = html;
}

//init timezone
function setInitTimezone() {
    //assigning to the user current location timezone
    selected_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setLocation();
}
//setting the display country txt
function setLocation() {
    for (var key in country) {
        if (Object.values(country[key])[0] === selected_timezone) {
            loc.innerHTML = `${Object.keys(country[key])}`
            break;
        }
    }
}
function setupClock() {
    setTime();
    setDate();
}
//setting time
function setTime() {
    const hour_mn = document.querySelector('.hour-mn');
    const meri = document.querySelector('.mr');
    const second = document.querySelector('.second');

    const date = new Date().toLocaleString('en-US', { timeZone: selected_timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    var hour = date.slice(0, date.indexOf(':'));
    var mn = date.slice(date.indexOf(':') + 1, date.lastIndexOf(':'));
    var sec = date.slice(date.lastIndexOf(':') + 1, date.indexOf(' '));
    var mr = date.slice(date.indexOf(' ') + 1)

    hour_mn.innerHTML = `${hour}:${mn}`;
    meri.innerHTML = `${mr}`;
    second.innerHTML = `${sec}`;

    // var sec = new Date().toLocaleString('en-US', { timeZone: selected_timezone, second: '2-digit' }); (used to be in a different function 'setSecond')
    // //this does not give 2-digit, instead of 00, it gives 0, this will explain https://github.com/moment/luxon/issues/1418#issuecomment-1501094496
}

//set the weekday, date, month, year
function setDate() {
    const daydate = document.querySelector('.date');

    //formate with 'en-GB' british english cuz its more familiar format for me(dd/mm/yy)
    const date = new Date().toLocaleString('en-GB', { timeZone: selected_timezone, weekday: 'short', day: '2-digit', month: '2-digit', year: '2-digit', });

    var weekday = date.slice(0, date.indexOf(',')).toUpperCase()
    var ddate = date.slice(date.indexOf(' ') + 1) // + 1 to note take in the space

    daydate.innerHTML = `${weekday} ${ddate}`
}

//set text for footer with updated year
function setFooter() {
    const footer = document.querySelector('.footer p')
    const date = new Date();

    footer.innerHTML = `&copy; CarrotRP ${date.getFullYear()}`
}

//pop up functions
const popupBg = document.querySelector('.popup-bg');
const popupBox = document.querySelector('.popup-box');

function popupClick() {
    popupBox.classList.add('popup-active');
    popupBg.classList.add('popup-bg-active');
}
//click sound
const sound = document.createElement('audio');
sound.src = './assets/click.wav';

//event delegation
document.querySelector('.country').addEventListener('click', (e) => {    
    sound.play();

    changeTimezone(Object.values(country[e.target.innerHTML])[0]);
    popupClose();
})
function popupClose() {
    sound.play();
    popupBox.classList.remove('popup-active');
    popupBg.classList.remove('popup-bg-active');
}
//change timezone onclick function
function changeTimezone(clicked_timezone) {
    selected_timezone = clicked_timezone;
    setLocation();
    setupClock();
    setupCountryList();
}

//function calling
//init calling
setInitTimezone();
setupClock();
setupCountryList();
setFooter();

//show tip after 2s
setTimeout(() => {
    document.querySelector('.tip').classList.add('tip-active')
}, 2000)

//interval calling
setInterval(setupClock, 1000);