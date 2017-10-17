// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // identical to what's above

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // localhost, but could (should) be AWS url
	if(err) {
		return console.log('Unable to connect to server.');
	}
	console.log('Connected to MongoDB server');

	// deleteMany
	// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result);
	// });


	// deleteOne
	// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// });

	db.collection('Users').findOneAndDelete({_id: ObjectID("59dec73a4defbc972b898f58")})
		.then((result) => {
			console.log(JSON.stringify(result, undefined, 2));
		});

	// db.close();
});