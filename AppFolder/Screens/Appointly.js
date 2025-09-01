import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, useWindowDimensions, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { AppTheme } from "../AppTheme/AppTheme";
import { GoToNextController, Screenheight, ScreenWidth } from "../Components/General";
import { ProgressView } from "@react-native-community/progress-view";
import { Navigation } from "react-native-navigation";
import axios from "axios";
import { APP_URL, GetAllAppointments, GetAllLeads, GetAllProjects } from "../Components/Api";
import moment from "moment";
import Loader from "../Components/Loader";
import AppointmentContact from "./AppointmentContact";
import UserPermissions from "../Components/UserPermissions";

// const SecondRoute = () => (
//     // <FirstRoute />
// );


// const ThirdRoute = () => (
//     // <FirstRoute />
// );

// const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//     Third: ThirdRoute,

// });
// const renderTabBar = props => {
//     return (
//         <TabBar
//             {...props}
//             // tabStyle={{}}
//             scrollEnabled={true}
//             tabStyle={{ alignItems: 'center', width: ScreenWidth / 2 - 70, height: 40, justifyContent: 'center' }}
//             indicatorStyle={{ backgroundColor: AppTheme.PrimaryColor }}
//             // indicatorStyle={styles.indicatorStyle}
//             // indicatorContainerStyle={{backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
//             style={{ backgroundColor: "white", paddingBottom: 5 }}
//             renderLabel={({ route, focused, color }) => (
//                 <Text style={{ color: focused ? AppTheme.PrimaryColor : "lightgrey", margin: 0, fontSize: 14, fontWeight: 'bold' }}>
//                     {route.title}
//                 </Text>
//             )}
//             bounces={true}
//         />
//     );
// // }
// export function TabViewExample() {
//     const layout = useWindowDimensions();

//     const [index, setIndex] = React.useState(0);
//     const [routes] = React.useState([
//         { key: 'first', title: 'OnGoing' },
//         { key: 'second', title: 'Pending' },
//         { key: 'Third', title: 'Under Review' },

//     ]);


//     return (
//         <TabView
//             style={{ width: ScreenWidth }}
//             navigationState={{ index, routes }}
//             renderScene={renderScene}
//             renderTabBar={renderTabBar}
//             onIndexChange={setIndex}
//             initialLayout={{ width: layout.width }}
//         />
//     );
// }

handleNewProjectPressed = () => {
    GoToNextController("AddNewProject");
};

const Appointly = () => {
    const FirstRoute = () => {
        return (
            <View style={{ marginLeft: 25 }}>
                <FlatList
                    keyExtractor={(_, index) => String(index)}
                    ListHeaderComponent={
                        <>
                            <FlatList
                                renderItem={ProjectDetail}
                                data={sortedDataAllTasks}
                                keyExtractor={(_, index) => String(index)}
                            />
                        </>
                    }
                />
            </View>
        );
    }

    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = React.useState("");
    const [dataAllProjects, setDataAllProjects] = useState([]);
    const [sortedDataAllTasks, setSortedDataAllTasks] = useState([]);

    useEffect(() => {
        setLoading(false);
        apiPost();
    }, []);
    const onSearch = (text) => {
        console.log("TEXT ", text)
        if (text.length > 0) {
            let sorted = dataAllProjects.filter(function (item) {
                console.log(item.subject)
                console.log(item.subject.toLowerCase().includes(text.toLowerCase()))
                return item.subject.toLowerCase().includes(text.toLowerCase());
            })
            setSortedDataAllTasks(sorted);
            return;
        }
        setSortedDataAllTasks(dataAllProjects);
    };
    const apiPost = async (s) => {
        setLoading(true);
        console.log("staff_id ====> ", UserPermissions.user_data[0]?.staffid);
        axios.post(APP_URL.BaseUrl + GetAllAppointments, { "staff_id": UserPermissions.user_data[0]?.staffid })
        .then(data => {
            setLoading(false);
            setDataAllProjects(data.data.data);
            setSortedDataAllTasks(data.data.data);
        }).catch(e => {
            setLoading(false);
        })
    };

    return (
        <View style={{ flex: 1, marginTop: '5%', alignItems: "center" }}>
            <View style={{ flexDirection: "row", width: "90%" }}>
                <Text style={{ marginLeft: 0, fontSize: 20 }}>Appointly</Text>
                {/* <TouchableOpacity style={{ alignItems: "flex-end", flex: 1 }} onPress={handleNewProjectPressed}> */}
                <TouchableOpacity
                    onPress={() => GoToNextController("AppointmentCalendar")}
                    style={{alignItems:"flex-end",flex:1}}>
                    <Text style={{ fontSize: 20 }}>Appointment Date</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: "flex-end", flex: 1 } } onPress ={handleCreateNew} >
                    <Text style={{ fontSize: 20 }}>Create New</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", flexDirection: "row", height: 40, borderRadius: 5, borderColor: "lightgray", borderWidth: 1, marginTop: 20, width: "85%" }} >
                <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={require("../Assets/ic_search.png")} />
                {/* <TextInput value={searchText} onChangeText={(t) => { setSearchText(t) }} style={{ flex: 1, marginLeft: 10 }} placeholder={"Search"} /> */}
                <TextInput
                    style={{ flex: 1, marginLeft: 10 }}
                    placeholder={"Search"}
                    onChangeText={onSearch}
                />
                <Image style={{ width: 50, height: 25, marginRight: 10, alignItems: "flex-end" }} source={require("../Assets/filter.png")} />
            </View>
            <FirstRoute />
            <Loader loading={loading} />
        </View>
    )
}

handleCreateNew = () => {
    GoToNextController("AppointmentContact");
};

