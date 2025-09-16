import React, { useEffect, useState } from 'react';
import { View, Pressable, Platform, StyleSheet, Text, Image, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { InputField } from '../Components/InputField'
import { Selectset } from '../Components/SelectList';
import axios from "axios";
import { addClient, eidtStaff, addProject, APP_URL, GetAllAnnouncement, GetAllAppointments, SetAppointments } from '../Components/Api';
import { CustomTextfield, CustomTextfieldBlank, GoToNextController } from '../Components/General';
import { AppTheme } from '../AppTheme/AppTheme';


const EditStaff = (props) => {
    const {StaffDetail} = props;
    const [phonenumber, setphonenumber] = useState(StaffDetail?.phonenumber)
    const [firstName, setfirstName] = useState(StaffDetail?.firstname)
    const [hourlyrate, sethourlyrate] = useState(StaffDetail?.hourly_rate)
    const [email, setemail] = useState(StaffDetail?.email)
    const [buttonLoader, setButtonLoader] = useState(false);
   
    console.log("StaffDetail =====> ", StaffDetail.staffid);

    const updateStaffHandle = async () => {
        setButtonLoader(true);
        var raw = JSON.stringify({
            firstname: firstName,
            email: email,
            phonenumber: phonenumber,
            hourly_rate:hourlyrate,
       

        });

        var requestOptions = {
            method: 'PUT',
            body: raw,
            redirect: 'follow'
        };

        fetch(APP_URL.BaseUrl+eidtStaff+StaffDetail?.staffid, requestOptions)
        .then(response => response.json())
        .then(result => {
            setButtonLoader(false);
            console.log("result =====> ", result);
            if (result.status == 400) {
                alert(result?.message)
            } else if (result?.status == true) {
                GoToNextController("Staff")
                ;
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
                    <Text style={styles.labelText}>Edit Staff</Text>
                    <CustomTextfieldBlank value={firstName} setValue={setfirstName} style={styles.MarginTop} placeholder="First Name" isSecure={false} />
                    <CustomTextfieldBlank value={hourlyrate} setValue={sethourlyrate} style={styles.MarginTop} placeholder="Hourly Rate" isSecure={false} />
                    <CustomTextfieldBlank value={email} setValue={setemail} style={styles.MarginTop} placeholder="Email" isSecure={false} />
                    <CustomTextfieldBlank value={phonenumber} setValue={setphonenumber} style={styles.MarginTop} placeholder="Phone Number" isSecure={false} />
                </View>
                <TouchableOpacity style={{ width: "70%", backgroundColor: AppTheme.PrimaryColor, marginTop: 20, height: 42, borderRadius: 6, alignItems: "center", justifyContent: "center", alignSelf: "center" }} 
                   
                   onPress={() => {
                  
                        updateStaffHandle();
                  
                }}
                   >
                    {buttonLoader ? 
                        <ActivityIndicator 
                            size={"small"}
                            color={"#FFF"}
                        />
                    :
                    
                        <Text style={{ color: "white" }}>
                            Update Staff
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


export default EditStaff;
