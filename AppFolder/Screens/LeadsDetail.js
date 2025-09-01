import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, useWindowDimensions, FlatList, ScrollView, TouchableOpacity } from "react-native";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { AppTheme } from "../AppTheme/AppTheme";
import { GoToNextController, Screenheight, ScreenWidth } from "../Components/General";
import { ProgressView } from "@react-native-community/progress-view";
import { Navigation } from "react-native-navigation";
import axios from "axios";
import { GetAllProjects, GetAllTasks, GetTasksByType } from "../Components/Api";
import moment from "moment";
import Loader from "../Components/Loader";
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'
import Todo from "./Notes";

const SecondRoute = () => {
    const [dataAllProjects, setDataAllProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(false)

        apiPost()
    }, [])


    const apiPost = async (s) => {
        setLoading(true)

        console.log(`url is =`, GetAllProjects)

        axios.get(GetAllProjects, { "keysearch": "" })
            .then(data => {
                setLoading(false)

                // console.log(`DATA = ${JSON.stringify(data.data, null, 2)}`)
                // setApiData([])
                setDataAllProjects(data.data);
            })
            .catch(e => {
                console.log(`Error =`, e)

                setLoading(false)

            })
    }
    return (
        <View style={{ marginLeft: 25 }}>
            <FlatList
                keyExtractor={(_, index) => String(index)}
                ListHeaderComponent={
                    <>
                        <FlatList
                            renderItem={ProjectDetail}

                            data={dataAllProjects}

                            keyExtractor={(_, index) => String(index)}
                        />

                    </>
                }

            />
        </View>

    );
}

const FirstRoute = ({ props }) => {

    // let propObject = JSON.parse(props)
    // console.log("FirstRoute props.item", props.item)
    let item = props.item
    // console.log("FirstRoute propObject.stringified", typeof (props), JSON.stringify(props))


    const [dataAllProjects, setDataAllProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [LeadInfo, setLeadInfo] = useState([]);

    useEffect(() => {

        setLoading(false)

        // apiPost()
    }, [])

    const apiPost = async (s) => {
        setLoading(true)

        // console.log(`url is =`, GetAllProjects)

        axios.get(GetAllProjects, { "keysearch": "" })
            .then(data => {
                setLoading(false)

                // console.log(`DATA = ${JSON.stringify(data.data, null, 2)}`)
                // setApiData([])
                setDataAllProjects(data.data);
            })
            .catch(e => {
                console.log(`Error =`, e)

                setLoading(false)

            })
    }
    return (

        <ScrollView>
            <View style={{ flex: 1, alignItems: "center" }}>


                <View style={{ backgroundColor: "#F5F5F5", width: "90%", borderRadius: 5, borderColor: "#DFDFDF", borderWidth: 2, padding: 10, marginTop: 20 }}>

                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Lead Information</Text>
                        {/* <Text style={{ fontSize: 16, fontWeight: "normal", color: "#539A61", borderWidth: 1, borderColor: "#707070", borderRadius: 3, padding: 5 }}>Closed</Text> */}
                    </View>

                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Name: {item?.name}   </Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Email Address: {item?.email || "-"} </Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Website: {item?.website || "-"}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Phone:  {item?.phonenumber || "-"}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Lead value: {item?.lead_value || "-"}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Company: {item?.company || "-"}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Address: {item?.address || "-"}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Zip Code: {item?.zip || "-"}</Text>

                    {/* <Text style={{
                        fontSize: 14, fontWeight: "normal", lineHeight: 30,
                    }}>Reference #: {item?.company || "-"} </Text>

                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Project: {item?.company || "-"}</Text> */}


                </View>

                <View style={{ backgroundColor: "#F5F5F5", width: "90%", borderRadius: 5, borderColor: "#DFDFDF", borderWidth: 2, padding: 10, marginTop: 20 }}>

                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>General Information</Text>
                        {/* <Text style={{ fontSize: 16, fontWeight: "normal", color: "#539A61", borderWidth: 1, borderColor: "#707070", borderRadius: 3, padding: 5 }}>Closed</Text> */}
                    </View>

                    {/* <Text style={{ fontSize: 16, fontWeight: "normal" }}>Tasktak Inc</Text> */}
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Status: {item?.status || "-"} </Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Source: {item?.source || "-"}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Default Language: {item?.default_language || "-"}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Assigned: {item?.assigned || "-"}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Created: {item?.dateadded || "-"}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Last Contact: {item?.lastcontact || "-"}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Public: {item?.is_public == "0" ? "No" : "Yes"}</Text>


                </View>

            </View>
        </ScrollView>


    );
}

const SeventhRoute = () => {
    const [dataAllProjects, setDataAllProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(false)

        apiPost()
    }, [])


    const apiPost = async (s) => {
        setLoading(true)

        // console.log(`url is =`, GetAllProjects)

        axios.get(GetAllProjects, { "keysearch": "" })
            .then(data => {
                setLoading(false)

                // console.log(`DATA = ${JSON.stringify(data.data, null, 2)}`)
                // setApiData([])
                setDataAllProjects(data.data);
            })
            .catch(e => {
                console.log(`Error =`, e)

                setLoading(false)

            })
    }
    return (
        <View style={{ marginLeft: 25 }}>
            <FlatList
                keyExtractor={(_, index) => String(index)}
                ListHeaderComponent={
                    <>
                        <FlatList
                            renderItem={ActivityLogCell}

                            data={dataAllProjects}

                            keyExtractor={(_, index) => String(index)}
                        />

                    </>
                }

            />
        </View>

    );
}


