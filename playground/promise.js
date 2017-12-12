var ayncAdd = (a,b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			 if (typeof a === 'number' && typeof b === 'number') {
				 resolve(a+b);
			 }
			 else {
				 reject('Arguments must be numbers');
			 }
		}, 1500);
	});
};

/*
var somePromise = new Promise((resolve,reject) => {
	setTimeout(() => {
		// resolve('Hello It is working.');	
		reject('Unable to fullfill promise.');	
	}, 2500);
});

somePromise.then((message) => {
	console.log('Success: ', message);
}, (errorMessage) => {
	console.log('Error Occured :', errorMessage);
});
*/

/*
ayncAdd(12,12).then((result) => {
	console.log('Success: ', result);
	return ayncAdd(result, 1947);	
}, (rejectMessage) => {
	console.log('Rejection Occured :', rejectMessage);
}).then((chainResult) => {
	console.log('Chain Success: ', chainResult);
}, (chainRejectMessage) => {
	console.log('Promise chain reject Occured :', chainRejectMessage);
});
*/

// with catch

ayncAdd(12,'12').then((result) => {
	console.log('Success: ', result);
	return ayncAdd(result, 1947);	
}).then((chainResult) => {
	console.log('Chain Success: ', chainResult);
}).catch((errorMesage) => {
	console.log('Error Message :', errorMesage);
});