const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const container = document.getElementById('container')
const weatherContainer = document.getElementsByClassName('weather-container');
const gMap = document.getElementsByClassName('gmap_canvas');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
        // showMap(city);
    } else {
        alert('Please enter a city name.');
    }
});

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=923311f5802fadc2ef20471902ab62e2`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)
        // appendData(data)

    })
    .catch((err) => {
        console.log(err)
    })
}

// function appendData(data) {
//     // container.innerHTML = '';
//     data.forEach(ele => {
//         // let date = document.createElement('h4');
//         // date.textContent = new Date();
//         let{name} = data;
//         console.log(data)
//         name.textContent = ele.name;

//         weatherContainer.append(city);
//         container.append(weatherContainer)
//     });
// }

function onSearch() {
    let search = document.getElementById('cityInput').value;
    document.getElementById('gmap_canvas').src=`https://maps.google.com/maps?q=${search}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=923311f5802fadc2ef20471902ab62e2`)
    .then((res) => {
        return res.json()
    }).then(result => {
        document.getElementById('location').textContent = result.name;

        let weather = result.main.temp -  273.15;
        weather = weather.toFixed(2) + ' °C';
        document.getElementById('weather').textContent = weather;

        let feelsLikeTemp = (result.main.feels_like -  273.15).toFixed(2) + ' °C';

        feelsLikeTemp = 'Feels like ' + feelsLikeTemp + '. ' + result.weather[0].main + '. ' + result.weather[0].description;

        document.getElementById('feels-like').textContent = feelsLikeTemp;

        document.getElementById('min-temp').textContent = (result.main.temp_min  -  273.15).toFixed(2) + ' °C';
        document.getElementById('max-temp').textContent = (result.main.temp_max  -  273.15).toFixed(2) + ' °C';

        document.getElementById('humid').textContent = result.main.humidity + ' %'
        document.getElementById('visibility').textContent = (result.visibility / 1000).toFixed(2) + ' km';

        document.getElementById('container').style.display = 'flex';
    })
    .catch((err) => {
        console.log(err)
    })
}