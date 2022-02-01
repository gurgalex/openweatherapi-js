addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  let endpoint = "https://api.openweathermap.org/data/2.5/onecall"
  
  const city = "Ames"
  const country = "US";
  const region = "Iowa"

  const latitude = 42.03;
  const longitude = -93.62;

  const exclude_parts = "minutely,hourly,alerts"
  const unit_type = "imperial";
  endpoint += `?lat=${latitude}&lon=${longitude}&units=${unit_type}&exclude=${exclude_parts}&appid=${WEATHER_API_KEY}`
  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  }

  const response = await fetch(endpoint,init)

  const content = await response.json();
  json = JSON.stringify(content, null, 2);

  
  let html_style = `body{padding:6em; font-family: sans-serif;} h1{color:#f6821f}`
  
  let html_content = "<h1>Weather 🌦</h1>"

  const first_day = content.daily[0];

  html_content += `<p>This is a demo using geolocation data from <a href="https://openweathermap.org" target="_blank">openweathermap.org</a>.</p>`
  html_content += `Showing weather data for: Lat: ${latitude}, Long: ${longitude}.</p>`
  html_content += `<p>Weather data for city: ${city}, region: ${region}, country: ${country}</p>`
  html_content += `<p>The current temperature is: ${content.current.temp}°F.</p>`
  html_content += `<p>Daily forecast: morning: ${first_day.temp.morn}, day: ${first_day.temp.day}, evening: ${first_day.temp.eve}, night: ${first_day.temp.night}`
  html_content += `<p>This demo is hosted on Cloudflare Workers</p>`

  let html = `
<!DOCTYPE html>
<head>
  <title>Geolocation: Weather</title>
</head>
<body>
  <style>${html_style}</style>
  <div id="container">
  ${html_content}
  </div>
</body>`

  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },})
}
