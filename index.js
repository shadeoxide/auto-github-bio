// Import Packages
const config = require('./config');
const fetch = require('node-fetch')
const weather = require('weather-js');


setInterval(() => {
// Find weather for the specified city
weather.find({
    search: config.city,
    degreeType: config.degreeType
}, function (err, result) {

    // Errors
    if (err) console.log(err);

    if (result === undefined || result.length === 0) return console.log("Location provided wasn't valid.")

    // Result of the search    
    let { current, location } = result[0];
    
    // Text for the Bio
    let text = `Current Weather in ${current.observationpoint}: ${current.skytext} | Temperature: ${current.temperature}°C | Made by ShadeOxide using JavaScript`
    
    // URL to make request
    let url = "https://api.github.com/user"
    
    // Headers
    let headers = {
        "Authorization": `token ${config.github}`,
        "Content-Type": "application/json",
    }

    // Bio
    let bio = {"bio": text}

    // Posting the bio to Github
    fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(bio)
    })
}
)
}, 5000)