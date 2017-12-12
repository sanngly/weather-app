const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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
	.argv
	
//console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
	if (errorMessage){
		console.log(errorMessage);
	} else {
		console.log(JSON.stringify(results, undefined, 2));
		console.log('-----------------------------------')
		console.log(results.address);
		
		// callback chaining 
		
		// lat, lng , callback
		weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
			if (errorMessage){
				console.log(errorMessage);
			} else {
				console.log(JSON.stringify(weatherResults, undefined, 2));
			}
		});
	}
}); 



