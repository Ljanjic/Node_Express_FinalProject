const { StatusCodes } = require('http-status-codes');
const SpecialDay = require('../models/SpecialDay');
const { BadRequestError, NotFoundError } = require('../errors');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

// SENDING REMINDER EMAIL
// Function to send email for a specific event
const sendReminderEmail = async (event) => {
    try {
        console.log('Attempting to send reminder email...');
        // Fetch the user's email based on their ID

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // This is the SMTP server for Gmail
            port: 587, // This is the port for Gmail's SMTP server (secure TLS)
            secure: false, // Use secure connection (TLS)
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            // to: req.user.email,
            subject: 'SPECIAL DAY REMINDER: THERE IS SOME SPECIAL EVENT TODAY!',
            text: `REMINDER: TODAY IS THE SPECIAL DAY FOR ${event.firstName} ${event.lastName}. OCCASION: ${event.occasion}! SEND YOUR WISHES!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('Error fetching user email:', error);
    }
    console.log(`Sending email reminder for event: ${event.occasion}`);
};


// SEE ALL Special day reminders
const seeAllSdays = async (req, res) => {
    console.log("req.user.email ===> ", req.user.email);
    const sDays = await SpecialDay.find({ createdBy: req.user.userId })
        .sort('createdAt');
    console.log(sDays);
    // Extract 'occasion_date' from each document and create an array of dates
    const occasionDates = sDays.map(day => day.occasion_date);

    //EXTRA TASKS

    // Filter SpecialDays and Sort:
    const today = new Date();
    const pastEvents = [];
    const upcomingEvents = [];
    const eventsToday = [];

    occasionDates.forEach((occasionDate, index) => {
        const date = occasionDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const dayDate = occasionDate.getDate();
        const dayMonth = occasionDate.getMonth();

        const todayDate = today.getDate();
        const todayMonth = today.getMonth();

        const eventDetails = {
            id: sDays[index]._id,
            date,
            firstName: sDays[index].firstName,
            lastName: sDays[index].lastName,
            occasion: sDays[index].occasion,
        };

        if (dayMonth === todayMonth && dayDate === todayDate) {
            eventsToday.push(eventDetails);
        } else if (dayMonth < todayMonth || (dayMonth === todayMonth && dayDate < todayDate)) {
            pastEvents.push(eventDetails);
        } else {
            upcomingEvents.push(eventDetails);
        }
    });
    console.log('Your Special Day Reminder List:');
    console.log('Past events:', pastEvents);
    console.log('Upcoming events:', upcomingEvents);
    console.log('Events for today:', eventsToday);
    const events = {
        "pastEvents": pastEvents,
        "upcomingEvents": upcomingEvents,
        "eventsToday": eventsToday,
    }
    res.status(StatusCodes.OK).json({ events, count: sDays.length });

    // Send reminder for events today
    if (eventsToday.length > 0) {
        eventsToday.forEach(event => {
            console.log(`REMINDER: TODAY IS THE SPECIAL DAY FOR ${event.firstName} ${event.lastName}. OCCASION: ${event.occasion}! SEND YOUR WISHES!`);

        });
    };
};

// SEE specific Special Day Reminder input
const seeSday = async (req, res) => {
    const {
        user: { userId },
        params: { id: sDayId },
    } = req;

    const sDay = await SpecialDay.findOne({
        _id: sDayId,
        createdBy: userId,
    });
    if (!sDay) {
        throw new NotFoundError(`Special day reminder with entered id: ${sDayId} does not exist!`);
    };
    res.status(StatusCodes.OK).json({ sDay });
};

// ADD new Special Day reminder input
const createSday = async (req, res) => {
    console.log("req.body ===> ", req.body);
    req.body.createdBy = req.user.userId;
    const sDay = await SpecialDay.create(req.body);

    const currentDate = new Date();
    let existingDate = new Date(req.body.occasion_date);

    // This code is only needed to force email being sent 5 seconds after application start
    existingDate.setHours(currentDate.getHours());
    existingDate.setMinutes(currentDate.getMinutes());
    existingDate.setSeconds(currentDate.getSeconds() + 5);
    existingDate.setFullYear(currentDate.getFullYear());

    schedule.scheduleJob(existingDate, () => {
        console.log(`Scheduled job triggered for event: ${req.body.occasion}`);
        sendReminderEmail(req.body);
    });
    res.status(StatusCodes.CREATED).json({ sDay });
};

// UPDATE existing Special Day reminder event
const updateSday = async (req, res) => {
    const {
        body: {
            firstName, lastName, occasion, occasion_date, age
        },
        user: { userId },
        params: { id: sDayId },
    } = req;
    // Checking is any of fields empty, send an error if any field is empty
    if (firstName === '' || lastName === '' || occasion === '' || occasion_date === '' || age === '') {
        throw new BadRequestError('Check your input! Updated fields can not be empty!');
    };
    const sDay = await SpecialDay.findOneAndUpdate(
        {
            _id: sDayId,
            createdBy: userId
        },
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    if (!sDay) {
        throw new NotFoundError(`Special day input with id: ${sDayId} does not exist!`);
    };
    res.status(StatusCodes.OK).json({ sDay });
};

// DELETE existing Special Day input
const deleteSday = async (req, res) => {
    const {
        body: {
            firstName, lastName, occasion, occasion_date, age
        },
        user: { userId },
        params: { id: sDayId },
    } = req;

    const sDay = await SpecialDay.findByIdAndRemove({
        _id: sDayId,
        createdBy: userId
    });
    if (!sDay) {
        throw new NotFoundError(`Special Day input with entered id: ${sDayId} does not exist!`);
    };
    res.status(StatusCodes.OK).json({ msg: "The entry is succussfilly deleted." });
};

module.exports = {
    sendReminderEmail,
    seeAllSdays,
    seeSday,
    createSday,
    updateSday,
    deleteSday,
};