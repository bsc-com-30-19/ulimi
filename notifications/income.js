const scheduleWeeklyIncomeReminder = () => {
    PushNotification.localNotificationSchedule({
        channelId: "financial-tracking",
        title: "Income Review",
        message: "Check your income entries for this week!",
        repeatType: "week",  // Repeats every week
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // Starts a week from now
        allowWhileIdle: true,
    });
};