const ThirdRoute = ({ props }) => {

    const [dataAllTasks, setDataAllTasks] = useState([]);

    useEffect(() => {

        // setLoading(false)
        console.log(`check func taskss = THIRDROUTE`)

        apiPostTask()
    }, [])


    const apiPostTask = async () => {
        console.log("apiPostTask props", props.item.id)
          console.log(`GetTasksByType URL`, GetTasksByType + "2875" + "/" + "lead")

        axios.get(APP_URL.BaseUrl + GetTasksByType + props.item.id + "/" + "lead")
            .then(data => {
                  console.log(`Task DATA Leads New = ${JSON.stringify(data.data, null, 2)} && Length = ${data.data.length}`)
                // setApiData([])
                // setDataAllTasks(data.data);
                setDataAllTasks(data.data || []);
            })
            .catch(e => {
                console.log(`Error =`, e)

            })


    }
    return (
        <View style={{ marginLeft: 10, alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
            </View>
            <FlatList
                style={{}}
                keyExtractor={(_, index) => String(index)}
                renderItem={TaskDetail}
                // data={["To Do", "Pending", "In Progress", "Done", "Review", "To Do", "Pending", "In Progress", "Done", "Review"]}

                data={dataAllTasks}
            />
        </View>
        //  </ScrollView>


    )
};










const FourthRoute = () => {

    const [selectedItems, setSelectedItems] = useState([]);

    return (
        <View>
            <View style={{ backgroundColor: "#3B3B3D", height: 120, alignSelf: "center", justifyContent: "center", width: ScreenWidth - 100, marginTop: 50, borderRadius: 10 }}>

                <TouchableOpacity onPress={() => {

                    DocumentPicker.pick({
                        allowMultiSelection: true,
                        type: [types.allFiles],
                    })
                        .then((results) => {
                            console.log("Results = ", JSON.stringify(results, null, 2))
                            setSelectedItems([...selectedItems, ...results])
                        })
                        .catch(handleError)
                }}>
                    <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>Upload Docs</Text>
                </TouchableOpacity>
            </View>
            {selectedItems.length != 0 &&
                <View >
                    <ScrollView horizontal style={{ marginVertical: 20, height: 130, width: ScreenWidth }}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', paddingStart: 20 }}>
                            {selectedItems.map((item, index) => {
                                const name = item?.name || ""
                                const source = item?.type == "image/jpeg" ? { uri: item?.uri } : require("../Assets/Dashboard/ic_3.png")
                                // {
                                //     "fileCopyUri": null,
                                //     "size": 362063,
                                //     "name": "Screenshot_2022-12-04-21-39-47-485_com.facebook.katana.jpg",
                                //     "type": "image/jpeg",
                                //     "uri": "content://com.android.providers.media.documents/document/image%3A252666"
                                //   }
                                function removeItem() {
                                    let indexOf = selectedItems.findIndex(val => val.uri == item.uri);
                                    console.log(indexOf)
                                    if (indexOf != -1) {
                                        let _items = [...selectedItems];
                                        _items.splice(indexOf, 1);
                                        setSelectedItems(_items)
                                        // setSelectedItems(i => {
                                        //     i.splice(indexOf, 1);
                                        //     return i;
                                        // })
                                    }
                                }
                                return (
                                    <View style={{ height: 100, width: 70, marginHorizontal: 10, alignItems: 'center' }}>
                                        <Image style={{ width: 70, height: 70, backgroundColor: "grey", borderRadius: 5 }} source={source} />
                                        <Text adjustsFontSizeToFit={true}>{name}</Text>
                                        <TouchableOpacity onPress={removeItem} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: "red", alignItems: 'center', justifyContent: 'center', position: 'absolute', top: -15, right: -5 }}>
                                            <Text style={{ color: "white", alignSelf: "center" }}>x</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            }
        </View>


    )
}

const SixthRoute = () => {


}

const handleError = (err) => {
    if (DocumentPicker.isCancel(err)) {
        // console.warn('cancelled')
        // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
        // console.warn('multiple pickers were opened, only the last will be considered')
    } else {
        throw err
    }
}


const renderTabBar = props => {
    return (
        <TabBar
            {...props}
            // tabStyle={{}}
            scrollEnabled={true}
            tabStyle={{ alignItems: 'center', width: ScreenWidth / 2 - 70, height: 40, justifyContent: 'center' }}
            indicatorStyle={{ backgroundColor: AppTheme.PrimaryColor }}
            // indicatorStyle={styles.indicatorStyle}
            // indicatorContainerStyle={{backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
            style={{ backgroundColor: "white", paddingBottom: 5 }}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color: focused ? AppTheme.PrimaryColor : "lightgrey", margin: 0, fontSize: 14, fontWeight: 'bold' }}>
                    {route.title}
                </Text>
            )}
            bounces={true}
        />
    );
}
export function TabViewExample({ props }) {
    const layout = useWindowDimensions();

    // console.log("FirstRouteFirstRoute", props)

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Profile' },
        { key: 'second', title: 'Proposals' },
        { key: 'Third', title: 'Tasks' },
        { key: 'Fourth', title: 'Attachments' },
        { key: 'Fifth', title: 'Reminders' },
        { key: 'Sixth', title: 'Notes' },
        { key: 'Seventh', title: 'Activity Log' },


    ]);

    const renderScene = SceneMap({
        first: () => <FirstRoute props={props} />,
        second: SecondRoute,
        Third: () => <ThirdRoute props={props} />,
        Fourth: FourthRoute,

        Fifth: () => <ThirdRoute props={props} />,

        Sixth: Todo,

        Seventh: SeventhRoute,
    });

    return (
        <TabView
            style={{ width: ScreenWidth }}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}