const ProjectDetail = ({ item }) => {
    const projectTap = () => {
        //console.log(`Item =>` , calculate('2022-09-13 07:39:07', '2022-09-16 11:41:52'))

        // 79


        //   2020-09-29 07:39:07
        //    calculate('02-12-2021 04:30:00 PM', '05-12-2021 04:10:00 PM');
        // return;

        //    console.log ("items in lead" , item)

        //    return
        //  GoToNextController("ProjectDetail")

    //   Navigation.push("AppStack", { component: { passProps: { item }, name: "LeadsDetail", options: { topBar: { visible: true } } } })

    }
    return (
        <TouchableOpacity>
            <View style={{ width: ScreenWidth / 1.0 - 50, borderColor: AppTheme.BorderColor, borderWidth: 1, borderRadius: 8, marginTop: 16, marginEnd: 10 }}>
                <View style={{ marginLeft: 12, marginTop: 12, flexDirection: 'row' }}>
                    <Text style={{ flex: 1, marginLeft: 5, fontSize: 14, fontStyle: "normal", alignSelf: "center" }}>{"Subject: " + item.subject}</Text>
                    {/* <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, backgroundColor: AppTheme.PrimaryColor, marginRight: 15, alignSelf: "center" }}>
                        <Text style={{ fontSize: 12, fontStyle: "normal", color: "white", alignSelf: "center", justifyContent: "center" }}>{item.status}</Text>
                    </View> */}                    
                </View>
                <Text style={{ marginTop: 12, marginLeft: 16, fontSize: 14, fontStyle: "normal" }}>{"Source: " + item.source || "N/A"}</Text>
                <Text style={{ marginTop: 12, marginLeft: 16, fontSize: 14, fontStyle: "normal" }}>{"Phone: " + item.phone || "N/A"}</Text>
                <Text style={{ marginTop: 12, marginLeft: 16, fontSize: 14, fontStyle: "normal" }}>{item.approved == "0" ? "Status : Approved : Yes" : "Approved: No" || "N/A"}</Text>
                <Text style={{ marginTop: 12, marginLeft: 14, fontSize: 14, fontStyle: "normal" }}>{"Description: " + item.description || "N/A"}</Text>
                <View style={{ marginLeft: 16, marginTop: 12, flexDirection: 'row', marginBottom: 10 }}>
                    <Image style={{ width: 25, height: 25 }} source={require("../Assets/ic_calender.png")} />
                    <Text style={{ marginLeft: 5, fontSize: 12, fontStyle: "normal", alignSelf: "center" }}>{item.date}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 16, marginBottom: 12 }}>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => alert("VIEW PRESS")}
                        style={{justifyContent:"center"}}>
                        <Text style={{color: "blue"}}>View | </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => alert("EDIT PRESS")}
                        style={{justifyContent:"center"}}>
                        <Text style={{color: "green"}}>Edit | </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center"}}
                        activeOpacity={.7}
                        onPress={() => alert("DELETE PRESS")}>
                            <Text style={{ color: "red" }}>Delete</Text>
                        </TouchableOpacity> 
                </View>

            </View>
        </TouchableOpacity>

    )
}

function calculate(StartTime, EndTime) {

    let startShiftTime = moment(StartTime, ['DD-MM-YYYY h:mm:ss A'])
        .utcOffset(0, false);

    let endShiftTime = moment(EndTime, ['DD-MM-YYYY h:mm:ss A'])
        .utcOffset(0, false);

    var TotalSeconds = endShiftTime
        .diff(startShiftTime, 'seconds');

    var hours = Math.floor(TotalSeconds / 3600);
    var minutes = Math.floor((TotalSeconds / 60) % 60);
    var day = Math.floor((minutes / 60) % 60);

    console.log(`startShiftTime: ${startShiftTime.format('DD-MM-YYYY h:mm:ss A')} endShiftTime: ${endShiftTime.format('DD-MM-YYYY h:mm:ss A')} hours: ${hours} minutes: ${day}`);
}

const TaskDetail = ({ item }) => {

    return (
        <View style={{ width: ScreenWidth - 50, height: 120, borderColor: AppTheme.BorderColor, borderWidth: 1, borderRadius: 8, marginTop: 16, marginEnd: 10 }}>

            <View style={{ marginLeft: 16, marginTop: 12, flexDirection: 'row' }}>
                <Text style={{ flex: 1, marginLeft: 5, fontSize: 14, fontStyle: "normal", alignSelf: "center" }}>{item.title}</Text>
                <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4, backgroundColor: AppTheme.PrimaryColor, marginRight: 15, alignSelf: "center" }}>
                    <Text style={{ fontSize: 14, fontStyle: "normal", color: "white", alignSelf: "center", justifyContent: "center" }}>To Do</Text>
                </View>
            </View>


            <View style={{ marginLeft: 16, marginTop: 12, flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>

                <ProgressView style={{ flex: 1, height: 12 }}
                    progressTintColor={AppTheme.PrimaryColor}
                    trackTintColor="lightgray"
                    progress={0.7}
                />
                <Text style={{ marginRight: 5, fontSize: 13, fontStyle: "normal", marginStart: 5 }}>75%</Text>

            </View>



            <View style={{ marginLeft: 16, marginTop: 12, flexDirection: 'row' }}>

                <Image style={{ width: 25, height: 25 }} source={require("../Assets/ic_calender.png")} />
                <Text style={{ marginLeft: 5, fontSize: 12, fontStyle: "normal", alignSelf: "center" }}>12 Sep 2021</Text>
                <Image style={{ width: 25, height: 25, marginLeft: 20 }} source={require("../Assets/ic_list.png")} />
                <Text style={{ marginLeft: 5, fontSize: 12, fontStyle: "normal", alignSelf: "center" }}>12 Tasks</Text>

            </View>


        </View>
    )
}

export default Appointly