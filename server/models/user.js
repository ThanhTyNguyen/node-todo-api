const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

// Model methods
UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    };
    
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

// this function runs before save model data to mongodb.
// hash password
UserSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')) {
        var password = user.password;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// login verifying
UserSchema.statics.findByCredentials = function(email, password) {
    var user = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
}

// delete 
UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
          tokens: {token}  
        }
    });
};


var User = mongoose.model('User', UserSchema);

module.exports = {User};