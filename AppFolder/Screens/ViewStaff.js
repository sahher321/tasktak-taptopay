import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView,StyleSheet } from 'react-native';
import { Navigation } from "react-native-navigation";
import { AppTheme } from '../AppTheme/AppTheme';
import { APP_URL, GetStaffDetail, } from '../Components/Api';
import moment from 'moment';


const ViewStaff = (props) => {
    const { staffID } = props;
    const [staffDetail, setStaffDetail] = useState({});
    const [tabActive, setTabActive] = useState(0);
    const [taskData, setTaskData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [timeSheetData, settimeSheetData] = useState([]);

    const tabsData = [
        { id: 1, title: "Profile" },
        { id: 2, title: "TimeSheet" },
        { id: 3, title: "Task" },
        { id: 4, title: "Project" },
    ];
    // console.log("Staff Detail==========",staffDetail)
    console.log("Staff Projects==========",staffDetail.projects)
    console.log("Staff Tasks==========",staffDetail.staff_tasks)
    useEffect(() => {
        getStaffDataHandle();
       
      
        
    }, []);


    const getStaffDataHandle = () => {
        try {
            var myHeaders = new Headers();
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(APP_URL.BaseUrl + GetStaffDetail + staffID, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setStaffDetail(result);
                    setProjectData(result?.projects)
                    setTaskData(result?.staff_tasks) 
                }).catch((error) => {
                    console.log('error', error);
                });
        } catch (error) {
            console.log("ERROR =====> ", error?.message);
        }
    };

    return (
        <ScrollView>
            <View style={{ flex: 1, marginVertical: '5%', paddingHorizontal: 20 }}>

                <View style={{ marginTop: "4%" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: AppTheme.PrimaryColor }}>Staff Detail</Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    {tabsData?.map((val, key) => {
                        return (
                            <TouchableOpacity
                                key={key}
                                activeOpacity={.7}
                                onPress={() => setTabActive(key)}
                                style={{ marginTop: 16, backgroundColor: tabActive === key ? "#EEE" : "transparent", marginLeft: key === 0 ? 20 : 0, borderRadius: tabActive === key ? 6 : 0, paddingHorizontal: 20, paddingVertical: 15 }}>
                                <Text style={{ fontSize: 13, color: tabActive === key ? "#4967ff" : "#000", fontFamily: 'Prompt-Medium' }}>
                                    {val?.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                
                {tabActive === 0 ?
                <>
                     <View style={{flexDirection:'row',paddingTop: "6%"}}>
                     <View style={{flex:1,justifyContent:"center"}}>
                         <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>First Name:</Text>
                         <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{staffDetail?.firstname === "" ? "------" : staffDetail?.firstname}</Text>
                     </View>
                     <View style={{flex:1,justifyContent:"center"}}>
                         <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Last Name:</Text>
                         <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{staffDetail?.lastname === "" ? "------" : staffDetail?.lastname}</Text>
                     </View>
                 </View>
                 <View style={{flexDirection:'row',paddingTop: "8%"}}>
                    <View style={{flex:1,}}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Phone Number:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{staffDetail?.phonenumber === "" ? "------" : staffDetail?.phonenumber}</Text>
                    </View>
                    <View style={{flex:1,}}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Email:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'lowercase' }}>{staffDetail?.email === "" ? "------" : staffDetail?.email}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',paddingTop: "8%"}}>
                    <View style={{flex:1,}}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Facebook:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{staffDetail?.facebook === "" ? "------" : staffDetail?.facebook}</Text>
                    </View>
                    <View style={{flex:1,}}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Linkedin:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{staffDetail?.linkedin === "" ? "------" : staffDetail?.linkedin}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',paddingTop: "8%"}}>
                    <View style={{flex:1,}}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Hourly Rate:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{staffDetail?.hourly_rate === "" ? "------" : staffDetail?.hourly_rate}</Text>
                    </View>
                    <View style={{flex:1,}}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Deparment:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{staffDetail?.departments === "" ? "------" : staffDetail?.departments}</Text>
                    </View>
                </View>
                 </>
                    : tabActive === 3 ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {projectData && projectData.length  > 0 ? (
                                <View style={styles.tableHeaderMain}>
                                    {/* <View style={{ flex: .2, justifyContent: 'center' }}>
                                        <Text style={styles.tableHeaderText}>S No</Text>
                                    </View> */}
                                    <View style={{ flex: .5, justifyContent: 'center' }}>
                                        <Text style={styles.tableHeaderText}>Name</Text>
                                    </View>
                                    <View style={{ flex: .4, justifyContent: 'center' }}>
                                        <Text style={styles.tableHeaderText}>S Date</Text>
                                    </View>
                                    <View style={{ flex: .4, justifyContent: 'center' }}>
                                        <Text style={styles.tableHeaderText}>D Date</Text>
                                    </View>                                 
                                    <View style={{ flex: .4, justifyContent: 'center' }}>
                                        <Text style={styles.tableHeaderText}>Status</Text>
                                    </View>
                                </View>
                            ) : null}
                            {projectData && projectData.length > 0 ? (
                                projectData.map((val, key) => {
                                    const even = key % 2 === 0;
                                    const lastIndex = projectData.length - 1 === key;
                                    return (
                                        <View
                                            key={key}
                                            style={[
                                                styles.tableRowMain,
                                                {
                                                    borderBottomLeftRadius: lastIndex ? 8 : 0,
                                                    borderBottomRightRadius: lastIndex ? 8 : 0,
                                                    backgroundColor: even ? "rgba(0,0,0,.05)" : "#FFF",
                                                },
                                            ]}
                                        >
                                            {/* <View style={{ flex: 0.2, justifyContent: 'center' }}>
                                                <Text style={styles.tableRowText}>{key + 1}</Text>
                                            </View> */}
                                            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                                <Text style={styles.tableRowText}>{val?.name}</Text>
                                            </View>
                                            <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                                <Text style={styles.tableRowText}>{moment(val?.start_date).format("DD-MM-YY")}</Text>
                                            </View>
                                            <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                                <Text style={styles.tableRowText}>{val?.deadline}</Text>
                                            </View>                 
                                            <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                                <Text style={styles.tableRowText}>
                                                    {val?.status === "1"
                                                        ? "Not Started"
                                                        : val?.status === "2"
                                                            ? "Awaiting Feedback"
                                                            : val?.status === "3"
                                                                ? "Testing"
                                                                : val?.status === "4"
                                                                    ? "In Progress"
                                                                    : val?.status === "5"
                                                                        ? "Completed"
                                                                        : val?.status === "6"
                                                                            ? "On Hold"
                                                                            : null}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                })
                            ) : (
                                <View>
                                    <Text style={{ alignItems: 'center' }}>No Project yet</Text>
                                </View>
                            )}

                        </View>
                        : tabActive === 1 ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {Array.isArray(timeSheetData) && timeSheetData.length > 0 ? (
                                <View style={styles.tableHeaderMain}>
                                    {/* <View style={{ flex: .2, justifyContent: 'center' }}>
                                        <Text style={styles.tableHeaderText}>S No</Text>
                                    </View> */}
                                    <View style={{ flex: .6, justifyContent: 'center' }}>
                                        <Text style={styles.tableHeaderText}>Name</Text>
                                    </View>
                                    <View style={{ flex: .4, justifyContent: 'center' }}>
                                        <Text style={styles.tableHeaderText}>S Date</Text>
                                    </View>
                                    <View style={{ flex: .4, justifyContent: 'center' }}>
                                        <Text style={styles.tableHeaderText}>D Date</Text>
                                    </View>
                                   
                                    <View style={{ flex: .4, justifyContent: 'center' }}>
                                        <Text style={styles.tableHeaderText}>Status</Text>
                                    </View>
                                </View>
                            ) : null}
                            {Array.isArray(timeSheetData) && timeSheetData.length > 0 ? (
                                timeSheetData.map((val, key) => {
                                    const even = key % 2 === 0;
                                    const lastIndex = timeSheetData.length - 1 === key;
                                    return (
                                        <View
                                            key={key}
                                            style={[
                                                styles.tableRowMain,
                                                {
                                                    borderBottomLeftRadius: lastIndex ? 8 : 0,
                                                    borderBottomRightRadius: lastIndex ? 8 : 0,
                                                    backgroundColor: even ? "rgba(0,0,0,.05)" : "#FFF",
                                                },
                                            ]}
                                        >
                                            {/* <View style={{ flex: 0.2, justifyContent: 'center' }}>
                                                <Text style={styles.tableRowText}>{key + 1}</Text>
                                            </View> */}
                                            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                                <Text style={styles.tableRowText}>{val?.name}</Text>
                                            </View>
                                            <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                                <Text style={styles.tableRowText}>{val?.start_date}</Text>
                                            </View>
                                            <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                                <Text style={styles.tableRowText}>{val?.deadline}</Text>
                                            </View>
                  
                                            <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                                <Text style={styles.tableRowText}>
                                                    {val?.status === "1"
                                                        ? "Not Started"
                                                        : val?.status === "2"
                                                            ? "Awaiting Feedback"
                                                            : val?.status === "3"
                                                                ? "Testing"
                                                                : val?.status === "4"
                                                                    ? "In Progress"
                                                                    : val?.status === "5"
                                                                        ? "Completed"
                                                                        : val?.status === "6"
                                                                            ? "On Hold"
                                                                            : null}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                })
                            ) : (
                                <View>
                                    <Text style={{ alignItems: 'center' }}>No TimeSheet yet</Text>
                                </View>
                            )}

                        </View>
                            : tabActive === 2 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                     {Array.isArray(taskData) && taskData.length > 0 ? (
                                        <View style={styles.tableHeaderMain}>
                                            {/* <View style={{ flex: .2, justifyContent: 'center' }}>
                                                <Text style={styles.tableHeaderText}>S No</Text>
                                            </View> */}
                                            <View style={{ flex: .5, justifyContent: 'center' }}>
                                                <Text style={styles.tableHeaderText}>Name</Text>
                                            </View>
                                            <View style={{ flex: .4, justifyContent: 'center' }}>
                                                <Text style={styles.tableHeaderText}>S Date</Text>
                                            </View>
                                            <View style={{ flex: .4, justifyContent: 'center' }}>
                                                <Text style={styles.tableHeaderText}>Priority</Text>
                                            </View>

                                            <View style={{ flex: .4, justifyContent: 'center' }}>
                                                <Text style={styles.tableHeaderText}>Status</Text>
                                            </View>
                                        </View>
                                    ) : null}
                                     {Array.isArray(taskData) && taskData.length > 0 ? (
                                        taskData.map((val, key) => {
                                            const even = key % 2 === 0;
                                            const lastIndex = taskData.length - 1 === key;
                                            return (
                                                <View
                                                    key={key}
                                                    style={[
                                                        styles.tableRowMain,
                                                        {
                                                            borderBottomLeftRadius: lastIndex ? 8 : 0,
                                                            borderBottomRightRadius: lastIndex ? 8 : 0,
                                                            backgroundColor: even ? "rgba(0,0,0,.05)" : "#FFF",
                                                        },
                                                    ]}
                                                >

                                                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                                        <Text style={styles.tableRowText}>{val?.name}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                                        <Text style={styles.tableRowText}>{moment(val?.startdate).format("DD-MM-YY")}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                                        <Text style={styles.tableRowText}>{val?.priority === "1" ? "Low" :
                                                            val?.priority === "2" ? "Medium" :
                                                                val?.priority === "3" ? "High" :
                                                                    val?.priority === "4" ? "Urgent" : null}</Text>
                                                    </View>

                                                    <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                                        <Text style={styles.tableRowText}>
                                                            {val?.status === "1"
                                                                ? "Not Started"
                                                                : val?.status === "2"
                                                                    ? "Awaiting Feedback"
                                                                    : val?.status === "3"
                                                                        ? "Testing"
                                                                        : val?.status === "4"
                                                                            ? "In Progress"
                                                                            : val?.status === "5"
                                                                                ? "Completed"
                                                                                : val?.status === "6"
                                                                                    ? "On Hold"
                                                                                    : null}
                                                        </Text>
                                                    </View>
                                                </View>
                                            );
                                        })
                                    ) : (
                                        <View>
                                            <Text>No Task yet</Text>
                                        </View>
                                    )}

                                </View>
                                : null}
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    tableHeaderMain: {
        flexDirection: "row",
        marginTop: 14,
        backgroundColor: "#FFF",
        marginHorizontal: 14,
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomColor: "#dee2e6",
        borderBottomWidth: 1,
        shadowColor: "#EEEEEE",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    tableHeaderText: {
        fontSize: 14,
        color: "#000",
        fontFamily: 'Prompt-Medium',
    },
    tableRowMain: {
        paddingVertical: 14,
        flexDirection: "row",
        marginHorizontal: 14,
        paddingHorizontal: 12,
        backgroundColor: "rgba(0,0,0,.05)",
    },
    tableRowText: {
        fontSize: 12,
        color: "#212529",
        fontFamily: 'Prompt-Light',
    },
})

export default ViewStaff;
