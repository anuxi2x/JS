async function getWeather () {
   const response = await fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&q=Yerevan&appid=c255d94e30f2f0a17bfbdf269a26ef4f')
    const data = await response.json()
    return data
}

async function getName () {
    const getCityName = await getWeather()
    const cityTextSection = document.createElement('p')
    const cityTempSection = document.createElement('p')
    cityTextSection.innerText = getCityName.name
    cityTempSection.innerHTML = getCityName.main.temp + '&#8451'
    const weatherSection = document.querySelector('.weather')
    weatherSection.appendChild(cityTextSection)
    weatherSection.appendChild(cityTempSection)
}

window.addEventListener('load', getName)