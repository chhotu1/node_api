var mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Validate_exp = require('../validation/regex_validation');
const saltRounds = 10;
var userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type:String,
        required: true,
        maxlength: 255,
        unique: true,
        // validate: {
        //     validator: isEmailExists, msg: 'Email already exists'
        // }
    },
    password:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    role:{
        type:String,
        required:true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// validation
userSchema.path('email').validate(function (email) {
    if (!email) {
      return
    }
    return Validate_exp.EMAIL_REGEXP.test(email)
}, 'Please fill the valid email address'),

function isEmailExists(email, res) {
    User.count({ email: email })
    .then((count) => {
        if (count > 0) {
            console.log('Username exists.');
        } else {
            console.log('Username does not exist.');
        }
    });
}






// hash user password before saving into database
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

// const User = mongoose.model('User', userSchema);
// module.exports = mongoose.model('user', userSchema);

var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}





