// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // using object destructoring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
       return console.log('Unable to connect to mongdb server');
    }
    console.log('Connected to mongodb server')

    // db.collection('Todos').insertOne({
    //     tex: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // Insert new doc into Users (name, age, location)
    db.collection('Users').insertOne({
        name: 'Nguyen Ty',
        completed: false,
        location: 'Singapore'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert users', err);
        }
        console.log(result.ops[0]._id.getTimestamp());
    });

    db.close();
});