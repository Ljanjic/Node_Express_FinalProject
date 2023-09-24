// const mongoose = require('mongoose');
// const sDaySchema = require('./models/SpecialDay'); // Replace with the correct path to your sDaySchema

// // Assuming you have a mongoose connection established
// const SpecialDay = mongoose.model('SpecialDay', sDaySchema);

// // Replace these values with actual data
// const occasionDate = new Date('1988-09-02T04:00:00Z'); // Replace with your desired date and time
// const userId = mongoose.Types.ObjectId('650cedb1d025eee0a0151fb9'); // Replace with the actual user ID

// // Create a new SpecialDay document
// SpecialDay.create({
//   firstName: 'Biljana',
//   lastName: 'Janjic',
//   occasion: 'birthday',
//   occasion_date: occasionDate,
//   age: 35,
//   createdBy: '650b73f63395c4ba8229b245',
//   user_id: userId,
// })
//   .then((savedSpecialDay) => {
//     console.log('Special Day saved:', savedSpecialDay);
//   })
//   .catch((error) => {
//     console.error('Error saving Special Day:', error);
//   });

//   module.exports = SpecialDay;