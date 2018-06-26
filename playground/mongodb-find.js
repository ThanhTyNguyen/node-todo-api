// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // using object destructoring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
       return console.log('Unable to connect to mongdb server');
    }
    console.log('Connected to mongodb server')

    db.collection('Users').find({ name: 'Nguyen Ty'}).toArray().then((count) => {
        // console.log(JSON.stringify(docs, undefined, 2));
        console.log(count);
    }, (err) => {   
        console.log('Unable to fetch users data');
    });

    db.collection('Users').find({
        _id: new ObjectID('5b31a9580338420df9afe3d0')
    }).toArray().then((docs) => {
        console.log(docs);
    }, (err) => {
        console.log('Unable to fetch user data');
    })
    db.close();
});