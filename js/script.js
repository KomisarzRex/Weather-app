const API_KEY= '1289d3a3827b6974f31d946f382c5ba9';

const SEARCH_BTN = document.getElementById("searchBtn");
const SEARCH_INPUT = document.getElementById("searchField");


const fetchWeather = async (city) =>{
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(URL);
    if(response.status===200)
    {
    const docs = await response.json();
    weatherInfo(docs);
    // console.log(docs);
    }
    else{
        console.log("Podane miasto nie istnieje");
    }
}
const clear= () =>{
    const left = document.querySelector(".mainLeft");
    const top = document.querySelector(".mainTop");
    const right = document.querySelector(".mainRight");

    right.innerHTML="";
    left.innerHTML="";
    top.innerHTML="";
}
const weatherInfo = (city) => {
    clear();
    const left = document.querySelector(".mainLeft");
    const top = document.querySelector(".mainTop");
    const icon = "http://openweathermap.org/img/w/" + city.weather[0].icon + ".png"
    top.innerHTML = 
    `
    <h2>${city.sys.country}, ${city.name}</h2>
    `;
    
    left.innerHTML = 
    `
        
            <img class="icona" src="${icon}"/>
            <div class="stats">
                <h2 class="space tempColor"><i class="bi bi-thermometer-half"></i>${convertTemp(city.main.temp)}</h2>
                <h3>Odczuwalna: ${convertTemp(city.main.feels_like)}</h3>
                <p class="space"><i class="bi bi-wind whiteIcon"></i>${windSpeed(city.wind.speed)}</p>
            </div> 
        
    `;
    tempColor(convertTemp(city.main.temp));
}
const convertTemp = (temp) => {
    const res = (temp - 272.15).toFixed() + "°C";
    return res;
}

const windSpeed = (speed) => {
    const wind = (speed * 1.8).toFixed(2) + "km/h";
    return wind;
}
const tempColor = (x) =>{
    const text = document.querySelector(".tempColor");
    const page = document.querySelector(".Main");
    // console.log(x);
    if(x<="15")
    {
        text.style.color ="blue";
        page.style.backgroundImage = "/img/winter.jpg"
        page.classList.remove("summer");
        page.classList.add("winter");
    }
    else if(x<="29" && x>="16")
    {
        text.style.color = "orange";
        page.style.backgroundImage = "/img/summer.jpg"
        page.classList.remove("winter");
        page.classList.add("summer");
    }
    else{
        text.style.color="red";
        page.classList.remove("winter");
        page.classList.add("summer");
    }
}
const getLocation = () => {
    navigator.geolocation.getCurrentPosition( (res)=>showGeo(res.coords.latitude,res.coords.longitude) )
}
const showGeo = async (positionx,positiony) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${positionx}&lon=${positiony}&appid=${API_KEY}`; 
    const rep = await fetch(url);
    const info = await rep.json();
    weatherInfo(info);
    // console.log(info);
}
  getLocation();


SEARCH_BTN.addEventListener("click",() =>fetchWeather(SEARCH_INPUT.value));
