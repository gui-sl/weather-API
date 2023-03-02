const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const country = document.querySelector('.country');

let cityInput = "Sao Paulo"
fetchWeatherData();

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;

        fetchWeatherData();

        app.style.opacity = "0"
    })
})

form.addEventListener('submit', (e) =>{
    if(search.value.length == 0)
    {
        window.alert("Digite um nome valido");
    }
    else{
        cityInput = search.value;

        fetchWeatherData()

        search.value = '';

        app.style.opacity = "0"
    }
    e.preventDefault()
});



function dayOfTheWeek(day, month, year){
    const weekday = [
        "sunday",
        "monday",
        "Terça",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()]
};

async function fetchWeatherData(city){
    
    const apiWeatherURL = `https://api.weatherapi.com/v1/current.json?key=9bad78fd8b1f46af891140351230103&q=${cityInput}&aqi=no`

    const res = await fetch(apiWeatherURL)
    const data  = await res.json(); 
    
    console.log(data)


    if(!data.current){
        console.log('erro')
        window.alert('Local não encontrado');
        location.reload()
    }
    else{
        console.log('API has been conected.')
    }

    temp.innerHTML = data.current.temp_c + "&#176"
    conditionOutput.innerHTML = data.current.condition.text

    const date = data.location.localtime;

    const y = parseInt(date.substr(0, 4));
    const m = parseInt(date.substr(5, 2));
    const d = parseInt(date.substr(8, 2));
    const time = date.substr(11);

    if(m < 10 && d <10){
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} 0${d}/ 0${m}/ ${y}`;
    }
    else if(d < 10){
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} 0${d}/ ${m}/ ${y}`;
    }
    else if(m < 10){
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/ 0${m}/ ${y}`;
    }
    else{
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/ ${m}/ ${y}`;
    }
    

    
    timeOutput.innerHTML = time;

    nameOutput.innerHTML = data.location.name;
    country.innerHTML = data.location.country

    const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64".length);

        icon.src = "./images" + iconId;

        cloudOutput.innerHTML = data.current.cloud + "  %";
        humidityOutput.innerHTML = data.current.humidity + " %";
        windOutput.innerHTML = data.current.wind_kph + " Km/h";
        
        let timeOfDay = "day";

        const code = data.current.condition.code;
        if(!data.current.is_day){
            timeOfDay = "night";
        }

        if(code == 1000){
            app.style.backgroundImage = `url(./images/${timeOfDay}/clear.avif)`

            btn.style.background = "#e5ba92"
            if(timeOfDay == "night"){
                btn.style.background = "#181e27"
            }
        }

        else if(code == 1003 || code == 1006 || code == 1009 || code == 1030 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282){
            app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.avif)`
            btn.style.background = "#fa6d1b"
            if(timeOfDay == "night"){
                btn.style.background = "#181e27"
            }
        }
        else if(code == 1063 || code == 1069 || code == 1072 || code == 1150 || code == 1153 || code == 1180 || code == 1183 || code == 1186 || code == 1189 || code == 1192 || code == 1195 || code == 1204 || code == 1207 || code == 1240 || code == 1243 || code == 1246 || code == 1249 || code == 1252){
            app.style.backgroundImage = `url(./images/${timeOfDay}/rain.avif)`;
            if(timeOfDay == "night"){
                btn.style.background = "#325c80"
            }
        }
        else{
            app.style.backgroundImage = `url(./images/${timeOfDay}/snow.avif)`;
            btn.style.background = "#4d72aa"
            if(timeOfDay == "night"){
                btn.style.background = "#1b1b1b";
            }
        }

        app.style.opacity = "1"
    
}

