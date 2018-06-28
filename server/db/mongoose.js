const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI); // this will be called whenever query task are ran from server.js

module.exports = {mongoose};