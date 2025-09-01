import React, { useEffect, useState } from 'react';
import { View, Pressable, Platform, StyleSheet, Text, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';


import { InputField } from '../Components/InputField'
import { Selectset } from '../Components/SelectList';
import { SingleDatepicker } from '../Components/SingleDatepicker';
import CheckBox from '@react-native-community/checkbox';
import { Multiselection } from '../Components/MultiSelectbox';
import { PhoneInput } from '../Components/phoneInput';
import axios from "axios";
import { addClientLog, addProject, APP_URL, GetAllAnnouncement, GetAllAppointments, SetAppointments } from '../Components/Api';
import UserPermissions from '../Components/UserPermissions';
import { CustomTextfield, CustomTextfieldBlank, GoToNextController } from '../Components/General';
import { AppTheme } from '../AppTheme/AppTheme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { request } from 'react-native-permissions';








const AddContact = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    
   
    
    const apiAddClient = async () => {
        const client_id = await AsyncStorage.getItem('client_id');
        console.log("CLient id =========>" ,client_id)
        const formData = {
        customer_id: client_id,
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
          
        };
    
        try {
          const response = await axios.post(APP_URL.BaseUrl + addClientLog,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
            }
          );
    
          if (response.status === 200) {
            console.log('Contact added successfully');
             GoToNextController("Contacts")
          } 
        else {
            console.log('Contact add failed with Contact code: ' + response.status);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
      

   return (
        <>
            <View style={styles.maincontainer} >

                <ScrollView>

                    <View>
                        <Text style={styles.labelText}>Add Client</Text>
                        <CustomTextfieldBlank value={firstName} setValue={setFirstName} style={styles.MarginTop} placeholder="First Name" isSecure={false} />
                        <CustomTextfieldBlank value={lastName} setValue={setLastName} style={styles.MarginTop} placeholder="Last Name" isSecure={false} />
                        <CustomTextfieldBlank value={email} setValue={setEmail} style={styles.MarginTop} placeholder="Email" isSecure={false} />
                        <CustomTextfieldBlank value={password} setValue={setPassword} style={styles.MarginTop} placeholder="Password" isSecure={false} />
                        <CustomTextfieldBlank value={confirmPassword} setValue={setconfirmPassword} style={styles.MarginTop} placeholder="Confirm Password" isSecure={false} />


                    </View>


                    <TouchableOpacity style={{ width: "70%", backgroundColor: AppTheme.PrimaryColor, marginTop: 20, height: 42, borderRadius: 6, alignItems: "center", justifyContent: "center", alignSelf: "center" }} onPress={() => {


                        if (email == "") {
                            alert("Please enter Email")
                        }
                        else if (password == "") {
                            alert("Please Enter Password")
                        }
                        else if (confirmPassword == "") {
                            alert("Please Enter Confirm Password")
                        }
                        else if (password !== confirmPassword) {
                            alert("Please Enter Same Password")
                        }
                        else {

                            apiAddClient()

                        }
                    }}>
                        <Text style={{ color: "white" }}>
                            Add Contact
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


export default AddContact;
