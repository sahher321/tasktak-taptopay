import axios from "axios";
import moment from "moment";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Dimensions, useWindowDimensions, FlatList, View, Image, Text, Button, TouchableOpacity, Platform, StatusBar, StyleSheet, ScrollView, Touchable } from "react-native";
import { Navigation } from "react-native-navigation";
import { AppTheme } from "../AppTheme/AppTheme";
import { APP_URL, GetAllAnnouncement, GetAllProjects } from "../Components/Api";
import { GoToNextController, Screenheight, ScreenWidth } from "../Components/General";
import UserPermissions from "../Components/UserPermissions";
import HTML from "react-native-render-html";
import SideBar from "../Components/SideBar";
import LinearGradient from 'react-native-linear-gradient';
import { ProgressView } from "@react-native-community/progress-view";
import { GetAllTasks,Services } from "../Components/Api";
import {Calendar} from 'react-native-calendars';

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

handleAllAnnouncementPressed = () => {
    GoToNextController("AllAnnouncement");
};

const Dashboard = (props) => {
    const {drawerStatus} = props;
    const [loading, setLoading] = useState(true);
    const [allTasks, setAllTasks] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [allServices, setAllServices] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(drawerStatus);
    const [getAllAssigment, setAllAssigment] = useState([]);
    const [getHeight, setHeight] = useState(130);
    const [getOpacity, setOpacity] = useState("flex");
    const [appointments, setAppointments] = useState([]);
    const [appointmentData, setAppointmentData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [filterDate, setFilterDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

    var capabilities = UserPermissions.capabilities;

    Navigation.events().registerComponentDidAppearListener((event) => {
        // Do something when a screen appears
        console.log(`Screen ${event.componentName} appeared`);
    });

    useEffect(() => {
        getTaskHandle();
        getProjectsHandle();
        getAppointmentsHandle();
        getAllServices()
    }, []);

const getAllServices =async  () => {
try{
    var response = await axios.get('https://nexttak.com/api/services');
    console.log('response ',response.data.data.sections[0].data)
    setAllServices(response.data.data.sections[0].data)
}
catch(error) {
    console.error('DFGDHFGDJ',error)
}

}







    useEffect(() => {
        // Register a listener for the screenDidAppear event
        Navigation.events().registerComponentDidAppearListener((event) => {
            // Do something when a screen appears
            setIsModalVisible(drawerStatus);
            console.log(`Screen ${event.componentName} appeared`);
        });

        // Register a listener for the screenDidDisappear event
        Navigation.events().registerComponentDidDisappearListener((event) => {
            // Do something when a screen disappears
            setIsModalVisible(drawerStatus);
            console.log(`Screen ${event.componentName} disappeared`);
        });
    }, []);
    useEffect(() => {

        // console.log("UserPermissions.permissions", UserPermissions.permissions)
        console.log("UserPermissions = =", JSON.stringify(UserPermissions.permissions, null, 2))
        console.log("Length", UserPermissions.permissions.length);
        UserPermissions.permissions.map((item, index) => {
            console.log("permission ITEM = ", item);
            if (item.feature_name == "") {
                return item;
            }
            if (capabilities[item.feature_name] == undefined) {
                capabilities[item.feature_name] = {}
                capabilities[item.feature_name].permissions = []
                capabilities[item.feature_name]?.permissions?.push(item?.capability || "");
            } else {
                capabilities[item.feature_name]?.permissions?.push(item?.capability || "");
            }
            return item;
        })

        apiPost()
    }, []);
    // handleAnnouncementSHowHide = () => {

    //     console.log("setHeightsetHeight", getHeight)

    //     if (getOpacity == "flex") {
    //         setHeight(50)
    //         setOpacity("none")

    //     }
    //     else {
    //         setHeight(130)
    //         setOpacity("flex")

    //     }
    // };
    const apiPost = async (s) => {

        console.log(`Announcement DATA`)

        axios.get(APP_URL.BaseUrl + GetAllAnnouncement, { "": "" })
            .then(data => {
                // console.log(`Announcement DATA = ${JSON.stringify(data.data.data, null, 2)}`)
                setAllAssigment(data.data.data);


            })
            .catch(e => {
                console.log(`Error =`, e)
            })
    };
    let allowedFeatures = ["Customer", "MailBox", "Contact", "Invoice", "Lead", "Staffs", "Project", "Task", "Ticket", "TimeSheet", "Appointly", "Payroll", "Proposals"]
    let AllPermissionsData = [
        { feature_name: "Client", icon: require("../Assets/Dashboard/ic_0.png"), color: "#0A3ADD" },
        { feature_name: "MailBox", icon: require("../Assets/Dashboard/ic_1.png"), color: "#0A3ADD" },
        { feature_name: "Invoice", icon: require("../Assets/Dashboard/ic_3.png"), color: "#4f71a0" },
        { feature_name: "Lead", icon: require("../Assets/Dashboard/ic_4.png"), color: "#008ece" },
        //  { feature_name: "Milestone", icon: require("../Assets/Dashboard/ic_5.png"), color: "#fcb352" },
        { feature_name: "Staffs", icon: require("../Assets/Dashboard/ic_6.png"), color: "#fbe268" },
        { feature_name: "Project", icon: require("../Assets/Dashboard/ic_7.png"), color: "#fcb352" },
        { feature_name: "Task", icon: require("../Assets/Dashboard/ic_8.png"), color: "#daf7a6" },
        { feature_name: "Ticket", icon: require("../Assets/Dashboard/ic_9.png"), color: "#fcb352" },
        //    { feature_name: "Credit Notes", icon: require("../Assets/Dashboard/ic_10.png"), color: "#4f71a0" },
        // { feature_name: "Estimates", icon: require("../Assets/Dashboard/ic_11.png"), color: "#4f71a0" },
        { feature_name: "TimeSheet", icon: require("../Assets/Dashboard/ic_12.png"), color: "#fbe268" },
        //    { feature_name: "Expenses", icon: require("../Assets/Dashboard/ic_13.png"), color: "#4f71a0" },
        { feature_name: "Appointly", icon: require("../Assets/Dashboard/ic_14.png"), color: "#fcb352" },
        { feature_name: "PayRoll", icon: require("../Assets/Dashboard/ic_14.png"), color: "#fcb352" },
        { feature_name: "Proposals", icon: require("../Assets/Dashboard/ic_15.png"), color: "#fcb352" },
    ];
    const handleProfilePress = () => {
        Navigation.push("AppStack", { component: { name: "EditProfile", options: { topBar: { visible: true } } } })
    };
    const DashBoardCell = ({ item, index }) => {

        const DashBoardItemColor = () => {

        }

        // const DashBoardItemColors = ["#0A3ADD" , "#0A3ADD" , "" ,"" , "" , "","","","","","" , "" , "" ,"" , ""]


        const handleIconPress = () => {

            console.log("index is", item.feature_name)

            if (item.feature_name == "Project") {

                GoToNextController("MyProjects")
            }
            else if (item.feature_name == "MailBox") {

                GoToNextController("Appointly")

             //   GoToNextController("MailBox")
            }

            else if (item.feature_name == "Staffs") {

                GoToNextController("Staff")
            }
            else if (item.feature_name == "Lead") {

              //  GoToNextController("Attendance")

                 GoToNextController("Lead")
            }
            else if (item.feature_name == "Task") {

                GoToNextController("AllProjects")
            }
            else if (item.feature_name == "TimeSheet") {

                GoToNextController("Attendance")
            }
            else if (item.feature_name == "Invoice") {
                GoToNextController("Invoice")
            }

            else if (item.feature_name == "Expenses") {
                GoToNextController("Expenses")
            }

            else if (item.feature_name == "Credit Notes") {

                GoToNextController("CreditNotes")
            }

            else if (item.feature_name == "Ticket") {

                GoToNextController("Tickets")
            }

            else if (item.feature_name == "Client" || item.feature_name == "Customer") {

                if (item.feature_name == "Customer") {
                    Navigation.push("AppStack", { component: { name: "Contacts", passProps: { permissions: capabilities["Customer"].permissions }, options: { topBar: { visible: true } } } });
                    return;
                }
                GoToNextController("Contacts")

            }

            else if (item.feature_name == "Appointly") {
                GoToNextController("Appointly")
            }

            else if (item.feature_name == "Proposals") {
                GoToNextController("Proposals")
            }
            return
            if (index == 1) {
                GoToNextController("MailBox")
            }


            else if (index == 2) {
                GoToNextController("Contacts")
            }
            else if (index == 3) {
                GoToNextController("Invoice")
            }
            else if (index == 6) {
                GoToNextController("Staff")
            }
            else if (index == 7) {
                GoToNextController("MyProjects")
            }
            else if (index == 8) {

                GoToNextController("AllProjects")
            }
            else if (index == 10) {

                GoToNextController("CreditNotes")
            }

            else if (index == 12) {

                GoToNextController("Attendance")
            }

        }
        const { width, height } = Dimensions.get('screen');

        return (

            <View style={{ marginEnd: index % 3 == 2 ? 0 : 40, }}>
                <TouchableOpacity style={{ alignItems: "center" }} onPress={handleIconPress}>

                    <View style={{ width: width / 3 - 60, height: width / 3 - 60, borderRadius: 10, backgroundColor: "#000060", alignItems: "center", justifyContent: "center" }}>

                        {
                            <Image style={{ width: 32, height: 32 }} source={UserPermissions.permissions.length == 0 ? item.icon : { uri: item.icon }} />
                        }
                    </View>
                    <Text style={{ textAlign: "center", marginTop: 5, fontSize: 12, width: width / 3 - 50 }} numberOfLines={2}>{item.feature_name}</Text>
                </TouchableOpacity>


            </View>
        )
    };
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const getTaskHandle = () => {
        try {
            setLoading(true);
            var myHeaders = new Headers();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${APP_URL.BaseUrl}${GetAllTasks}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                const slicedArray = result.slice(0, 3);
                setAllTasks(slicedArray);
            }).catch((error) => {
                setLoading(false);
                console.log('TASK CATCH ERROR =====>', error?.message);
            });
        } catch (error) {
            setLoading(false);
            console.log("TASK CATCH ERROR ======> ", error?.message);
        }
    };
    const getProjectsHandle = () => {
        try {
            setLoading(true);
            var myHeaders = new Headers();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${APP_URL.BaseUrl}${GetAllProjects}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                const slicedArray = result.slice(0, 6);
                setAllProjects(slicedArray);
            }).catch((error) => {
                setLoading(false);
                console.log('PROJECTS CATCH ERROR =====>', error?.message);
            });
        } catch (error) {
            setLoading(false);
            console.log("PROJECTS CATCH ERROR ======> ", error?.message);
        }
    };
    const getAppointmentsHandle = () => {
        try {
            const staff_id = UserPermissions.user_data[0]?.staffid;
            var myHeaders = new Headers();
            var formdata = new FormData();
            // formdata.append("staff_id", "73");
            formdata.append("staff_id", staff_id);
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
                const array = [];
                if (result?.code === 200) {
                    if (result?.data !== "Not Found.") {
                        result?.data?.map(item => {
                            array?.push({mraked: false, date: item?.date});
                        });
                        const object = array.reduce((obj, item) => {
                            obj[item.date] = item;
                            return obj;
                        }, {});
                        setAppointments(object);
                        setAppointmentData(result?.data);
                    }
                };
            }).catch((error) => {
                console.log("APPOINTMENTS ERROR =====> ", error?.message);
            });
        } catch (error) {
            console.log("APPOINTMENTS ERROR =====> ", error?.message);
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
    const {width} = useWindowDimensions();
    
    return (
        <View style={{flex:1}}>
            <StatusBar 
                backgroundColor={"#FFF"}
                barStyle={"dark-content"}
            />
            <View style={{flexDirection:"row",paddingTop:40,paddingVertical:12}}>
                <View style={{justifyContent:"center",paddingLeft:14}}>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={toggleModal}>
                        <Image
                            source={require("../Assets/menu.png")}
                            style={{height:25,width:25,resizeMode:"cover",tintColor:"#000"}}
                        />
                    </TouchableOpacity>
                    <SideBar
                        toggleModal={toggleModal}
                        isModalVisible={isModalVisible}
                    />
                </View>
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Image
                        source={require("../Assets/logo.png")}
                        style={{width:120,height:40,resizeMode:"contain"}}
                    />
                </View>
                <View style={{justifyContent:"center",paddingLeft:14,paddingRight:7}}>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => GoToNextController("Notification")}
                        >
                        <Image
                            source={require("../Assets/bell.png")}
                            style={{height:20,width:20,resizeMode:"contain",tintColor:"#000"}}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:"center",paddingRight:14,paddingLeft:7}}>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={handleProfilePress}>
                        <Image
                            source={require("../Assets/user.png")}
                            style={{height:20,width:20,resizeMode:"contain",tintColor:"#000"}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
            <View  
            style={{ padding: 30,flexDirection: 'row', flexWrap: 'wrap' }}
            >
      {allServices.map(service => (
        <TouchableOpacity key={service.service_name} 
        style={{ justifyContent: 'center', alignItems: 'center', margin: 10}}
        onPress={()=>GoToNextController("Signin")}
        >
            
            <Image
            source={{ uri: service.icon }}
            style={{ height: 50, width: 50 }}
            />



          
          <Text style={{fontSize:10,margin:2}} >{service.service_name}</Text>
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
       
        </View>
    )
}

const styles = StyleSheet.create({
    taskBoxStyle: {
        backgroundColor: "#FFF",
        marginTop: 12,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
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
    projectBoxStyle: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: Dimensions.get("window").width/1.2,
        marginVertical: 12,
        marginHorizontal: 12,
    },
})

export default Dashboard