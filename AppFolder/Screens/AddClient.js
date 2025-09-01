import React, { useEffect, useState } from 'react';
import { View, Pressable, Platform, StyleSheet, Text, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import { InputField } from '../Components/InputField'
import { Selectset } from '../Components/SelectList';
import { SingleDatepicker } from '../Components/SingleDatepicker';
import CheckBox from '@react-native-community/checkbox';
import { Multiselection } from '../Components/MultiSelectbox';
import { PhoneInput } from '../Components/phoneInput';
import axios from "axios";
import { addClient, addProject, APP_URL, GetAllAnnouncement, GetAllAppointments, SetAppointments } from '../Components/Api';
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




const AddClient = () => {

    const [mainData, setMainData] = useState([]);
    const [contactata, setcontactData] = useState([]);
    const [billingTypeData, setbillingTypeData] = useState([]);
    const [projectStatusData, setprojectStatusData] = useState([]);



    const [company, setcompany] = useState("")
    const [website, setwebsite] = useState("")
    const [address, setaddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setzipcode] = useState("")




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
    const [phone, setPhone] = useState("")
    const [contact, setContact] = useState("")
    const [date, setDate] = useState("")
    const [location, setLocation] = useState("")
    const [repeat, setrepeat] = useState("")
    const [selectedTeams, setSelectedTeams] = useState([])


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


    }, [])


    const apiAddPro = async (s) => {
        //  setLoading(true)
        const params = JSON.stringify({

        });
        let data = {

            company: company,
            phonenumber: phone,
            address: address,
            website: website,
            city: city,
            state: state,
            zip: zipcode

        }
        console.log("data =====> ", data);
        // return;
        const formData = new FormData();
        for (var key of Object.keys(data)) {
            formData.append(key, data[key])
        }
        // console.log(JSON.stringify(data, null, 2));
        // const formData = new FormData();
        // formData.append(JSON.stringify(data));

        let mappedItems = selectedTeams.map((item, index) => {
            return item.id
        })
        // console.log("SELECTED TEAMS = ", mappedItems);
        // console.log(`params =`, formData)
        // console.log(`addProject Url =`, addProject)



        axios.post(
            APP_URL.BaseUrl +  addClient,
            // { ...data },
            formData,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
        )
            .then(_data => {

                console.log(" id Response Data:", _data.data.last_inserted_id);
                const Client_id = _data.data.last_inserted_id;
          
               AsyncStorage.setItem('client_id',Client_id.toString())
                console.log(_data.data, null, 2);
                //    setLoading(false)

                if (_data.data.status == 400) {
                    alert(_data.data.message)

                }
                else if (_data.data.status == true) {
                    // alert(_data.data.message)

                    GoToNextController("AddContact")
                }


            })
            .catch(e => {
                console.log(`Error =`, JSON.stringify(e))
                // setLoading(false)


            })
    }



    const apiPost = async (s) => {
        // setLoading(true)


        console.log(`url is =`, SetAppointments)

        axios.get( APP_URL.BaseUrl + SetAppointments)
            .then(async data => {
                // setLoading(false)

                //console.log(`GetAllAppointments DATA = ${JSON.stringify(data.data.data, null, 2)}`)
                let _data = data.data.data.proposal_related

                let mapped_array = []

                let mapped = _data.map((item) => {
                    let obj = {
                        id: 1,
                        value: item.name
                    }


                    return obj
                })
                setMainData([...mapped]);

                let _leadsdata = data.data.data.leads


                let mappedLeads = _leadsdata.map((item) => {
                    let obj = {
                        id: 1,
                        value: item.name
                    }


                    return obj
                })
                setLeadsData([...mappedLeads]);

                let _contactdata = data.data.data.contacts


                let contactsLeads = _contactdata.map((item) => {
                    let obj = {
                        key: item.client_id,
                        value: item.firstname + " " + item.lastname + item.company
                    }


                    return obj
                })
                setcontactData([...contactsLeads]);

                //console.log("MAPPED contactsLeads- ", contactsLeads)
                //console.log(contactsLeads.length);

                let appointment_typesdata = data.data.data.appointment_types


                let appointment_typesLeads = appointment_typesdata.map((item) => {
                    let obj = {
                        id: 1,
                        value: item.type


                    }
                    return obj
                })
                setappointmentType([...appointment_typesLeads]);

                //console.log("MAPPED appointment_typesLeads- ", appointment_typesLeads)
                //console.log(appointment_typesLeads.length);

                let _staff_membersdata = data.data.data.staff_members


                let staff_membersLeads = _staff_membersdata.map((item) => {
                    // console.log("MAPPED item.staffid- ", item.staffid)
                    let obj = {
                        id: item.staffid,
                        item: item.firstname + " " + item.lastname
                    }
                    return obj
                })
                setstaffmembers([...staff_membersLeads]);


                setTimeout(() => {
                    // setMainData(mapped);
                }, 500)

            })
            .catch(e => {
                console.log(`Error =`, e)

                // setLoading(false)

            })
    }

    return (
        <>
            <View style={styles.maincontainer} >

                <ScrollView>

                    <View>
                        <Text style={styles.labelText}>Add Client</Text>
                        <CustomTextfieldBlank value={company} setValue={setcompany} style={styles.MarginTop} placeholder="Company" isSecure={false} />
                        <CustomTextfieldBlank value={phone} setValue={setPhone} style={styles.MarginTop} placeholder="Phone" isSecure={false} />
                        <CustomTextfieldBlank value={address} setValue={setaddress} style={styles.MarginTop} placeholder="Address" isSecure={false} />
                        <CustomTextfieldBlank value={website} setValue={setwebsite} style={styles.MarginTop} placeholder="Website" isSecure={false} />
                        <CustomTextfieldBlank value={city} setValue={setCity} style={styles.MarginTop} placeholder="City" isSecure={false} />
                        <CustomTextfieldBlank value={state} setValue={setState} style={styles.MarginTop} placeholder="State" isSecure={false} />
                        <CustomTextfieldBlank value={zipcode} setValue={setzipcode} style={styles.MarginTop} placeholder="Zipcode" isSecure={false} />


                    </View>


                    <TouchableOpacity style={{ width: "70%", backgroundColor: AppTheme.PrimaryColor, marginTop: 20, height: 42, borderRadius: 6, alignItems: "center", justifyContent: "center", alignSelf: "center" }} onPress={() => {


                        if (company == "") {
                            alert("Please enter Company Name")
                        }
                        else if (phone == "") {
                            alert("Please select Phone No")
                        }
                        else {

                            apiAddPro()

                        }
                        //Navigation.push("AppStack",{component:{name:"Dashboard" , options: {  topBar: { backButton:{ visible: false}, visible: true , title : { text : "Dashboard"} } } } })
                    }}>
                        <Text style={{ color: "white" }}>
                            Next
                        </Text>

                    </TouchableOpacity>



                </ScrollView>
            </View>
        </>
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


export default AddClient;