handleNewProjectPressed = () => {

    GoToNextController("AddNewProject")

}
const LeadsDetail = (props) => {



    const [searchText, setSearchText] = React.useState("");


    // console.log("propssss detail", props)


    return (


        <View style={{ flex: 1, marginTop: '5%', alignItems: "center" }}>
            {/* <View style={{ flexDirection: "row", width: "90%" }}>

                <Text style={{ marginLeft: 0, fontSize: 20 }}>Projects</Text>

                <TouchableOpacity style={{ alignItems: "flex-end", flex: 1 }} onPress={handleNewProjectPressed}>
                    <Text style={{ fontSize: 20, color: AppTheme.PrimaryColor }}>Add Project</Text>
                </TouchableOpacity>

            </View> */}
            <View style={{ alignItems: "center", flexDirection: "row", width: "90%", height: 40, borderRadius: 5, borderColor: "lightgray", borderWidth: 1, marginTop: 20 }} >
                <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={require("../Assets/ic_search.png")} />
                <TextInput value={searchText} onChangeText={(t) => { setSearchText(t) }} style={{ flex: 1, marginLeft: 10 }} placeholder={"Search"} />
                <Image style={{ width: 50, height: 25, marginRight: 10, alignItems: "flex-end" }} source={require("../Assets/filter.png")} />
            </View>
            <TabViewExample props={props} />
        </View>
    )
}


const ActivityLogCell = ({ item }) => {
    const projectTap = () => {
        //console.log(`Item =>` , calculate('2022-09-13 07:39:07', '2022-09-16 11:41:52'))

        // 79


        //   2020-09-29 07:39:07
        //    calculate('02-12-2021 04:30:00 PM', '05-12-2021 04:10:00 PM');
        // return;

        //  GoToNextController("ProjectDetail")

        Navigation.push("AppStack", { component: { passProps: { item }, name: "ProjectDetail", options: { topBar: { visible: true } } } })

    }
    return (

        <TouchableOpacity onPress={projectTap}>
            <View style={{ width: ScreenWidth / 1.0 - 50, borderColor: AppTheme.BorderColor, borderWidth: 1, borderRadius: 8, marginTop: 16, marginEnd: 10 }}>

                <View style={{ marginLeft: 12, marginTop: 12, flexDirection: 'row' }}>
                    <Text style={{ flex: 1, marginLeft: 5, fontSize: 14, fontStyle: "normal", alignSelf: "center" }}>"Brent Cearley - created lead"</Text>
                    {/* <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, backgroundColor: AppTheme.PrimaryColor, marginRight: 15, alignSelf: "center" }}>
                        <Text style={{ fontSize: 12, fontStyle: "normal", color: "white", alignSelf: "center", justifyContent: "center" }}>5 Days</Text>
                    </View> */}

                </View>
                {/* <Text style={{ marginTop: 12, marginLeft: 16, fontSize: 12, fontStyle: "normal" }}>{item.description || "N/A"}</Text> */}
                <View style={{ marginLeft: 16, marginTop: 12, flexDirection: 'row', marginBottom: 10 }}>

                    <Image style={{ width: 25, height: 25 }} source={require("../Assets/ic_calender.png")} />
                    <Text style={{ marginLeft: 5, fontSize: 12, fontStyle: "normal", alignSelf: "center" }}>2 DAYS AGO</Text>

                </View>

            </View>
        </TouchableOpacity>

    )
}

