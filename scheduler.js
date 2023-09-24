const SpecialDay = require('./models/SpecialDay');
const schedule = require('node-schedule');
const sendReminderEmail = require('./controllers/email');

const startScheduler = async () => {
    // First, get a list of all future dates that need to be scheduled:
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;  // Months are zero-indexed
    const currentDay = currentDate.getDate();
    let upcomingSpecialDays;
    try {
        // Fetch all special days
        const allSpecialDays = await SpecialDay.find({}).sort({ occasion_date: 1 });
        console.log(allSpecialDays);
        // Filter special days based on month and day
        upcomingSpecialDays = allSpecialDays.filter(specialDay => {
            const occasionDate = new Date(specialDay.occasion_date);
            const occasionMonth = occasionDate.getMonth() + 1;
            const occasionDay = occasionDate.getDate();

            if (occasionMonth > currentMonth) {
                return true;
            } else if (occasionMonth === currentMonth && occasionDay >= currentDay) {
                return true;
            }

            return false;
        });

        // console.log(upcomingSpecialDays);
    } catch (error) {
        console.error('Error fetching upcoming SpecialDays:', error);
        throw error;
    }

    upcomingSpecialDays.forEach((event) => {
        const currentDate = new Date();
        let existingDate = new Date(event.occasion_date);

        // This code is only needed to force email being sent 5 seconds after application start
        existingDate.setHours(currentDate.getHours());
        existingDate.setMinutes(currentDate.getMinutes());
        existingDate.setSeconds(currentDate.getSeconds() + 5);
        existingDate.setFullYear(currentDate.getFullYear());

        schedule.scheduleJob(existingDate, () => {
            console.log(`Scheduled job triggered for event: ${event.occasion}`);
            sendReminderEmail(event);
        });
    });
}
module.exports = startScheduler;