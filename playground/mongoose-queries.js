const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

var id = '5b334cecd990aa7e173153d211';
var id2 = '5b3271fd7a9c0e600ed2d66e11';

if (!ObjectID.isValid(id2)) {
    console.log('ID not valid');
}

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by id:', todo);
// }).catch((e) => console.log(e));

// User.find().then((users) => {
//     console.log(users);
// })

// User.findOne({
//     _id: id2
// }).then((user) => {
//     console.log(user);
// });

User.findById(id2).then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log(user);
});

