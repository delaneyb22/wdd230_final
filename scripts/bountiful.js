function toggleMenu(){
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");
  document.querySelector("nav").classList.toggle("open");
document.querySelector(".spotlights").classList.toggle("open");
  
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;


//const url ='https://api.openweathermap.org/data/3.0/onecall?lat=33.1581&lon=117.3506&exclude=hourly,daily&appid=ce0b0daf98f8b1e61048d65d192f11ff'
const url= 'api.openweathermap.org/data/2.5/forecast?lat=33.1581&lon=117.3506&appid=ce0b0daf98f8b1e61048d65d192f11ff'



async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(`Error:${error}`);
  }
}

apiFetch();

function displayResults(weatherData) {
  currentTemp.innerHTML = `${weatherData.main.temp.toFixed(0)}`;
  windSpeed.innerHTML = `${weatherData.wind.speed.toFixed(0)} mph`;


  const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  let desc = weatherData.weather[0].description;
  let descUp = desc.toUpperCase();

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', descUp);
  captionDesc.textContent = descUp;

const t = weatherData.main.temp.toFixed(0);
const windspeed = weatherData.wind.speed.toFixed(0);
let windChillFahrenheit = document.querySelector("#windChillFahrenheit");

if (t <= 50 && windspeed >= 3.0) {
    windChillFahrenheit = 35.74 + (0.6215*t) - (35.75*Math.pow(windspeed, 0.16)) + (0.4275*t*Math.pow(windspeed, 0.16));

    windChillFahrenheit = windChillFahrenheit.toFixed(2);

    document.querySelector("#windChillFahrenheit").innerHTML = `${windChillFahrenheit} F`;
}
else {
    document.querySelector("#windChillFahrenheit").innerHTML = "N/A";
}
}


const feedbackElement = document.getElementById('feedback');

const formElement = document.forms[0];

formElement.addEventListener('submit', function(e) {
    
    e.preventDefault();
   
    feedbackElement.innerHTML = 'Hello '+ formElement.user_name.value +'! Thank you for your message. We will get back with you as soon as possible!';
    
    feedbackElement.style.display = "block";
    
    document.body.classList.toggle('moveDown');
});

const update = new Date(document.lastModified)

document.getElementById("last-update").textContent = `Last Update: ${update.getMonth()+1}/${update.getDate()}/${update.getFullYear()}   ${update.getHours()}:${update.getMinutes()}:${update.getSeconds()}`;
