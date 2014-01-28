require('./client').listen(3000);
console.log('Client listening on port 3000...');

require('./server').listen(3001);
console.log('Server listening on port 3001...');
