import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from "react-native";
import { AppTheme } from "../AppTheme/AppTheme";
import { GoToNextController, ScreenWidth } from "../Components/General";
import { ProgressView } from "@react-native-community/progress-view";
import { Navigation } from "react-native-navigation";
import { APP_URL, DeleteTasks, GetAllTasks } from "../Components/Api";
import Loader from "../Components/Loader";
import { apiDeletePost } from "../Components/ApiDelete";
import moment from "moment";

const MyTasks = () => {
    const [dataAllTasks, setDataAllTasks] = useState([]);
    const [sortedDataAllTasks, setSortedDataAllTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTaskHandle();
    }, []);
    const onSearch = (text) => {
        console.log("TEXT ", text)
        if (text.length > 0) {
            let sorted = dataAllTasks.filter(function (item) {
                console.log(item.name)
                console.log(item.name.toLowerCase().includes(text.toLowerCase()))
                return item.name.toLowerCase().includes(text.toLowerCase());
            })
            setSortedDataAllTasks(sorted);
            return;
        }
        setSortedDataAllTasks(dataAllTasks);
    };
    const getTaskHandle = async (s) => {
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
                setLoading(false)
                setDataAllTasks(result);
                setSortedDataAllTasks(result);
            }).catch((error) => {
                console.log('ERROR =====>', error?.message);
            });
        } catch (error) {
            console.log('ERROR =====>', error?.message);
        }
    };
    const renderItem = ({item, index}) => {        
        return (
            <View key={index}
                style={{ width: ScreenWidth - 50, borderColor: AppTheme.BorderColor, borderWidth: 1, borderRadius: 8, marginTop: 16, marginEnd: 10 }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={() => {
                        Navigation.push("AppStack", {
                            component: {
                                name: 'TaskDetail',
                                passProps: {
                                    taskID: item?.id,
                                },
                            },
                        });
                    }}>
                    <View style={{ marginTop: 12, flexDirection: 'row' }}>
                        <Text style={{ flex: 1, marginLeft: 16, fontSize: 14, fontStyle: "normal", alignSelf: "center" }}>
                            {/* {item?.name} */}
                            {item?.name.split(' ').slice(0, 5).join(' ')}{item?.name.split(' ').length > 5 ? ' ...' : ''}

                        </Text>
                        <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4, backgroundColor: item.status == 5 ? "#28a745" : item == 4 ? "#808080" : 'red' , marginRight: 15, alignSelf: "center" }}>
                            <Text style={{ fontSize: 14, fontStyle: "normal", color: "white", alignSelf: "center", justifyContent: "center" }}> 
                                                       {item.status === "1" ? "Not Started" : 
                                                        item.status === "2" ? "Awaiting Feedback" :
                                                        item.status === "3" ? "Testing" :
                                                        item.status === "4" ? "Inprogess" :
                                                        item.status === "5" ? "Completed" :
                                                        item.status === "6" ? "On Hold" : null}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 16, marginTop: 12, flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                        {/* <ProgressView style={{ flex: 1, height: 12 }}
                            progressTintColor={AppTheme.yellowButtonColor}
                            trackTintColor="lightgray"
                            progress={0.7}
                        />
                        <Text style={{ marginRight: 5, fontSize: 13, fontStyle: "normal", marginStart: 5 }}>75%</Text> */}
                    </View>
                    <View style={{ marginLeft: 16, marginTop: 12, flexDirection: 'row' , marginBottom : 10}}>
                        <Image style={{ width: 25, height: 25 }} source={require("../Assets/ic_calender.png")} />
                        <Text style={{ marginLeft: 5, fontSize: 12, fontStyle: "normal", alignSelf: "center" }}>
                            {moment(item?.dateadded).format("D MMM YYYY")}
                        </Text>
                        {/* <Image style={{ width: 25, height: 25, marginLeft: 20 }} source={require("../Assets/ic_list.png")} />
                        <Text style={{ marginLeft: 5, fontSize: 12, fontStyle: "normal", alignSelf: "center" }}>12 Tasks</Text> */}
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", marginLeft: 16, marginBottom: 12 }}>
                    <TouchableOpacity
                        activeOpacity={.7}
                        style={{justifyContent:"center"}}
                        onPress={() => {
                            Navigation.push("AppStack", {
                                component: {
                                    name: 'TaskDetail',
                                    passProps: {
                                        taskID: item?.id,
                                    },
                                },
                            });
                        }}>
                        <Text style={{color: "blue"}}>View | </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => {
                            Navigation.push("AppStack", {
                                component: {
                                    name: 'EditTask',
                                    passProps: {
                                        taskDetail: item,
                                    },
                                },
                            });
                        }}
                        style={{justifyContent:"center"}}>
                        <Text style={{color: "green"}}>Edit | </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center"}}
                        activeOpacity={.7}
                        onPress={async () => {
                            apiDeletePost({
                                id: item.id,
                                uri: APP_URL.BaseUrl + DeleteTasks,
                            }).then(res => {
                                console.log("DELETED = ", res);
                                getTaskHandle();
                            })
                        }}>
                        <Text style={{ color: "red" }}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    return (
        <View style={{flex:1,marginTop:'10%',alignItems:"center"}}>
            <View style={{flexDirection:"row",width:"90%"}}>
                <Text style={{marginLeft:0,fontSize:20}}>
                    My Tasks
                </Text>
                <TouchableOpacity
                    activeOpacity={.7}
                    style={{alignItems:"flex-end",flex:1}}
                    onPress={() => GoToNextController("NewTask")}>
                    <Text style={{fontSize:20,color:AppTheme.yellowButtonColor}}>
                        Add Task
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginLeft:10}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{alignItems:"center",flexDirection:"row",width:"95%",height:40,borderRadius:5,borderColor:"lightgray",borderWidth:1,marginTop:20}}>
                        <Image
                            style={{width:20,height:20,marginLeft:10}}
                            source={require("../Assets/ic_search.png")}
                        />
                        <TextInput
                            placeholder={"Search"}
                            onChangeText={onSearch}
                            style={{flex:1,marginLeft:10}}
                        />              
                        <Image
                            source={require("../Assets/filter.png")}
                            style={{width:50,height:25,marginRight:10,alignItems:"flex-end"}}
                        />
                    </View>
                </View>
                <FlatList
                    renderItem={renderItem}
                    data={sortedDataAllTasks}
                    keyExtractor={item => item.id}
                />
                <Loader loading={loading} />
            </View>
        </View>
    )
};

export default MyTasks;