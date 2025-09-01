import { ProgressView } from "@react-native-community/progress-view";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, useWindowDimensions } from "react-native";
import { AppTheme } from "../AppTheme/AppTheme";
import { CustomTextfieldBlank } from "../Components/General";
import { APP_URL, GetTaskDetail } from "../Components/Api";
import Loader from "../Components/Loader";
import moment from "moment";
import HTML from "react-native-render-html";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";


const TaskDetail = (props) => {
    const {taskID} = props;
    const [loading, setLoading] = useState(true);
    const [taskDetail, setTaskDetail] = useState({});
    const {width} = useWindowDimensions();
  console.log("taskDetail========",taskDetail)
    useEffect(() => {
        getTaskDetailHandle();
    }, []);
    const getTaskDetailHandle = async (s) => {
        try {
            setLoading(true);
            var myHeaders = new Headers();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${APP_URL.BaseUrl}${GetTaskDetail}${taskID}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                setTaskDetail(result);
                console.log("result ====> ", result);
            }).catch((error) => {
                setLoading(false);
                console.log('ERROR =====>', error?.message);
            });
        } catch (error) {
            setLoading(false);
            console.log('ERROR =====>', error?.message);
        }
    };
   
    return (
        <View>
            <Loader loading={loading} />
            <ScrollView>
                {/* <Text style={{ alignSelf: "center", marginLeft: 20, marginBottom: 6, fontSize: 22, marginTop: 20, fontFamily:"Prompt-Medium", color:"#000" }}>Task Detail</Text> */}
                <View style={{borderBottomColor:"#CCC",borderBottomWidth:1,paddingBottom:20,marginHorizontal:20}}>
                    <Text style={{fontSize:18,color:"#000",fontWeight:"bold",marginTop:20,fontFamily:"Prompt-Medium"}}>Task Detail</Text>
                    <Text style={{fontSize:14,color:"#000",fontWeight:"bold",marginTop:10,fontFamily:"Prompt-Medium"}}>Name:</Text>
                    <Text style={{fontSize:14,color:"#000",marginTop:5,marginRight:10,fontFamily:"Prompt-Light"}}>
                        {taskDetail?.name === null || taskDetail?.name === "" ? "-----": taskDetail?.name}
                   
                    </Text> 
                    <Text style={{fontSize:14,color:"#000",fontWeight:"bold",marginTop:10,fontFamily:"Prompt-Medium"}}>Description:</Text>
                    <Text style={{fontSize:14,color:"#000",marginTop:5,marginRight:10,fontFamily:"Prompt-Light"}}>
                        {taskDetail?.description === null || taskDetail?.description === "" ? "-----" : taskDetail?.description}
                    </Text>
                    <Text style={{fontSize:14,color:"#000",fontWeight:"bold",marginTop:10,fontFamily:"Prompt-Medium"}}>Status:</Text>
                    <Text style={{fontSize:14,color:"#000",marginTop:5,marginRight:10,fontFamily:"Prompt-Light"}}>
                                                     {taskDetail?.status === null ? "---------" : 
                                                      taskDetail?.status === "1" ? "Not Started" : 
                                                      taskDetail?.status=== "2" ? "Awaiting Feedback" :
                                                      taskDetail?.status === "3" ? "Testing" :
                                                      taskDetail?.status === "4" ? "Inprogess" :
                                                      taskDetail?.status === "5" ? "Completed" :
                                                      taskDetail?.status === "6" ? "On Hold" : null}
                    </Text>
                    {/* <HTML
                        contentWidth={width}
                        source={{html: taskDetail?.description}}
                        tagsStyles={{p:{color:'#000',fontFamily:'Prompt-Light',fontSize:14}}}
                    /> */}
                    <Text style={{fontSize:14,color:"#000",fontWeight:"bold",marginTop:10,fontFamily:"Prompt-Medium"}}>Start Date:</Text>
                    <Text style={{ fontSize: 14, color: "#000", marginTop: 5, fontFamily:"Prompt-Light" }}>
                        {taskDetail?.startdate === null ? "-----" : moment(taskDetail?.startdate).format("DD MMM YYYY")}
                    </Text>
                    <Text style={{fontSize:14,color:"#000",fontWeight:"bold",marginTop:10,fontFamily:"Prompt-Medium"}}>Deadline:</Text>
                    <Text style={{ fontSize: 14, color: "#000", marginTop: 5, fontFamily:"Prompt-Light" }}>
                        {taskDetail?.duedate === null ? "-----" : moment(taskDetail?.duedate).format("DD MMM YYYY")}
                    </Text>
                </View>
                {/* <View style={{borderBottomColor:"#CCC",borderBottomWidth:1,paddingBottom:20,marginHorizontal:20}}>
                    <Text style={{fontSize:18,color:"#000",fontWeight:"bold",marginTop:20,fontFamily:"Prompt-Medium"}}>Client Detail</Text>
                    <Text style={{fontSize:14,color:"#000",fontWeight:"bold",marginTop:10,fontFamily:"Prompt-Medium"}}>Comapny Name:</Text>
                    <Text style={{ fontSize: 14, color: "#000", marginTop: 5, fontFamily:"Prompt-Light" }}>
                        {taskDetail?.project_data?.client_data?.company}
                    </Text>
                    <Text style={{fontSize:14,color:"#000",fontWeight:"bold",marginTop:10,fontFamily:"Prompt-Medium"}}>Phone Number:</Text>
                    <Text style={{ fontSize: 14, color: "#000", marginTop: 5, fontFamily:"Prompt-Light" }}>
                        {taskDetail?.project_data?.client_data?.phonenumber}
                    </Text>
                </View> */}
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:18,color:"#000",marginLeft:20,fontWeight:"bold",marginTop:20,fontFamily:"Prompt-Medium"}}>Followers</Text>
                        {taskDetail?.followers?.length===0?
                            <Text style={{ fontSize: 14, color: "#000", marginTop: 5, fontFamily:"Prompt-Light", marginLeft: 20 }}>
                                ----------
                            </Text>
                        :
                        taskDetail?.followers?.map((val, key) => {
                            const sentence = val?.full_name;
                            const words = sentence.split(" ");
                            const firstLetters = words.map(word => word.charAt(0));
                            const userName = firstLetters.join("");
                            return (
                                <View key={key} style={{flexDirection:"row",marginTop:key===0?18:8}}>
                                    <View style={{justifyContent:"center"}}>
                                        <LinearGradient
                                            end={{ x: 1, y: 1 }}
                                            start={{ x: 1, y: 0 }}
                                            colors={['#1b1366', '#201492']}
                                            style={{borderRadius:100,height:40,width:40,marginLeft:20,alignItems:"center",justifyContent:"center"}}>
                                            <Text style={{color:"#FFF",fontFamily:"Prompt-Medium"}}>
                                                {userName}
                                            </Text>
                                        </LinearGradient>
                                    </View>
                                    <View style={{flex:1,justifyContent:"center",paddingLeft:12}}>
                                        <Text style={{color:"#000",fontFamily:"Prompt-Light"}}>
                                            {val?.full_name}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:18,color:"#000",marginLeft:20,fontWeight:"bold",marginTop:20,fontFamily:"Prompt-Medium"}}>Assignees</Text>
                        {taskDetail?.assignees?.length===0?
                            <Text style={{ fontSize: 14, color: "#000", marginTop: 5, fontFamily:"Prompt-Light", marginLeft: 20 }}>
                                ----------
                            </Text>
                        :
                        taskDetail?.assignees?.map((val, key) => {
                            const sentence = val?.full_name;
                            const words = sentence.split(" ");
                            const firstLetters = words.map(word => word.charAt(0));
                            const userName = firstLetters.join("");
                            return (
                                <View key={key} style={{flexDirection:"row",marginTop:key===0?18:8}}>
                                    <View style={{justifyContent:"center"}}>
                                        <LinearGradient
                                            end={{ x: 1, y: 1 }}
                                            start={{ x: 1, y: 0 }}
                                            colors={['#1b1366', '#201492']}
                                            style={{borderRadius:100,height:40,width:40,marginLeft:20,alignItems:"center",justifyContent:"center"}}>
                                            <Text style={{color:"#FFF",fontFamily:"Prompt-Medium"}}>
                                                {userName}
                                            </Text>
                                        </LinearGradient>
                                    </View>
                                    <View style={{flex:1,justifyContent:"center",paddingLeft:12}}>
                                        <Text style={{color:"#000",fontFamily:"Prompt-Light"}}>
                                            {val?.full_name}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
                <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 18, color: "#000", marginTop: 20, fontFamily:"Prompt-Medium" }}>Attachment File</Text>
                <ScrollView
                   horizontal
                   showsHorizontalScrollIndicator={false}>
                <View style={{ width: '90%', alignItems: 'center', flexDirection: "row", alignSelf: "center"}}>
                    {taskDetail?.attachments?.length===0?
                        <Text style={{ fontSize: 14, color: "#000", marginTop: 5, fontFamily:"Prompt-Light",marginLeft: 20,  }}>
                          -------
                        </Text>
                    :
                    taskDetail?.attachments?.map((val, key) => {
                        return (
                            
                            <View key={key} style={{ borderColor: AppTheme.BorderColor, borderWidth: 1, flexDirection: "row", padding: 5, marginTop: 10, borderRadius: 5,marginRight:10 ,marginLeft:10  }}>
                                <Image style={{ width: 40, height: 40, marginLeft: 0 }} resizeMode="stretch" source={require("../Assets/ic_upload_file.png")} />
                                <Text style={{ alignSelf: "center" }}>{val?.file_name}</Text>
                            </View>
                            
                        )
                    })}
                    
                </View>
                </ScrollView>
                {/* <Text style={{ fontSize:18,color:"#868696",marginLeft:20,fontWeight:"bold",marginTop:20 }}>Tasks</Text>
                <View style={{ flexDirection: "row", padding: 5, marginTop: 10 }}>
                    <Image style={{ width: 30, height: 30, marginLeft: 0, marginLeft: 16 }} resizeMode="stretch" source={require("../Assets/ic_list.png")} />
                    <Text style={{ alignSelf: "center", color: "#868696", marginLeft: 5 }} >12 Tasks</Text>
                    <Text style={{ flex: 1, alignSelf: "center", color: "#868696", marginRight: 5, textAlign: "right" }} >75%</Text>
                </View>
                <ProgressView style={{ flex: 1, height: 16, width: "90%", alignSelf: "center", marginTop: 5 }}
                    progress={0.75}
                    trackTintColor="lightgray"
                    progressTintColor={AppTheme.yellowButtonColor}
                />
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Image style={{ width: 20, height: 20, marginLeft: 0, marginLeft: 16 }} resizeMode="stretch" source={require("../Assets/ic_check.png")} />
                    <Text style={{ alignSelf: "center", color: "#868696", marginLeft: 10 }} >Generating Ideas With Team For Teslu</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Image style={{ width: 20, height: 20, marginLeft: 0, marginLeft: 16 }} resizeMode="stretch" source={require("../Assets/ic_uncheck.png")} />
                    <Text style={{ alignSelf: "center", color: "#868696", marginLeft: 10 }} >Create Wireframe For Teslu</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Image style={{ width: 20, height: 20, marginLeft: 0, marginLeft: 16 }} resizeMode="stretch" source={require("../Assets/ic_uncheck.png")} />
                    <Text style={{ alignSelf: "center", color: "#868696", marginLeft: 10 }} >Create High Fidelity For Teslu</Text>
                </View>
                <Image style={{ width: 60, height: 30, marginLeft: 0, marginLeft: 16, alignSelf: "center", marginTop: 15 }} resizeMode="stretch" source={require("../Assets/ic_seemore.png")} />
                <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 14, color: "#021639", marginTop: 20 }}>Comment</Text>
                <View style={{ flexDirection: "row", padding: 5, marginTop: 10, marginBottom: 40 }}>
                    <Image style={{ width: 40, height: 40, marginLeft: 0, marginLeft: 16 }} resizeMode="stretch" source={require("../Assets/ic_circle.png")} />
                    <CustomTextfieldBlank style={{ width : '80%' , marginLeft : 10}} placeholder="Write a comment" isSecure={false} image = {require("../Assets/ic_user.png")} />
                </View> */}
            </ScrollView>
        </View>
    )
}


export default TaskDetail