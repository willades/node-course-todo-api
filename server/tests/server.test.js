const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, users, populateUsers} = require("./seed/seed");

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create a todo', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('Get /todos:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done)
  });
});


describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.findById(hexId).then((todo) => {
          expect().toNotExist();
          done();
        }).catch((e) => done(e));
      });
    });

  it('should return 404 if todo not found', (done) => {
    var hexID = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(404)
      .end(done)
  });

  it('should return 404 if ObjectID is invalid', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done)
  });
});

describe('PATCH /todos/:id', () => {
  it('should return completedAt when todo is completed', (done) => {
    var hexId = todos[0]._id.toHexString();
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: "Updated Todo",
        completed: true
      })
      .expect((res) => {
        expect(res.body.todo.text === "Updated Todo");
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .expect(200)
      .end(done)
  });

  it('should clear completedAt when completed is false', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: "Another Todo",
        completed: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe("Another Todo");
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'example@example.com';
    var name = 'will';
    var password = '123abc!';
    request(app)
      .post('/users')
      .send({name, email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err)
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        });
      });
  })
  it('should return validation errors if request invalid', (done) => {
    var name = 'will';
    var email = 'willsemail';
    var password = 'hi';
    request(app)
      .post('/users')
      .send({name, email, password})
      .expect(400)
      .end(done);
  });
  it('should not create user if email in use', (done) => {
    var name = 'will';
    var email = 'will@bc.edu';
    var password = 'abc123';
    request(app)
      .post('/users')
      .send({name, email, password})
      .expect(400)
      .end(done);
  })
})
