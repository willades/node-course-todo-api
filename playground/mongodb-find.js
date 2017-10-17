// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // identical to what's above

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // localhost, but could (should) be AWS url
	if(err) {
		return console.log('Unable to connect to server.');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').find({
	// 	_id: ObjectID("59dec9d3382c81e2e79ff8e1")}).toArray()
	// 	.then((docs) => {
	// 		console.log('Todos');
	// 		console.log(JSON.stringify(docs, undefined, 2));
	// 	}, (err) => {
	// 		console.log('Unable to fetch todos', err);
	// 	});

	// db.collection('Users').find({name:'Will'}).toArray()
	// 	.then((docs) => {
	// 		console.log('Users');
	// 		console.log(JSON.stringify(docs, undefined, 2))
	// 	}, (err) => {
	// 		console.log('Unable to fetch todos', err);
	// 	});


	// db.close();
});