const ProjectDetail = ({ item }) => {
    const projectTap = () => {


        Navigation.push("AppStack", { component: { passProps: { item }, name: "ProjectDetail", options: { topBar: { visible: true } } } })

    }
    return (

        <TouchableOpacity onPress={projectTap}>
            <View style={{ width: ScreenWidth / 1.0 - 50, borderColor: AppTheme.BorderColor, borderWidth: 1, borderRadius: 8, marginTop: 16, marginEnd: 10 }}>

                <View style={{ marginLeft: 12, marginTop: 12, flexDirection: 'row' }}>
                    <Text style={{ flex: 1, marginLeft: 5, fontSize: 14, fontStyle: "normal", alignSelf: "center" }}>{item.name}</Text>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, backgroundColor: AppTheme.PrimaryColor, marginRight: 15, alignSelf: "center" }}>
                        <Text style={{ fontSize: 12, fontStyle: "normal", color: "white", alignSelf: "center", justifyContent: "center" }}>5 Days</Text>
                    </View>

                </View>
                <Text style={{ marginTop: 12, marginLeft: 16, fontSize: 12, fontStyle: "normal" }}>{item.description || "N/A"}</Text>
                <View style={{ marginLeft: 16, marginTop: 12, flexDirection: 'row', marginBottom: 10 }}>

                    <Image style={{ width: 25, height: 25 }} source={require("../Assets/ic_calender.png")} />
                    <Text style={{ marginLeft: 5, fontSize: 12, fontStyle: "normal", alignSelf: "center" }}>{item.start_date}</Text>

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
const TaskDetail = ({ todo, item }) => {

    // console.log("task data is", item.name)

    handleTaskPress = () => {



        GoToNextController("TaskDetail")

    }
    return (
        <View style={{ width: ScreenWidth - 50, borderColor: AppTheme.BorderColor, borderWidth: 1, borderRadius: 8, marginTop: 16, marginEnd: 10 }}>
            <TouchableOpacity onPress={handleTaskPress}>
                <View style={{ marginLeft: 16, marginTop: 12, flexDirection: 'row' }}>
                    <Text style={{ flex: 1, marginLeft: 5, fontSize: 14, fontStyle: "normal", alignSelf: "center" }}>{item.name}</Text>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4, backgroundColor: item.status == 5 ? "#868695" : item == 4 ? "#8C5382" : "red", marginRight: 15, alignSelf: "center" }}>
                        <Text style={{ fontSize: 14, fontStyle: "normal", color: "white", alignSelf: "center", justifyContent: "center" }}>To do</Text>
                    </View>
                </View>
                <View style={{ marginLeft: 16, marginTop: 12, flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>

                    <ProgressView style={{ flex: 1, height: 12 }}
                        progressTintColor={AppTheme.yellowButtonColor}
                        trackTintColor="lightgray"
                        progress={0.7}
                    />
                    <Text style={{ marginRight: 5, fontSize: 13, fontStyle: "normal", marginStart: 5 }}>75%</Text>

                </View>


                <View style={{ marginLeft: 16, marginTop: 12, flexDirection: 'row', marginBottom: 10 }}>

                    <Image style={{ width: 25, height: 25 }} source={require("../Assets/ic_calender.png")} />
                    <Text style={{ marginLeft: 5, fontSize: 12, fontStyle: "normal", alignSelf: "center" }}>{item.startdate}</Text>

                    {/* <Image style={{ width: 25, height: 25, marginLeft: 20 }} source={require("../Assets/ic_list.png")} /> */}
                    {/* <Text style={{ marginLeft: 5, fontSize: 12, fontStyle: "normal", alignSelf: "center" }}>12 Tasks</Text> */}

                </View>
            </TouchableOpacity>

        </View>

    )


}

export default LeadsDetail