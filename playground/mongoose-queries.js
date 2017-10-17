const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = "59e51e239e22cf09d97efb8e";

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id)
//   .then((todo) => {
//     if(!todo){
//       console.log("ID not found");
//     }
//     console.log('Todo By Id', todo);
//   });

User.findById(id)
  .then((user) => {
    if(!user) {
      console.log('User not found');
    }
    console.log("User by ID", JSON.stringify(user, undefined, 2));
  });
