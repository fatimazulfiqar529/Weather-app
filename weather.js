const button = document.querySelector("button");
const Input = document.getElementById("city");
const temp = document.querySelectorAll("h1.text-dark")[0];
const city = document.querySelectorAll("h1.text-dark")[1];
const windDirect = document.querySelectorAll("p")[0]; 
const windSpeed = document.querySelectorAll("p")[2];     
function getCompassDirection(deg) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
}
button.addEventListener("click", async () => {
  const city = Input.value.trim();
  if (!city) {
    alert("Enter a city");
    return;
  }
  city.textContent = "Loading...";
  temp.textContent = windDirect.textContent = windSpeed.textContent = "--";
  try {
    const Res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
    const Data = await Res.json();
    if (!Data.length) throw new Error("City not found");
    const { lat, lon } = Data[0];
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const weatherData = await weatherRes.json();
    temp.textContent = `${weatherData.current_weather.temperature}°C`;
    city.textContent = city;
    windDirect.textContent = `${weatherData.current_weather.winddirection}° (${getCompassDirection(weatherData.current_weather.winddirection)})`;
    windSpeed.textContent = `${weatherData.current_weather.windspeed} km/h`;
  } catch {
    cityText.textContent = "City not found";
    temp.textContent = windDirect.textContent = windSpeed.textContent = "--";
  }
});
