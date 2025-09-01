import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { Navigation } from "react-native-navigation";
import { AppTheme } from '../AppTheme/AppTheme';
import axios from 'axios';
import moment from 'moment';
import { APP_URL, GetProjectDetail, SetAppointments } from '../Components/Api';
import Loader from '../Components/Loader';
import LinearGradient from "react-native-linear-gradient";


const dummy = [
    {

        "name": "Fixed Rate"
    },
    {
        "name": "Project Hours"
    },
    {
        "name": "Task Hours Based on task hourly rate"
    }
];
const statusD = [
    {
        "id": 1,
        "name": "Not Started"
    },
    {
        "id": 2,
        "name": "In Progress"
    },
    {
        "id": 3,
        "name": "On Hold"
    }
    ,
    {
        "id": 4,
        "name": "Cancelled"
    }
    ,
    {
        "id": 5,
        "name": "Finished"
    }

];
const tabsData = [
    { id: 1, title: "Overview" },
    { id: 2, title: "Tasks" },
    { id: 3, title: "Timesheets" },
    { id: 4, title: "Members" },
];

const ViewProject = (props) => {
    const { projectDetail } = props;
    const [loader, setLoader] = useState(true);
    const [tabActive, setTabActive] = useState(0);
    const [contact, setContact] = useState("");
    const [billingType, setbillingType] = useState("");
    const [projectStatus, setprojectStatus] = useState("");
    const [dataSource, setDataSource] = useState({});
    const [mainData, setMainData] = useState([]);
    const [leadsData, setLeadsData] = useState([]);
    const [contactata, setcontactData] = useState([]);
    const [staffmembersdata, setstaffmembers] = useState([]);
    const [billingTypeData, setbillingTypeData] = useState([]);
    const [appointmentTypetata, setappointmentType] = useState([]);
    const [projectStatusData, setprojectStatusData] = useState([]);
    const [taskData, setTaskData] = useState([]);
    const [membersData, setMembersData] = useState([]);
    console.log("projectDetail ==============>", projectDetail)
    console.log("dataSource ===============> :", dataSource)

    useEffect(() => {
        let mapped = dummy.map((item, index) => {
            let obj = {
                id: index + 1,
                value: item.name
            }
            return obj
        });
        setbillingTypeData([...mapped]);
        let mappedstatus = statusD.map((item, index) => {
            let obj = {
                key: item.id,
                value: item.name
            };
            return obj;
        });
        setprojectStatusData([...mappedstatus]);
        apiPost();


    }, []);
    console.log("MEMBER====", membersData)
    const apiPost = async (s) => {
        axios.get(APP_URL.BaseUrl + SetAppointments)
            .then(async data => {
                let _data = data.data.data.proposal_related
                let mapped_array = []
                let mapped = _data.map((item) => {
                    let obj = {
                        id: 1,
                        value: item.name
                    }
                    return obj;
                })
                setMainData([...mapped]);
                let _leadsdata = data.data.data.leads
                let mappedLeads = _leadsdata.map((item) => {
                    let obj = {
                        id: 1,
                        value: item.name
                    };
                    return obj;
                })
                setLeadsData([...mappedLeads]);
                let _contactdata = data.data.data.contacts
                let contactsLeads = _contactdata.map((item) => {
                    let obj = {
                        key: item.client_id,
                        value: item.firstname + " " + item.lastname + item.company
                    };
                    return obj;
                });
                const cdataFinal = [...contactsLeads];
                setcontactData(cdataFinal);
                let appointment_typesdata = data.data.data.appointment_types
                let appointment_typesLeads = appointment_typesdata.map((item) => {
                    let obj = {
                        id: 1,
                        value: item.type
                    };
                    return obj;
                });
                setappointmentType([...appointment_typesLeads]);
                let _staff_membersdata = data.data.data.staff_members
                let staff_membersLeads = _staff_membersdata.map((item) => {
                    let obj = {
                        id: item.staffid,
                        item: item.firstname + " " + item.lastname
                    };
                    return obj;
                });
                setstaffmembers([...staff_membersLeads]);

                getProjectDetail(cdataFinal);
            }).catch(e => {
                console.log(`Error =`, e);
            });
    };
    const handleNewCleintPressed = () => {
        Navigation.push("AppStack", {
            component: {
                name: 'EditNewProject',
                passProps: {
                    projectDetail: projectDetail,
                },
            },
        });
    };
    const getProjectDetail = (cdataFinal) => {
        try {
            setLoader(true);
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(APP_URL.BaseUrl + GetProjectDetail + projectDetail?.id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoader(false);
                    getTaskDetail(result?.id);
                    getMemberDetail(result?.id);
                    setDataSource(result);
                    cdataFinal?.map(val => {
                        if (val.key === result.clientid) {
                            setContact(val.value);
                        }
                    });
                    // billingTypeData?.map(val => {
                    //     if (val.id === parseInt(result?.billing_type)) {
                    //         setbillingType(val.value);
                    //     }
                    // });
                    // projectStatusData?.map(val => {
                    //     if (val.key === parseInt(result?.status)) {
                    //         setprojectStatus(val.value);
                    //     }
                    // });

                }).catch(error => {
                    setLoader(false);
                    console.log("ERROR ======> ", error?.message);
                });
        } catch (error) {
            setLoader(false);
            console.log("ERROR ======> ", error?.message);
        }
    };
    const getTaskDetail = (project_id) => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${APP_URL.BaseUrl}/api/ProjectsTasks/getprojectstasks/?projectid=${project_id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result?.status) {
                        if (result?.data !== "Not Found.") {
                            setTaskData(result?.data);
                        }
                    };
                }).catch(error => {
                    console.log("ERROR ======> ", error?.message);
                });
        } catch (error) {
            console.log("ERROR ======> ", error?.message);
        }
    };
    const getMemberDetail = (project_id) => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${APP_URL.BaseUrl}/api/Clients/getProjectMembers/?projectid=${project_id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result?.status) {
                        if (result?.data !== "Not Found.") {
                            setMembersData(result?.data);
                        }
                    };
                }).catch(error => {
                    console.log("ERROR ======> ", error?.message);
                });
        } catch (error) {
            console.log("ERROR ======> ", error?.message);
        }
    };

    return (
        <View>
            <Loader loading={loader} />
            <ScrollView>
                <View style={{ flex: 1, marginVertical: '5%' }}>
                    <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Prompt-Medium', color: AppTheme.PrimaryColor }}>
                                Project Detail
                            </Text>
                        </View>
                        <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => handleNewCleintPressed()}>
                            <Text style={{ fontSize: 18, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light' }}>
                                Edit Project
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: "4%", paddingTop: "4%", borderTopColor: "#EEEEEE", borderTopWidth: 1 }}></View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {tabsData?.map((val, key) => {
                            return (
                                <TouchableOpacity
                                    key={key}
                                    activeOpacity={.7}
                                    onPress={() => setTabActive(key)}
                                    style={{ backgroundColor: tabActive === key ? "#ffd21f" : "gray", marginLeft: key === 0 ? 20 : 10, borderRadius: 100, paddingHorizontal: 20, paddingVertical: 10 }}>
                                    <Text style={{ fontSize: 13, color: "#FFF", fontFamily: 'Prompt-Medium' }}>
                                        {val?.title}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    {tabActive === 0 ?
                        <View style={{ marginTop: "8%", paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Bold' }}>
                                Overview
                            </Text>
                            <View style={{ flexDirection: "row", borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12 }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium' }}>
                                        Projects #:
                                    </Text>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                        {dataSource?.id}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12 }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium' }}>
                                        Client:
                                    </Text>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                        {dataSource?.client_data?.company}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12 }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium' }}>
                                        Billing Type:
                                    </Text>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                        { }
                                        {dataSource?.billing_type === "1" ? "Fixed Rate" :
                                            dataSource?.billing_type === "2" ? "Project Hours" :
                                                dataSource?.billing_type === "3" ? "Task Hours Based on task hourly rate" :
                                                    null}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12 }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium' }}>
                                        Project Status:
                                    </Text>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>

                                        {dataSource?.status === "1" ? "Not Started" :
                                            dataSource?.status === "2" ? "Awaiting Feedback" :
                                                dataSource?.status === "3" ? "Testing" :
                                                    dataSource?.status === "4" ? "Inprogess" :
                                                        dataSource?.status === "5" ? "Completed" :
                                                            dataSource?.status === "6" ? "On Hold" : null}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12 }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium' }}>
                                        Date Created:
                                    </Text>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                        {dataSource?.project_created}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12 }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium' }}>
                                        Start Date:
                                    </Text>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                        {dataSource?.start_date}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12 }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium' }}>
                                        Deadline:
                                    </Text>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                        {dataSource?.deadline}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12 }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium' }}>
                                        Estimated Hours:
                                    </Text>
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                        {dataSource?.estimated_hours}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12 }}>
                                <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium' }}>
                                    DESCRIPTION:
                                </Text>
                                {dataSource?.description === "" ?
                                    <Text style={{ fontSize: 13, marginTop: 10, color: "#777", fontFamily: 'Prompt-Light' }}>
                                        No description for this project
                                    </Text>
                                    :
                                    <Text style={{ fontSize: 14, marginTop: 10, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                        {dataSource?.description}
                                    </Text>
                                }
                            </View>
                            {/* <View style={{ flexDirection:"row",borderColor:"#CCC",borderRadius:6,marginTop:14,borderWidth:1,paddingHorizontal:14,paddingVertical:12 }}>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium' }}>
                                        MEMBERS:
                                    </Text>
                                </View>
                                <View style={{justifyContent:"center"}}>
                                    {dataSource?.settings?.view_team_members === "0" ? 
                                        <Text style={{ fontSize: 13, color: "#777", fontFamily: 'Prompt-Light' }}>
                                            No members for this project
                                        </Text>
                                    :
                                        <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                            {dataSource?.settings?.view_team_members}
                                        </Text>
                                    }
                                </View>
                            </View> */}
                        </View>
                        : tabActive === 1 ?
                            <View>
                                {taskData?.map((val, key) => {
                                    return (
                                        <View key={key} style={{ marginHorizontal: 16, borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 16 }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <View style={{ flex: 1, justifyContent: "center" }}>
                                                    <Text style={{ fontSize: 18, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Bold' }}>
                                                        {val?.name.split(' ').slice(0, 3).join(' ')}{val?.name.split(' ').length > 3 ? ' ...' : ''}
                                                    </Text>
                                                </View>
                                                <View style={{ justifyContent: "center", borderRadius: 100, backgroundColor: "red", height: 30, paddingHorizontal: 14 }}>
                                                    <Text style={{ fontSize: 12, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium', color: "#FFF" }}>
                                                        {val?.priority === "1" ? "Low" :
                                                            val?.priority === "2" ? "Medium" :
                                                                val?.priority === "3" ? "High" :
                                                                    val?.priority === "4" ? "Urgent" : null}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 18 }}>
                                                <View style={{ justifyContent: "center", borderRightColor: "#CCC", borderRightWidth: 1, paddingRight: 12 }}>
                                                    <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                                        <Text>
                                                            {"Status: "}
                                                        </Text>
                                                        <Text style={{ color: "#ffd21f" }}>
                                                            {val?.status === "1" ? "Not Started" :
                                                                val?.status === "2" ? "Awaiting Feedback" :
                                                                    val?.status === "3" ? "Testing" :
                                                                        val?.status === "4" ? "Inprogess" :
                                                                            val?.status === "5" ? "Completed" :
                                                                                val?.status === "6" ? "On Hold" : null}
                                                        </Text>
                                                    </Text>
                                                </View>
                                                <View style={{ justifyContent: "center", paddingLeft: 12 }}>
                                                    {/* <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                                    <Text>
                                                        {"Assigned To: "}
                                                    </Text>
                                                    <Text style={{color:"#ffd21f"}}>
                                                        {val?.note}
                                                    </Text>
                                                </Text> */}
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 18 }}>
                                                <View style={{ justifyContent: "center", borderRightColor: "#CCC", borderRightWidth: 1, paddingRight: 12 }}>
                                                    <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                                        <Text>
                                                            {"Started: "}
                                                        </Text>
                                                        <Text style={{ color: "green" }}>
                                                            {val?.startdate}
                                                        </Text>
                                                    </Text>
                                                </View>
                                                <View style={{ justifyContent: "center", paddingLeft: 12 }}>
                                                    <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                                        <Text>
                                                            {"Deadline: "}
                                                        </Text>
                                                        <Text style={{ color: "red" }}>
                                                            {val?.duedate}
                                                        </Text>
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            : tabActive === 2 ?
                                <View>
                                    {dataSource?.timesheets?.map((val, key) => {
                                        return (
                                            <View key={key} style={{ marginHorizontal: 16, borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 16 }}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                                        <Text style={{ fontSize: 20, color: AppTheme.PrimaryColor, color: "#000", fontFamily: 'Prompt-Bold' }}>
                                                            {val?.full_name}
                                                        </Text>
                                                    </View>
                                                    {/* <View style={{justifyContent:"center",borderRadius:100,backgroundColor:"gray",height:30,paddingHorizontal:14}}>
                                                <Text style={{ fontSize: 12, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Medium',color:"#FFF" }}>
                                                    {val?.priority === "1" ? "Low" :
                                                    val?.priority === "2" ? "Medium" :
                                                    val?.priority === "3" ? "High" :
                                                    val?.priority === "4" ? "Urgent" : null}
                                                </Text>
                                            </View> */}
                                                </View>
                                                <View style={{ flexDirection: "row", marginTop: 18 }}>
                                                    <View style={{ justifyContent: "center", borderRightColor: "#CCC", borderRightWidth: 1, paddingRight: 12 }}>
                                                        <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                                            <Text>
                                                                {"Started: "}
                                                            </Text>
                                                            <Text style={{ color: "#ffd21f" }}>
                                                                {moment(val?.start_time).format("h:mm:ss a")}
                                                            </Text>
                                                        </Text>
                                                    </View>
                                                    <View style={{ justifyContent: "center", paddingLeft: 12 }}>
                                                        <Text style={{ fontSize: 14, color: "red", fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                                            <Text>
                                                                {"End Time: "}
                                                            </Text>
                                                            <Text style={{ color: "red" }}>
                                                                {moment(val?.end_time).format("h:mm:ss a")}
                                                            </Text>
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: "row", marginTop: 18 }}>
                                                    <View style={{ justifyContent: "center", borderRightColor: "#CCC", borderRightWidth: 1, paddingRight: 12 }}>
                                                        <Text style={{ fontSize: 14, color: "#000", fontWeight: "bold", fontFamily: 'Prompt-Light', textTransform: 'capitalize' }}>
                                                            <Text>
                                                                {"Note: "}
                                                            </Text>
                                                            <Text style={{ color: "green" }}>
                                                                {val?.note}
                                                            </Text>
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                                : tabActive === 3 ?
                                    <View style={{ marginTop: "8%", paddingHorizontal: 20 }}>
                                        <Text style={{ fontSize: 16, fontWeight: "bold", color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Bold' }}>
                                            Members
                                        </Text>
                                        {membersData?.map((val, key) => {
                                            return (
                                                <View key={key} style={{ flexDirection: "row", borderColor: "#CCC", borderRadius: 6, marginTop: 14, borderWidth: 1, paddingHorizontal: 2, paddingVertical: 12 }}>
                                                    <View >
                                                        <LinearGradient
                                                            end={{ x: 1, y: 1 }}
                                                            start={{ x: 1, y: 0 }}
                                                            colors={['#1b1366', '#201492']}
                                                            style={{ borderRadius: 100, height: 40, width: 40, marginLeft: 20, alignItems: "center", justifyContent: "center" }}>
                                                            <Text style={{ color: "#FFF", fontFamily: "Prompt-Medium" }}>
                                                                {val?.firstname[0]}
                                                            </Text>
                                                        </LinearGradient>
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: "center", paddingLeft: 12 }}>
                                                        <Text style={{ color: "#000", fontFamily: "Prompt-Light" }}>
                                                            {val?.firstname}
                                                        </Text>
                                                    </View>
                                                    <View style={{ justifyContent: "center" }}>
                                                        <Text style={{ fontSize: 14, color: AppTheme.PrimaryColor, fontFamily: 'Prompt-Light', textTransform: 'lowercase' }}>
                                                            {val?.email}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    : null}
                </View>
            </ScrollView>
        </View>
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

export default ViewProject;