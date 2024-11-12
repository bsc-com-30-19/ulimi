useEffect(() => {
    // Configure push notifications and set up channels
    PushNotification.configure({
        onNotification: (notification) => {
            console.log("Notification:", notification);
        },
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
    });
    
    PushNotification.createChannel(
        {
            channelId: "financial-tracking",
            channelName: "Financial Tracking Notifications",
            importance: 4,
            vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`)
    );

    // Schedule notifications
    scheduleDailyLogReminder();
    scheduleWeeklyIncomeReminder();
    scheduleSalesExpenseNotification();
    scheduleMonthlySummary();
}, []);
