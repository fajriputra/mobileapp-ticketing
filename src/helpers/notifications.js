import PushNotification from 'react-native-push-notification';

class Notifications {
  constructor() {
    PushNotification.createChannel(
      {
        channelId: 'Reminders',
        channelName: 'Reminders Notifications',
        channelDescription: "Don't forget to do",
      },
      created => console.log('Create channel Returned =>', created),
    );
  }

  reminderNotifications(title, message) {
    PushNotification.localNotification({
      channelId: 'Reminders any notifications',
      title: title,
      message: message,
      largeIcon: 'ic_launcher',
    });
  }

  scheduleNotifications(message) {
    PushNotification.localNotificationSchedule({
      channelId: 'Reminders any notifications',
      title: 'Tickitz notifications',
      message: message,
      repeatType: 'day',
      repeatTime: 1,
      largeIcon: 'ic_launcher',
    });
  }
}

export default new Notifications();
