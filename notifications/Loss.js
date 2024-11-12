const checkAndNotifyLosses = (lossAmount) => {
    if (lossAmount > threshold) {  // threshold can be a predefined or user-defined value
        PushNotification.localNotification({
            channelId: "financial-tracking",
            title: "Loss Alert",
            message: "Your losses have exceeded the set threshold. Review your expenses!",
            allowWhileIdle: true,
        });
    }
};
