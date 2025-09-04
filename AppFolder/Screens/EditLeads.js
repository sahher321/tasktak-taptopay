import React, { useEffect, useState } from 'react';
import { View, Pressable, Platform, StyleSheet, Text, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';


import { InputField } from '../Components/InputField'
import { Selectset } from '../Components/SelectList';
import { SingleDatepicker } from '../Components/SingleDatepicker';
import CheckBox from '@react-native-community/checkbox';
import { Multiselection } from '../Components/MultiSelectbox';
import { PhoneInput } from '../Components/phoneInput';
import axios from "axios";
import { UpdateLead, addProject, APP_URL, GetAllAnnouncement, GetAllAppointments, SetAppointments } from '../Components/Api';
import UserPermissions from '../Components/UserPermissions';
import { CustomTextfield, CustomTextfieldBlank, GoToNextController } from '../Components/General';
import { AppTheme } from '../AppTheme/AppTheme';
import moment from 'moment';

const dummy = [
    {

        "name": "Alignable"
    },
    {
        "name": "Alignable Form"
    },
    {
        "name": "Brief Overview Slide Presentation"
    },
    {
        "name": "Demonstration"
    },
    {
        "name": "email"
    },
    {
        "name": "Facebook"
    },
    {
        "name": "Google"
    }
    ,
    {
        "name": "Social Media Form"
    }
]
const statusD = [
    {

        "name": "New"
    },
    {
        "name": "Not Interested"
    },
    {
        "name": "Contacted"
    }
    ,
    {
        "name": "High possibility"
    }
    ,
    {
        "name": "Emailed 2nd Time"
    },
    {
        "name": "Emailed 3rd Time"
    },
    {
        "name": "Customer Converted Leads"
    },
    {
        "name": "Info Incomplete"
    },
    {
        "name": "Potential Referral Partner"
    },
    {
        "name": "Demonstration"
    },
    {
        "name": "Free Account"
    },
    {
        "name": "Not Ready"
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




const EditNewLead = (props) => {
    const {leadDetail} = props;
    const [mainData, setMainData] = useState([]);
    const [contactata, setcontactData] = useState([]);
    const [statusData, setstatusData] = useState([]);
    const [projectStatusData, setprojectStatusData] = useState([]);
    const [sourceData, setsourceData] = useState([]);
    // const [startDate, setstartDate] = useState("")
    const [appointmentTypetata, setappointmentType] = useState([]);
    const [staffmembersdata, setstaffmembers] = useState([]);
    const [related, setRelated] = useState([])
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [clients, setClients] = useState([])
    const [name, setName] = useState(leadDetail?.name)
    const [status, setStatus] = useState("")
    const [Description, setDescription] = useState("")
    const [textarea, setTextarea] = useState("")
    const [email, setEmail] = useState(leadDetail?.email)
    const [website, setWebsite] = useState(leadDetail?.website)
    const [source, setsource] = useState("")
    const [phone, setPhone] = useState(leadDetail?.phonenumber)
    const [contact, setContact] = useState(leadDetail?.assigned)
    const [position, setPosition] = useState(leadDetail?.position)
    const [leadValue, setLeadValue] = useState("")
    const [company, setCompany] = useState(leadDetail?.company)
    const [address, setaddress] = useState(leadDetail?.address)
    const [city, setcity] = useState(leadDetail?.city)
    const [state, setstate] = useState(leadDetail?.state)
    const [country, setcountry] = useState(leadDetail?.country)
    const [zipcode, setzipcode] = useState(leadDetail?.zipcode)
    const [selectedTeams, setSelectedTeams] = useState([])

    console.log("leadDetail =====> ", leadDetail.id);

    useEffect(() => {
        getLeadDetail();

        //for Billing data
        let mapped = dummy.map((item, index) => {
            let obj = {
                id: 1,
                value: item.name
            }
            return obj
        })
        setsourceData(
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
    // const apiUpdatePro = async (s) => {
        
    
    //     const resourceId = leadDetail.id; 
    //     const params = JSON.stringify({});
    
    //     let data = {
    //         name: name,
    //         source: source,
    //         status: status,
    //         assigned: contact,
    //         email: email,
    //         website: website,
    //         phonenumber: phone,
    //         company: company,
    //         state: state,
    //         country: country,
    //         address: address,
    //         description: Description,
    //         zipcode: zipcode,
    //         position: position,
    //         city: city
    //     };
    
    //     const formData = new FormData();
    //     for (var key of Object.keys(data)) {
    //         formData.append(key, data[key]);
    //     }
    
    //     let mappedItems = selectedTeams.map((item, index) => {
    //         return item.id;
    //     });
    
    //     try {
    //         const response = await axios.put(
    //             APP_URL.BaseUrl + `/api/leads/${resourceId}`,
    //             formData
    //         );
    
    //         console.log("DATA");
    //         console.log(JSON.stringify(response.data, null, 2));
    
    //         if (response.data.status == 400) {
    //             alert(response.data.message);
    //         } else if (response.data.status == true) {
    //             Alert.alert(response.data.message, '', [
    //                 {
    //                     text: 'OK',
    //                     onPress: async () => {
    //                         GoToNextController("Lead");
    //                     }
    //                 },
    //             ]);
    //         }
    //     } catch (error) {
    //         console.log(`Error =`, JSON.stringify(error));
    //     }
    // };
    

    const getLeadDetail = () => {
        try {
            console.log("RUN")
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };


            fetch(APP_URL.BaseUrl + "/api/leads/"+leadDetail.id, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("result=====> ", result);
            }).catch(error => {
                console.log("LEADS DETAIL ERROR ======> ", error?.message);
            });
        } catch (error) {
            console.log("LEADS DETAIL ERROR ======> ", error?.message);
        }
    };



    const apiPost = async (s) => {
        // setLoading(true)


        console.log(`url is =`, SetAppointments)

        axios.get( APP_URL.BaseUrl +  SetAppointments)
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


                let _contactdata = data.data.data.contacts


                let contactsLeads = _contactdata.map((item) => {
                    let obj = {
                        key: item.client_id,
                        value: item.firstname + " " + item.lastname
                    }


                    return obj
                })
                setcontactData([...contactsLeads]);


                let appointment_typesdata = data.data.data.appointment_types


                let appointment_typesLeads = appointment_typesdata.map((item) => {
                    let obj = {
                        id: 1,
                        value: item.type


                    }
                    return obj
                })
                setappointmentType([...appointment_typesLeads]);

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

                }, 500)

            })
            .catch(e => {
                console.log(`Error =`, e)

                // setLoading(false)

            })
    }



    const updateLeadHandle = async () => {
        var raw = JSON.stringify({
            name: name,
                    source: source,
                     status: status,
                    assigned: contact,
                    email: email,
                    website: website,
                    phonenumber: phone,
                    company: company,
                    state: state,
                    country: country,
                    address: address,
                    description: Description,
                    zipcode: zipcode,
                    position: position,
                    city: city

        });

        var requestOptions = {
            method: 'PUT',
            body: raw,
            redirect: 'follow'
        };
      const url =   APP_URL.BaseUrl+UpdateLead+leadDetail?.id
      console.log('url :',url)
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            // setButtonLoader(false);
            console.log("result =====> ", result);
            if (result.status == 400) {
                alert(result?.message)
            } else if (result?.status == true) {
                Alert.alert(result?.message, '', [
                    {
                        text: 'OK', onPress: async () => {
                            // GoToNextController("Contacts")
                        }
                    },
                ]);
            } else if (result?.status == false) {
                alert(result?.message);
            } 
        }).catch(error => {
            // setButtonLoader(false);
            console.log(`Error =`, error.message);
        });
    };


    return (
        <>
            <View style={styles.maincontainer} >

                <ScrollView>

                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Edit Lead
                    </Text>

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>
                            Status
                        </Text>

                        <Selectset arraydata={projectStatusData} value={status} save={"value"}
                            setSelected={(e) => {
                                console.log("Cleint Data", e)
                                setContact(e)
                            }}

                        />

                    </View>

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>
                            Source                        </Text>
                        <Selectset arraydata={sourceData} title='name' value={source} save={"value"}
                            setSelected={(e) => {
                                console.log("setbillingType", e)
                                setsource(e)

                            }} />
                    </View>

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>
                            Assigned
                        </Text>
                        <Selectset arraydata={contactata} title='name' value={contact} save={"value"}
                            setSelected={(e) => {
                                console.log("asdadsads", e)
                                setStatus(e)
                            }} />
                    </View>

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Name</Text>
                        <CustomTextfieldBlank value={name} setValue={setName} style={{ marginTop: 10 }} placeholder="Name" isSecure={false} />
                    </View>

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Position</Text>
                        <CustomTextfieldBlank value={position} setValue={setPosition} style={{ marginTop: 10 }} placeholder="Position" isSecure={false} />
                    </View>

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Email Address</Text>
                        <CustomTextfieldBlank value={email} setValue={setEmail} style={{ marginTop: 10 }} placeholder="Email Address" isSecure={false} />
                    </View>
                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Website</Text>
                        <CustomTextfieldBlank value={website} setValue={setWebsite} style={{ marginTop: 10 }} placeholder="Website" isSecure={false} />
                    </View>
                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Phone</Text>
                        <CustomTextfieldBlank value={phone} setValue={setPhone} style={{ marginTop: 10 }} placeholder="Phone" isSecure={false} />
                    </View>

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Lead value</Text>
                        <CustomTextfieldBlank value={leadValue} setValue={setLeadValue} style={{ marginTop: 10 }} placeholder="Lead value" isSecure={false} />
                    </View>

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Company</Text>
                        <CustomTextfieldBlank value={company} setValue={setCompany} style={{ marginTop: 10 }} placeholder="Company" isSecure={false} />
                    </View>




                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Description</Text>
                    </View>

                    <View style={styles.textAreaContainer} >

                        <TextInput onChangeText={setDescription} value={Description}
                            style={styles.textAreaC}
                            underlineColorAndroid="transparent"
                            placeholder="Type something"
                            placeholderTextColor="grey"
                            numberOfLines={8}
                            multiline={true}
                        />
                    </View>

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Address</Text>
                        <CustomTextfieldBlank value={address} setValue={setaddress} style={{ marginTop: 10 }} placeholder="Address" isSecure={false} />
                    </View>


                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>City</Text>
                        <CustomTextfieldBlank value={city} setValue={setcity} style={{ marginTop: 10 }} placeholder="City" isSecure={false} />
                    </View>


                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>State</Text>
                        <CustomTextfieldBlank value={state} setValue={setstate} style={{ marginTop: 10 }} placeholder="State" isSecure={false} />
                    </View>


                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Country</Text>
                        <CustomTextfieldBlank value={country} setValue={setcountry} style={{ marginTop: 10 }} placeholder="Country" isSecure={false} />
                    </View>

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Zip Code</Text>
                        <CustomTextfieldBlank value={zipcode} setValue={setzipcode} style={{ marginTop: 10 }} placeholder="Zip Code" isSecure={false} />
                    </View>


                    <TouchableOpacity style={{ width: "70%", backgroundColor: AppTheme.PrimaryColor, marginTop: 20, height: 42, borderRadius: 6, alignItems: "center", justifyContent: "center", alignSelf: "center" }} onPress={() => {


                        if (source == "1") {
                            alert("Please select source")
                        }
                        else if (contact == "1") {
                            alert("Please select Client")
                        }
                        else if (name == "") {
                            alert("Please Add Name")
                        }

                        // else if (status == "1") {
                        //     alert("Please select status")
                        // }

                        else {
                            updateLeadHandle()

                        }
                        //Navigation.push("AppStack",{component:{name:"Dashboard" , options: {  topBar: { backButton:{ visible: false}, visible: true , title : { text : "Dashboard"} } } } })
                    }}>
                        <Text style={{ color: "white" }}>
                            Update Lead
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
        fontSize: 16,
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


export default EditNewLead;
