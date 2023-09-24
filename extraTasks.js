// const nodemailer = require('nodemailer'); // Import Nodemailer or your chosen email service

// // FILTER SpecialDays to sort them by past and upcoming events
// const today = new Date();
// const pastEvents = [];
// const upcomingEvents = [];

// occasionDates.forEach((occasionDate, index) => {
//   const date = occasionDate.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });

//   const dayDate = occasionDate.getDate();
//   const dayMonth = occasionDate.getMonth();

//   const todayDate = today.getDate();
//   const todayMonth = today.getMonth();

//   const eventDetails = {
//     date,
//     firstName: sDays[index].firstName,
//     lastName: sDays[index].lastName,
//     occasion: sDays[index].occasion
//   };

//   if (dayMonth < todayMonth || (dayMonth === todayMonth && dayDate < todayDate)) {
//     pastEvents.push(eventDetails);
//   } else if (dayMonth === todayMonth && dayDate === todayDate) {
//     // Send email reminder for events on the same day and month
//     const userEmail = req.user.email; // Assuming req.user contains the user's email
//     sendEmailReminder(userEmail, eventDetails)
//     .then(() => {
//         console.log('Email sent successfully!');
//       })
//       .catch((error) => {
//         console.error('Error sending email:', error);
//       });
//   };
//     // Send email reminder for events on the same day and month
//     // const mailOptions = {
//     //   from: 'ljiljana@gmail.com',
//     //   to: req.user.email, // Assuming req.user contains the user's email
//     //   subject: 'Event Reminder',
//     //   text: `Today is your special day: ${date}`
//     // };
// // Create a Nodemailer transporter with your email configuration
// //SEND EMAIL
// const sendEmailReminder = (userEmail, eventDetails) => {
//     return new Promise(async (resolve, reject) => {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: 'your-email@gmail.com', // Replace with your Gmail email
//         accessToken: 'ACCESS_TOKEN' // Replace with the access token
//       }
//     });
  
//     try {
//       await transporter.sendMail({
//         from: 'your-email@gmail.com', // Replace with your Gmail email
//         to: userEmail,
//         subject: 'Event Reminder',
//         text: `Today is your special day: ${eventDetails.formattedDate}. 
//         Event Details: ${eventDetails.firstName} ${eventDetails.lastName}'s ${eventDetails.occasion}`
//       });
//       console.log('Email sent successfully!');
//       resolve();
//     } catch (error) {
//       console.error('Error sending email:', error);
//       reject(error);
//     }
//     }); 
// };

// module.exports = sendEmail;

// //     transporter.sendMail(mailOptions, (error, info) => {
// //       if (error) {
// //         console.error('Error sending email:', error);
// //       } else {
// //         console.log('Email sent:', info.response);
// //       }
// //     });

// //     upcomingEvents.push(eventDetails);
// //   } else {
// //     upcomingEvents.push(eventDetails);
// //   }
// // });

// console.log('Past events:', pastEvents);
// console.log('Upcoming events:', upcomingEvents);

// });







// // const sendEmail = require('./controllers/sDays'); // Adjust the path accordingly

// // const recipientEmail = 'recipient@example.com'; // Replace with the recipient's email
// // const accessToken = 'ACCESS_TOKEN'; // Replace with the access token
// // const emailContent = 'This is the email content.';

// // sendEmail(recipientEmail, accessToken, emailContent);
