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

	// db.collection('Todos').findOneAndUpdate({
  //   _id:ObjectID("59e4b455c74f66c5286869d6")
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //     returnOriginal: false
  //   }).then((result) => {
	// 		console.log(result);
	// 	});

  db.collection('Users').findOneAndUpdate(
    { _id: new ObjectID("59e4bba0a31d06c6162f0bd6") },
    {
      $set: { name: "Ron" },
      $inc: { age: 1 }
    }, { returnOriginal: false }
    ).then((result) => {
      console.log(result);
    });


	// db.close();
});
