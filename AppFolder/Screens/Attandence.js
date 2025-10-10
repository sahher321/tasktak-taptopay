import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, Platform, PermissionsAndroid, ToastAndroid, Linking, Alert, ActivityIndicator} from "react-native";
import {ScreenWidth} from "../Components/General";
import {Selectset} from "../Components/SelectList";
import {APP_URL, markAttendence} from "../Components/Api";
import axios from "axios";
import moment from "moment";
import DropDownPicker from 'react-native-dropdown-picker';
import Geolocation from 'react-native-geolocation-service';
import UserPermissions from "../Components/UserPermissions";

const dummy = [
    {id: 1, value: "Mark In"},
    {id: 2, value: "Mark Out"},
];

const Attendance = () => {

    const [markV, setmarkV] = useState(null);
    const [loader, setLoader] = useState(true);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [markvalueData, setmarkvalueData] = useState(dummy);
    const [currentLatitude, setCurrentLatitude] = useState(null);
    const [currentLongitude, setCurrentLongitude] = useState(null);

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {

        setLoader(true);
        const hasLocationPermission = await hasLocationPermissions();
        if (!hasLocationPermission) {
            return;
        };
        Geolocation.getCurrentPosition(
            (position) => {
                const currentLatitude = JSON.stringify(position.coords.latitude);
                setCurrentLatitude(currentLatitude);
                console.log("currentLatitude =====> ", currentLatitude);
                
                const currentLongitude = JSON.stringify(position.coords.longitude);
                setCurrentLongitude(currentLongitude);
                console.log("currentLongitude =====> ", currentLongitude);
                setLoader(false);
            },
            (error) => {},
            {
                accuracy: {
                    ios: 'best',
                    android: 'high',
                },
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                showLocationDialog: true,
                enableHighAccuracy: true,
                forceRequestLocation: true,
            },
        );
    };
    const hasLocationPermissions = async () => {

        if (Platform.OS === 'ios') {
            const hasPermission = await hasLocationPermissionsIOS();
            return hasPermission;
        };
    
        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        };
    
        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    
        if (hasPermission) {
            return true;
        };
    
        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    
        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        };
    
        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        };
        return false;
    };
    const hasLocationPermissionsIOS = async () => {

        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');
    
        if (status === 'granted') {
            return true;
        };
    
        if (status === 'denied') {
            Alert.alert('Location permission denied');
        };
    
        if (status === 'disabled') {
            Alert.alert(
                `Turn on Location Services to allow Bakery App to determine your location.`,
                '',
                [
                    { text: 'Go to Settings', onPress: openSetting },
                    { text: "Don't Use Location", onPress: () => { } },
                ],
            );
        };
        return false;
    };

    const markAttendenceHandle = async () => {

        try {
            if (markV === null) {
                alert("Please select Check-in type!");
            } else {
                setButtonLoader(true);
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    point_id : "",
                    edit_date: date,
                    type_check: markV,
                    staff_id: UserPermissions.user_data[0]?.staffid,
                    location_user: `${currentLatitude},${currentLongitude}`,
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`${APP_URL.BaseUrl}${markAttendence}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setButtonLoader(false);
                    console.log("RESULT =====> ", result);
                }).catch((error) => {
                    setButtonLoader(false);
                    console.log("ERROR =====> ", error?.message);
                });
            }
        } catch (error) {
            setButtonLoader(false);
            console.log("ERROR =====> ", error?.message);
        }
    };
    function DropPicker() {
        
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [items, setItems] = useState([
            { label: 'Time In', value: 'movein' },
            { label: 'Time Out', value: 'moveout' },

        ]);
        return (<DropDownPicker style={{ alignSelf: "center", justifyContent: "center", width: ScreenWidth - 100, marginTop: 50 }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            DropDownDirectionType="Top"
        />)
    };

    var date = moment().utcOffset('+05').format('MM-DD-YYYY');
    var date2 = moment().utcOffset('+05').format('hh:mm a');

    if (loader) {
        return (
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size={"small"} />
            </View>
        )
    } else {
        return (
            <View style={{flex:1,alignSelf:"center",width:'90%'}}>
                <View style={{marginTop:20,width:'80%',alignSelf:"center"}}>
                    <Selectset
                        save={"key"}
                        value={markV}
                        title={'name'}
                        arraydata={markvalueData}
                        setSelected={(e) => {
                            if (e === "Mark In") {
                                setmarkV("1");
                            } else if (e === "Mark Out") {
                                setmarkV("2");
                            } else {
                                setmarkV(null);
                            }
                        }} 
                    />
                </View>
                <View style={{backgroundColor:"#3B3B3D",height:120,alignSelf:"center",justifyContent:"center",width:ScreenWidth-100,marginTop:50,borderRadius:10}}>
                    <Text style={{fontSize:24,textAlign:"center",color:"white"}}>
                        {date + "\n" + date2}
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={markAttendenceHandle}
                    style={{backgroundColor:"#777777",height:45,alignSelf:"center",justifyContent:"center",width:ScreenWidth-100,marginTop:50,borderRadius:5}}>
                    {buttonLoader ? 
                        <ActivityIndicator color={"#000"} />
                    :
                        <Text style={{fontSize:20,textAlign:"center",color:"white"}}>
                            Submit
                        </Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

export default Attendance;