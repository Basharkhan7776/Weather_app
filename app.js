const apikey = "";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const backgroundClip = document.querySelector(".background-clip");

const backgroundClips = [
    "videos/clouds.mp4",
    "videos/clear.mp4",
    "videos/rain.mp4",
    "videos/drizzle.mp4",
    "videos/mist.mp4",
    "videos/snow.mp4"
];

function randomClip(){
    return backgroundClips[Math.floor(Math.random() * backgroundClips.length)];
}

backgroundClip.src = `${backgroundClips[Math.floor(Math.random() * backgroundClips.length)]}`;

async function checkWeather(city) {
    let url = `${apiurl}&q=${city}&appid=${apikey}`;
    try {
        const response = await fetch(url);
        if (response.status === 404) {
            document.querySelector(".city").innerHTML = "Invalid City";
            document.querySelector(".temp").innerHTML = "--" + "°c";
            document.querySelector(".humidity").innerHTML = "--" + "%";
            document.querySelector(".wind").innerHTML = "--" + " km/hr";
        } else {
            const data = await response.json();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "images/clouds.png";
                backgroundClip.src = "videos/clouds.mp4";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear.png";
                backgroundClip.src = "videos/clear.mp4";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain.png";
                backgroundClip.src = "videos/rain.mp4";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
                backgroundClip.src = "videos/drizzle.mp4";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "images/mist.png";
                backgroundClip.src = "videos/mist.mp4";
            } else if (data.weather[0].main === "Snow") {
                weatherIcon.src = "images/snow.png";
                backgroundClip.src = "videos/snow.mp4";
            }
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});