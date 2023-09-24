const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, enter your First Name'],
        minlength: 3,
        maxlenght: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please, enter your email address'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter valid email address',
        ],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please, enter your password'],
        minlength: [5, 'Password must be at least 5 characters, provided {VALUE}'],
    },
},
    { timestamps: true }
);

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10); // hashing the password
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            userId: this._id,
            name: this.name
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    );
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, this.password)
    return isMatch;
};
module.exports = mongoose.model('User', UserSchema)