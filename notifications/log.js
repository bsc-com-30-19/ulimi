const scheduleDailyLogReminder = () => {
    PushNotification.localNotificationSchedule({
        channelId: "financial-tracking",
        title: "Daily Log Reminder",
        message: "Remember to log your expenses and income for today!",
        repeatType: "day",  // Repeats every day
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),  // Starts tomorrow
        allowWhileIdle: true,
    });
};
