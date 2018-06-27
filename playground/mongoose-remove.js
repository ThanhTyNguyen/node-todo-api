const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.findOneAndRemove({_id: '5b3369a28901671e3da743fb'}).then((todo) => {
//     console.log(todo);
// });

Todo.findByIdAndRemove('5b3369a28901671e3da743fc').then((todo) => {
    console.log(todo);
});
