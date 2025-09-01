import React, {useEffect, useState} from "react";
import {View, Text, Modal, Button, StyleSheet, Image, ScrollView} from "react-native";
import {Calendar} from 'react-native-calendars';
import {APP_URL, GetAllAppointments} from "../Components/Api";
import Loader from "../Components/Loader";
import UserPermissions from "../Components/UserPermissions";
import moment from "moment";

const dummyAppointments = {
    '2023-05-01': { marked: false },
    '2023-05-02': { marked: false },
    '2023-05-14': { marked: false },
    '2023-06-10': { marked: false },
    '2023-07-30': { marked: false },
};
const customStyles = {
    container: {
        elevation: 2,
        borderRadius: 20,
        backgroundColor: '#1b1366',
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
    },
};

const AppointmentCalendar = () => {
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [appointmentData, setAppointmentData] = useState({});
    const [filterDate, setFilterDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

    useEffect(() => {
        getAllAppointment();
    },[]);
    const getAllAppointment = () => {
        try {
            setLoading(true);
            var myHeaders = new Headers();

            var formdata = new FormData();
            // UserPermissions.user_data[0]?.staffid
            formdata.append("staff_id", "73");
            formdata.append("appointment_status", "upcoming");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${APP_URL.BaseUrl}/api/appointments/getAppointment`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                const array = [];
                if (result?.code === 200) {
                    result?.data?.map(item => {
                        array?.push({mraked: false, date: item?.date});
                    });
                    const object = array.reduce((obj, item) => {
                        obj[item.date] = item;
                        return obj;
                    }, {});
                    setAppointments(object);
                    console.log("result?.data =====> ", result?.data);
                    setAppointmentData(result?.data);
                };
            }).catch((error) => {
                setLoading(false);
                console.log("ERROR =====> ", error?.message);
            });
        } catch (error) {
            setLoading(false);
            console.log('ERROR =====> ', error?.message);
        }
    };
    const handleDayPress = (day) => {
        const isAppointment = appointments[day.dateString] !== undefined;
        // if (isAppointment) {
            setSelectedDate(day.dateString);
            console.log("day.dateString =====> ", day.dateString);
            setFilterDate(day.dateString);
            // setModalVisible(true);
        // }
    };
    const markedDates = {};
    Object.keys(appointments).forEach((key) => {
        markedDates[key] = {
            ...appointments[key],
            customStyles: customStyles,
        };
    });
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentMonthString = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
    const minDate = `${currentYear}-${currentMonthString}-01`;

    return (
        <View style={{flex:1}}>
            <Loader loading={loading} />
            <View style={{marginBottom:12}}>
                <Calendar
                    markingType="custom"
                    markedDates={markedDates}
                    onDayPress={handleDayPress}
                />
            </View>
            <ScrollView>
                <View style={{padding:16}}>
                    <Text style={{fontSize:16,color:"#1b1366",fontFamily:'Prompt-Bold'}}>
                        {moment(filterDate).format("dddd, MMMM Do YYYY")}
                    </Text>
                    {Array.isArray(appointmentData) && appointmentData.map((val, key) => {
                        console.log("filterDate =====> ", filterDate);
                        if (val?.date === filterDate) {
                            return (
                                <View
                                    key={key}
                                    style={styles.appointymentBoxStyle}>
                                    <View style={{justifyContent:"center",paddingLeft:10,paddingVertical:12,borderLeftWidth:8,borderLeftColor:"#1b1366",borderRadius:8}}>
                                        <Image
                                            source={require("../Assets/avartor.png")}
                                            style={{height:50,width:50,borderRadius:100,resizeMode:"cover"}}
                                        />
                                    </View>
                                    <View style={{flex:1,justifyContent:"center",marginLeft:10,paddingVertical:12}}>
                                        <Text style={{fontSize:16,color:"#1b1366",fontFamily:'Prompt-Bold'}}>
                                            {val?.name}
                                        </Text>
                                        <Text numberOfLines={2} style={{fontSize:12,color:"#000",opacity:.6,fontFamily:'Prompt-Light'}}>
                                            {val?.description}
                                        </Text>
                                    </View>
                                    <View style={{justifyContent:"center",paddingRight:10,marginVertical:5,borderRightWidth:3,borderRightColor:"#1b1366"}}>
                                        <Text style={{fontSize:12,color:"#1b1366",textTransform:"uppercase",fontFamily:'Prompt-Bold'}}>
                                            {val?.start_hour}{'\n'} PM
                                        </Text>
                                    </View>
                                </View>
                            )
                        }
                    })}
                </View>
            </ScrollView>
            <Modal
                statusBarTranslucent
                visible={modalVisible}
                animationType={"slide"}>
                <View style={{marginTop:60,backgroundColor:"#0000"}}>
                    <Text style={{fontSize:24,fontWeight:"bold",textAlign:"center"}}>
                        Appointment Detail
                    </Text>
                    <View style={{padding:20}}>
                        <Text style={{fontSize:18,fontWeight:"bold",textAlign:"center"}}>
                            Appointment Date {selectedDate}
                        </Text>
                    </View>
                    <View style={{marginHorizontal:20}}>
                        <Button
                            title="Close"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    appointymentBoxStyle: {
        flexDirection: "row",
        backgroundColor: "#DBE5F6",
        marginTop: 12,
        borderRadius: 8,
        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
})

export default AppointmentCalendar;
