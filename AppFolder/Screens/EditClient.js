import React, { useEffect, useState } from 'react';
import { View, Pressable, Platform, StyleSheet, Text, Image, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { InputField } from '../Components/InputField'
import { Selectset } from '../Components/SelectList';
import { SingleDatepicker } from '../Components/SingleDatepicker';
import CheckBox from '@react-native-community/checkbox';
import { Multiselection } from '../Components/MultiSelectbox';
import { PhoneInput } from '../Components/phoneInput';
import axios from "axios";
import { addClient, eidtClient, addProject, APP_URL, GetAllAnnouncement, GetAllAppointments, SetAppointments } from '../Components/Api';
import UserPermissions from '../Components/UserPermissions';
import { CustomTextfield, CustomTextfieldBlank, GoToNextController } from '../Components/General';
import { AppTheme } from '../AppTheme/AppTheme';
import moment from 'moment';

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
]
const statusD = [
    {

        "name": "Not Started"
    },
    {
        "name": "In Progress"
    },
    {
        "name": "On Hold"
    }
    ,
    {
        "name": "Cancelled"
    }
    ,
    {
        "name": "Finished"
    }

]

const apiPost = async (s) => {
    //setLoading(true)


    console.log(`url is =`, GetAllAppointments)

    axios.post( APP_URL.BaseUrl + GetAllAppointments, { "staff_id": UserPermissions.permissions[0].staffid })
        .then(data => {
            // setLoading(false)

            console.log(`GetAllAppointments DATA = ${JSON.stringify(data.data.data, null, 2)}`)
            // setMainData([
            //   { key: '1', value: '0' },
            //   { key: '1', value: '0' },
            //   { key: '1', value: '0' } 
            // ]);
            setMainData(
                dummy.map((item, index) => {
                    return {
                        id: item.id,
                        value: item.name
                    }
                })
            )
            // setMainData(data.data.data);
            // setApiData([])
            // setDataAllProjects(data.data.data);
        })
        .catch(e => {
            console.log(`Error =`, e)

            // setLoading(false)

        })
}

