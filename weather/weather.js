const request = require('request');

var getWeather = (lat, lng, callback) => {
	//console.log(`${lat}, ${lng}`);
	request({
		url: `https://api.darksky.net/forecast/a717e83c8e188704f074735e2685336f/${lat},${lng}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to Forecast.io server.');
		} else if (response.statusCode === 400) {
			callback('Unable to fetch weather data.');
		} else if (response.statusCode === 200){
			//console.log(body.currently.temperature);
			callback(undefined, {
				temperature: body.results[0].currently.temperature,
				apparentTemperature: body.results[0].currently.apparentTemperature
			})
		}
	});
};

module.exports.getWeather = getWeather;
