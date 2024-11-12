const scheduleSalesExpenseNotification = () => {
    PushNotification.localNotificationSchedule({
        channelId: "financial-tracking",
        title: "Sales and Expenses",
        message: "Log your sales and expenses to keep your records updated.",
        repeatType: "day",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),  // Starts tomorrow
        allowWhileIdle: true,
    });
};
