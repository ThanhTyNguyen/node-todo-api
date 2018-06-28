const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        // token type
        access: {
            type: String,
            required: true
        }, 
        token: {
            type: String,
            required: true
        }
    }]
});

// instance methods
// override convert document object to json function.
UserSchema.methods.toJSON = function () {
    var user = this;
    // convert document object into a plain js object (trim some properties are not neccessary), ready for storage in MongoDB
    // ex: trim _id of document object that retrieved from mongodb
    var userObject = user.toObject() 
    return _.pick(userObject, ['_id', 'email']); // create a new composite object with pickup properties.
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};