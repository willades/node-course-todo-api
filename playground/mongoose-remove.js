const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });
//
// Todo.findOneAndRemove({}).then((doc) => {
//
// });

Todo.findByIdAndRemove("59eb60ec382c81e2e7a06cdd").then((doc) => {
  console.log(doc);
});
