console.log('Staring app');
setTimeout(() => {
	console.log('Inside call-backs');
}, 3000);

setTimeout(() => {
	console.log('Inside second call-backs');
}, 0);
console.log('Finishing app');
