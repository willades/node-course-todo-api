// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // identical to what's above

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // localhost, but could (should) be AWS url
	if(err) {
		return console.log('Unable to connect to server.');
	}
	console.log('Connected to MongoDB server');

// 	db.collection('Todos').insertOne({
// 		text: 'Something to do',
// 		completed: false
// 	}, (err, result) => {
// 		if(err) {
// 			return console.log('Unable to insert todo', err);
// 		}
//
// 	console.log(JSON.stringify(result.ops, undefined, 2))
// });

	db.collection('Users').insertOne({
		name: 'Will',
		age: 22,
		location: "Blahville"
	}, (err, result) => {
		if(err) {
			return console.log('Unable to insert user', err);
		}

		console.log(result.ops[0]._id.getTimestamp());
	});

	db.close();
});
