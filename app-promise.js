const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
	a: {
		demand: true,
		alias: 'address',
		describe: 'Address to fetch weather for',
		string: true
	}
})
.help()
.alias('help', 'h')
.argv;
	
var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
.then(function (response) {
    if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find the address.');
	} else if (response.data.status === 'OK') {
		var lat = response.data.results[0].geometry.location.lat;
		var lng = response.data.results[0].geometry.location.lng;
		// var proxyURL = `http://blrproxy.bglrodc.lntinfotech.com:8002/`;
		var weatherUrl = `https://api.darksky.net/forecast/a717e83c8e188704f074735e2685336f/${lat},${lng}`;
		// console.log(response.data);	
		var config = {
			proxy: {
				host: 'blrproxy.bglrodc.lntinfotech.com',
				port: 8002,
				auth : {
					username: '10641895',
					password: 'Poiuy@1234'
				}
			}
		};
		var address = response.data.results[0].formatted_address;
		console.log(address);
		return axios.get(weatherUrl, config);
	}
})
.then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It is currently ${temperature}. It is feels like ${apparentTemperature}`);
})
.catch(function (error) {
    //console.log(error);
	if (error.code === 'ENOTFOUND'){
		console.log('Unable to connect to Google servers.')
	} else {
		console.log(error.message);
	}
});
 
/** 
axios.get(geocodeUrl).then((response) => {
	console.log(response.data);
});**/




