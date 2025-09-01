import React, { useEffect } from "react";
import messaging from '@react-native-firebase/messaging'
import firebase from '@react-native-firebase/app'

import { View, Text, Image, Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import { init, setupPusher, subscribe } from "../Components/PusherNotification";
import UserPermissions from "../Components/UserPermissions";
import Dashboard from "./DashBoard";
import { toHome } from "../Components/AppRoutes";

export function getFCM() {
    const isAndroid = Platform.OS == 'android';
    messaging()
        .getToken(firebase.app().options.messagingSenderId)
        .then(x => {
            // ASKING FOR PERMISSION TO SEND NOTIFCATION.
            // PushNotification.requestPermissions().then(() => { });
            // REGISTERING DIFFERENT CHANNELS OF ANDROID TO EASLY SEND LOCAL NOTIFICATION.

            console.log(`FIREBASE_TOKEN => ${x}`)
            return x;
        })
        .catch(e => {
            console.log(e)
            return null;
        });
}


const Splash = () => {
    useEffect(() => {
        setTimeout(() => {
            init()
            // subscribe("TaskTak")
            // setupPusher()
            getFCM()
            PushToNext()



        }, 3000);
    }, [])

    function func () {
        toHome();
    }
    function PushToNext() {


        console.log(" UserPermissions.user_data?" ,  UserPermissions.user_data)

        UserPermissions?.user_data?.length > 0 ? func() : Navigation.setStackRoot("AppStack", { component: { name: "Dashboard", options: { topBar: { visible: false } } } })
    }

    return (

        <View>

            <Image style={{ width: "100%", height: "100%" }} source={require("../Assets/splash.png")} />



        </View>
    )
}

export default Splash;