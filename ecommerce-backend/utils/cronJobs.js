const cron = require('node-cron');
const Order = require('../models/Order');
const sendEmail = require('./sendEmail'); // Ensure path is correct based on your structure
const moment = require('moment');

const startCronJobs = () => {
  // Runs every day at 08:00 AM
  cron.schedule('0 8 * * *', async () => {
    console.log("[CRON] Running Daily EMI Reminder Check...");

    try {
      const today = moment().startOf('day');
      const plus5Days = moment(today).add(5, 'days');
      const plus2Days = moment(today).add(2, 'days');

      const upcomingEmis = await Order.find({
        isEmiOrder: true,
        'emiDetails.schedule.status': 'Pending',
        'emiDetails.isForeclosed': false
      }).populate('user', 'email name');

      let overdueCount = 0;

      for (let order of upcomingEmis) {
        const nextEmi = order.emiDetails.schedule.find(e => e.status === 'Pending');
        if (!nextEmi) continue;

        const dueDate = moment(nextEmi.dueDate).startOf('day');
        const emailTo = order.user?.email || order.shippingAddress?.email;

        // 5 Days Before
        if (dueDate.isSame(plus5Days) && emailTo) {
          await sendEmail({ email: emailTo, subject: "Action Required: EMI Due in 5 Days", message: `Your EMI of ₹${nextEmi.amountDue} is due on ${dueDate.format('DD MMM')}. Please ensure sufficient funds are in your account for auto-debit.` });
        }

        // 2 Days Before
        if (dueDate.isSame(plus2Days) && emailTo) {
           await sendEmail({ email: emailTo, subject: "URGENT: EMI Due in 2 Days", message: `Your EMI of ₹${nextEmi.amountDue} is due on ${dueDate.format('DD MMM')}. Avoid late fees by keeping your account funded.` });
        }

        // Overdue (Weekly Reminders)
        if (dueDate.isBefore(today)) {
          overdueCount++;
          // If it's Monday, Wednesday, or Friday, nag them (3x a week)
          if ([1, 3, 5].includes(today.isoWeekday()) && emailTo) {
            await sendEmail({ email: emailTo, subject: "OVERDUE: EMI Payment Missed", message: `Your EMI payment of ₹${nextEmi.amountDue} was due on ${dueDate.format('DD MMM')}. Please clear your dues immediately to avoid legal action or negative credit reporting.` });
          }
        }
      }

      // Admin Daily Alert for Overdue accounts
      if (overdueCount > 0) {
         const adminEmail = process.env.EMAIL_USER; // Your admin email
         await sendEmail({ email: adminEmail, subject: `[ADMIN ALERT] ${overdueCount} EMIs Overdue`, message: `You have ${overdueCount} overdue EMI payments. Check the admin dashboard.`});
      }

    } catch (error) {
      console.error("[CRON] Error running EMI checks:", error);
    }
  });
};

module.exports = startCronJobs;