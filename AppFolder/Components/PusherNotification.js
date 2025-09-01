import { Platform } from "react-native";
// import { PUSHER_BEAMS_INSTANCE_ID } from "react-native-dotenv";
// import reactNativePusherPushNotifications from "react-native-pusher-push-notifications";
// import RNPusherPushNotifications from "react-native-pusher-push-notifications";

export const init = () => {
    // reactNativePusherPushNotifications
    // reactNativePusherPushNotifications.setInstanceId("8e5bdb84-3029-458c-bc78-e33723beb971");

    // reactNativePusherPushNotifications.on("notification", handleNotification);
    // reactNativePusherPushNotifications.setOnSubscriptionsChangedListener(onSubscriptionsChanged);

    // console.log(`Init - setUserId`);
    // reactNativePusherPushNotifications.setUserId("user-01","f097b1ac-3425-4c8a-adb4-180c1454249f",(onError)=>{console.log("is Error noti" , onError)} ,(succ)=>{console.log("is succ noti" , succ)} )
};

export async function setupPusher() {
//     const pusher = RNPusherPushNotifications.getInstance();

//     await pusher.init({
//         apiKey: "8e5bdb84-3029-458c-bc78-e33723beb971",
//         cluster: "us2"
//     });
    
//     await pusher.connect();
}

export const subscribe = (interest) => {
    console.log(`Subscribing to "${interest}"`);
    // reactNativePusherPushNotifications.subscribe(
    //     interest,
    //     (statusCode, response) => {
    //         console.error(statusCode, response);

    //     },
    //     () => {
    //         console.log(`CALLBACK: Subscribed to ${interest}`);
    //     }
    // );
};

const handleNotification = (notification) => {
    console.log(notification);
    if (Platform.OS === "ios") {
        console.log("CALLBACK: handleNotification (ios)");
    } else {
        console.log("CALLBACK: handleNotification (android)");
        console.log(notification);
    }
};

const onSubscriptionsChanged = (interests) => {
    console.log("CALLBACK: onSubscriptionsChanged");
    console.log(interests);
}