const EditClient = (props) => {
    const {clientDetail} = props;
    const [mainData, setMainData] = useState([]);
    const [contactata, setcontactData] = useState([]);
    const [billingTypeData, setbillingTypeData] = useState([]);
    const [projectStatusData, setprojectStatusData] = useState([]);
    const [company, setcompany] = useState(clientDetail?.company)
    const [phone, setPhone] = useState(clientDetail?.phonenumber)
    const [website, setwebsite] = useState(clientDetail?.website)
    const [address, setaddress] = useState(clientDetail?.address)
    const [city, setCity] = useState(clientDetail?.city)
    const [state, setState] = useState(clientDetail?.state)
    const [zipcode, setzipcode] = useState(clientDetail?.zip)
    const [buttonLoader, setButtonLoader] = useState(false);
    const [proName, setProName] = useState("")
    const [totalRate, settotalRate] = useState("")
    const [billingType, setbillingType] = useState("")
    const [projectStatus, setprojectStatus] = useState("")
    const [estimatedTime, setestimatedTime] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [deadlineDate, setDeadlineDate] = useState(new Date());
    const [Description, setDescription] = useState("")
    // const [startDate, setstartDate] = useState("")
    const [leadsData, setLeadsData] = useState([]);
    const [appointmentTypetata, setappointmentType] = useState([]);
    const [staffmembersdata, setstaffmembers] = useState([]);
    const [related, setRelated] = useState([])
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [clients, setClients] = useState([])
    const [textarea, setTextarea] = useState("")
    const [leads, setLeads] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [date, setDate] = useState("")
    const [location, setLocation] = useState("")
    const [repeat, setrepeat] = useState("")
    const [selectedTeams, setSelectedTeams] = useState([])

    console.log("clientDetail =====> ", clientDetail);

    useEffect(() => {
        //for Billing data
        let mapped = dummy.map((item, index) => {
            let obj = {
                id: 1,
                value: item.name
            }
            return obj
        })
        setbillingTypeData(
            [...mapped]
        )
        //for Project Status data

        let mappedstatus = statusD.map((item, index) => {
            let obj = {
                id: 1,
                value: item.name
            }
            return obj
        })
        setprojectStatusData(
            [...mappedstatus]
        )
        apiPost();


    }, []);
    const updateClientHandle = async () => {
        setButtonLoader(true);
        var raw = JSON.stringify({
            company: company,
            phonenumber: phone,
            address: address,
            website: website,
            city: city,
            state: state,
            zip: zipcode,
            source:'',
            status:'',
            name:''
        });

        var requestOptions = {
            method: 'PUT',
            body: raw,
            redirect: 'follow'
        };

        fetch(APP_URL.BaseUrl+eidtClient+clientDetail?.userid, requestOptions)
        .then(response => response.json())
        .then(result => {
            setButtonLoader(false);
            console.log("result =====> ", result);
            if (result.status == 400) {
                alert(result?.message)
            } else if (result?.status == true) {
                Alert.alert(result?.message, '', [
                    {
                        text: 'OK', onPress: async () => {
                            GoToNextController("Contacts")
                        }
                    },
                ]);
            } else if (result?.status == false) {
                alert(result?.message);
            } 
        }).catch(error => {
            setButtonLoader(false);
            console.log(`Error =`, error.message);
        });
    };

    return (
        <View style={styles.maincontainer}>
            <ScrollView>
                <View>
                    <Text style={styles.labelText}>Edit Client</Text>
                    <CustomTextfieldBlank value={company} setValue={setcompany} style={styles.MarginTop} placeholder="Company" isSecure={false} />
                    <CustomTextfieldBlank value={phone} setValue={setPhone} style={styles.MarginTop} placeholder="Phone" isSecure={false} />
                    {/* <CustomTextfieldBlank value={address} setValue={setaddress} style={styles.MarginTop} placeholder="Address" isSecure={false} /> */}
                    <View style={{ borderRadius: 5, borderColor: "lightgray", borderWidth: 1, ...styles.MarginTop }} >
                        <TextInput
                            value={address}
                            multiline={true}
                            placeholder={"Address"}
                            onChangeText={(val) => {setaddress(val)}}
                            style={{marginHorizontal:10,textAlign:'left'}}
                        />
                    </View>
                    <CustomTextfieldBlank value={website} setValue={setwebsite} style={styles.MarginTop} placeholder="Website" isSecure={false} />
                    <CustomTextfieldBlank value={city} setValue={setCity} style={styles.MarginTop} placeholder="City" isSecure={false} />
                    <CustomTextfieldBlank value={state} setValue={setState} style={styles.MarginTop} placeholder="State" isSecure={false} />
                    <CustomTextfieldBlank value={zipcode} setValue={setzipcode} style={styles.MarginTop} placeholder="Zipcode" isSecure={false} />
                </View>
                <TouchableOpacity style={{ width: "70%", backgroundColor: AppTheme.PrimaryColor, marginTop: 20, height: 42, borderRadius: 6, alignItems: "center", justifyContent: "center", alignSelf: "center" }} 
                    onPress={() => {
                        if (company == "") {
                            alert("Please enter Company Name")
                        }
                        else if (phone == "") {
                            alert("Please enter Phone No")
                        }
                        else {
                            updateClientHandle();
                        }
                    //Navigation.push("AppStack",{component:{name:"Dashboard" , options: {  topBar: { backButton:{ visible: false}, visible: true , title : { text : "Dashboard"} } } } })
                    }}>
                    {buttonLoader ? 
                        <ActivityIndicator 
                            size={"small"}
                            color={"#FFF"}
                        />
                    :
                        <Text style={{ color: "white" }}>
                            Edit Client
                        </Text>
                    }
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({


    textAreaContainer: {
        borderColor: "lightgray",
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        marginTop: 15
    },
    textAreaC: {
        height: 120,
        justifyContent: "flex-start"
    }
    ,
    dflex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    labelText: {
        fontSize: 20,
        color: '#333',
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    maincontainer: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    textarea: {
        marginTop: 10,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 4,
        padding: 10,
    },
    MarginTop: {
        marginTop: 20,
    },
    para: {
        fontSize: 15,
        marginTop: 20,
        marginBottom: 20
    },
    checkedBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    checkText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    checkmain: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 15
    }
});


export default EditClient;
