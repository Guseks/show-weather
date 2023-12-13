

async function presentWeather(){
  //Call function to get weather.

  const weatherData = await getWeather();

  // Create html elements to contain weather information

  const weatherString = `Free Code Camp`;

  const weatherInfo = document.createElement("div");
  weatherInfo.textContent = weatherString;
  weatherInfo.style.display = "flex";
  weatherInfo.style.flexDirection = "column";
  weatherInfo.style.width = "500px";
  weatherInfo.style.margin = "auto";
  weatherInfo.style.fontSize = "18px";

  const description = document.createElement("span");
  description.textContent = "Weather App";

  weatherInfo.appendChild(description);

  const weatherIcon = document.createElement("img");
  weatherIcon.src = weatherData[0].icon;
  weatherInfo.appendChild(weatherIcon);
  weatherIcon.style.width = "80px";

  
  return weatherInfo;

  // Create element containing string and icon. 
  // Add element to screen. 
}

async function getWeather(){

  //get position to find weather for using HTML5 Geolocation
  const currentPosition = await getLocation();

  // Call Weather API to get weather. freeCodeCamp Weather API
  const weatherResult = await fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}`);

   // Save result in variable. Variable contains weather info and string to access weather icon. 
  const weatherData = await weatherResult.json();
  return weatherData.weather;
  
  function getLocation() {
    return new Promise((resolve, reject) =>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const currentPosition = {
              latitude: position.coords.latitude, 
              longitude: position.coords.longitude
            };
            resolve(currentPosition);
          },
          error => {
            console.error("Error getting location: ", error);
            reject(error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        reject("Geolocation not supported");
      }
    });
    
  }
}


async function displayWeather() {
  try {
    const weatherInfo = await presentWeather();
    document.body.appendChild(weatherInfo);
  } catch (error) {
    console.error('Error displaying weather:', error);
  }
}

displayWeather();
