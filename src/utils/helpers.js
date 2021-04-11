import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';
export const NOTIFICAITON_KEY = 'flashcards::notifications'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICAITON_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);
}


export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICAITON_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            console.log("Scheduling Notification")
                            Notifications.scheduleNotificationAsync({
                                content: {
                                    title: "Complete one quiz!",
                                    body: "Don't forget to complete at least one quiz today!",

                                },
                                trigger: {
                                    // type: 'timeInterval',
                                    seconds: (60*60)*24, //one day
                                    repeats: true,
                                }
                            })
                            AsyncStorage.setItem(NOTIFICAITON_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}