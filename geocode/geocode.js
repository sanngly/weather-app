const request = require('request');

var geocodeAddress = (address, callback) => {	
	var encodedAddress = encodeURIComponent(address); 
		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
			json: true
		}, function (error, response, body) {
			if (error) {
				//console.log(`Unable to connect to Google servers ${error.hostname}`);
				callback('Unable to connect to Google servers.');
			} else if (body.status === 'ZERO_RESULTS') {
				callback('Unable to find the address.');
			} else if (body.status === 'OK') {
				callback(undefined, {
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});
				//console.log(`Address : ${body.results[0].formatted_address}`);
				//console.log(`Latitude : ${body.results[0].geometry.location.lat}`);
				//console.log(`Longitude : ${body.results[0].geometry.location.lng}`);
			}
			//console.log('error:', error); // Print the error if one occurred
			//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			//console.log('body:', JSON.stringify(body, undefined, 2)); // Print the HTML for the Google homepage.
			//console.log('body:', JSON.stringify(error, undefined, 2));
		});
};

module.exports = {
	geocodeAddress
}

