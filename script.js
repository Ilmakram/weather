const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "50e8a2f6e969e0a4a0e3d537382c769b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("City not found");
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        // Set appropriate weather image
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?cs=srgb&dl=pexels-magda-ehlers-pexels-2114014.jpg&fm=jpg";
                break;
            case 'Clear':
                weather_img.src = "https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?cs=srgb&dl=pexels-asphotograpy-96622.jpg&fm=jpg";
                break;
            case 'Rain':
                weather_img.src = "https://centralca.cdn-anvilcms.net/media/images/2019/01/02/images/Rainy_Weather_pix.max-752x423.jpg";
                break;
            case 'Mist':
                weather_img.src = "https://images.nationalgeographic.org/image/upload/v1638884972/EducationHub/photos/blue-mist.jpg";
                break;
            case 'Snow':
                weather_img.src = "https://imageio.forbes.com/specials-images/imageserve/639c5cdcb6175432cb9a89d7/Pathway-covered-with-snowy-trees-showing-importance-of-snow/960x0.jpg?format=jpg&width=960";
                break;
            default:
                weather_img.src = "https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_1280.jpg"; // Default image if no match
        }

        console.log(weather_data);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Event Listener for Search Button
searchBtn.addEventListener('click', () => {
    if (inputBox.value.trim() !== "") {
        checkWeather(inputBox.value);
    } else {
        alert("Please enter a city name!");
    }
});
