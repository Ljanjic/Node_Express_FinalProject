const mongoose = require('mongoose');

const sDaySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please, enter the First name of the person you want to add into your Reminding app.'],
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please, enter the Last name of the person you want to add into your Reminding app.'],
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  occasion: {
    type: String,
    enum: ['birthday', 'anniversary'],
    default: 'birthday',
    unique: true,
    required: [true, 'Add new Special Day reminder event']
  },
  occasion_date: {
    type: Date,
    required: true,
    min: new Date('1923-01-01')
  },
  age: {
    type: Number,
    required: [true, 'Add a number of years to celebrate']
  },
  // connecting user model to sDay model, while creating new sDay reminder event, that event will be associated with a user who created it 
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please enter your name']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});
const sDay = mongoose.model('sDay', sDaySchema);

module.exports = sDay;