import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Navigation } from "react-native-navigation";
import { AppTheme } from '../AppTheme/AppTheme';
import axios from 'axios';
import { APP_URL, GetProjectDetail, SetAppointments } from '../Components/Api';

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

const ViewTask = (props) => {
    const {projectDetail} = props;
    const [contact, setContact] = useState("");
    const [mainData, setMainData] = useState([]);
    const [leadsData, setLeadsData] = useState([]);
    const [contactata, setcontactData] = useState([]);
    const [billingType, setbillingType] = useState("");
    const [projectStatus, setprojectStatus] = useState("");
    const [staffmembersdata, setstaffmembers] = useState([]);
    const [billingTypeData, setbillingTypeData] = useState([]);
    const [appointmentTypetata, setappointmentType] = useState([]);
    const [projectStatusData, setprojectStatusData] = useState([]);

    useEffect(() => {
        let mapped = dummy.map((item, index) => {
            let obj = {
                id: index+1,
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
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            // fetch(APP_URL.BaseUrl + GetProjectDetail+"115", requestOptions)
            console.log("URL =====> ", APP_URL.BaseUrl + GetProjectDetail+projectDetail?.id);
            fetch(APP_URL.BaseUrl + GetProjectDetail+projectDetail?.id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("result =====> ", result);
                cdataFinal?.map(val => {
                    if (val.key === result.clientid) {
                        setContact(val.value);
                    }
                });
                billingTypeData?.map(val => {
                    if (val.id === parseInt(result?.billing_type)) {
                        setbillingType(val.value);
                    }
                });
                projectStatusData?.map(val => {
                    if (val.key === parseInt(result?.status)) {
                        setprojectStatus(val.value);
                    }
                });
                // settotalRate(result?.project_cost);
                // setestimatedTime(result?.estimated_hours);
                // // setStartDate(result?.start_date);
                // // setDeadlineDate(result?.deadline);
                // setDescription(result?.description);
            }).catch(error => {
                console.log("ERROR ======> ", error?.message);
            });
        } catch (error) {
            console.log("ERROR ======> ", error?.message);
        }
    };
   
    return (
        <ScrollView>
            <View style={{ flex: 1, marginVertical: '5%', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: "row", }}>
                    <View style={{ flex: 1, justifyContent:"center" }}>
                        <Text style={{ fontSize: 20 }}>Project</Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }} onPress={()=> handleNewCleintPressed()}>
                        <Text style={{ fontSize: 20, color: AppTheme.PrimaryColor }}>Edit Project</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: "4%", paddingTop: "4%", borderTopColor: "#EEEEEE", borderTopWidth: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight:"bold", color: AppTheme.PrimaryColor }}>Project Detail</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: "6%" }}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Project Name:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{projectDetail?.name === null ? "------" : projectDetail?.name}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Client Name:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{contact === null ? "------" : contact}</Text>
                    </View>
                </View>
                <View style={{ flexDirection:'row', paddingTop: "8%" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Billing Type:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{billingType === null ? "------" : billingType}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Project Status:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{projectStatus === null ? "------" : projectStatus}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: "8%" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Project Cost:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{projectDetail?.project_cost === null ? "------" : projectDetail?.project_cost}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Estimated Hours:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{projectDetail?.estimated_hours === null ? "------" : projectDetail?.estimated_hours}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: "8%" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Project Start Date:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{projectDetail?.start_date === null ? "------" : projectDetail?.start_date}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Project End Date:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{projectDetail?.deadline === null ? "------" : projectDetail?.deadline}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: "8%" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Project Description:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{projectDetail?.description === null ? "------" : projectDetail?.description}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ViewTask;