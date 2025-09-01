import React, { useEffect, useState } from 'react';
import { View, Pressable, Platform, StyleSheet, Text, Image, TextInput, ScrollView, TouchableOpacity, Alert  } from 'react-native';
import axios from "axios";
import { CustomTextfield, CustomTextfieldBlank, GoToNextController } from '../Components/General';
import { AppTheme } from '../AppTheme/AppTheme';
import { APP_URL, DeleteInvoices, DeleteStaffs, PostStaffDetail } from "../Components/Api";
import { Selectset } from '../Components/SelectList';
import CheckBox from '@react-native-community/checkbox';


const AddNewStaff = () => {

    const [FirsrName, setFirsrName] = useState("")
    const [Email, setEmail] = useState("")
    const [Wel_email, setWel_email] = useState("")
    const [phonenumber, setphonenumber] = useState("") 
    const [hourlyrate, sethourlyrate] = useState("") 
    const [Password, setPassword] = useState("") 
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [departmentdata, setDepartment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([])

    const weldata = ["Yes","no"]



    useEffect(() => {
        getDepartments()
    }, [])

    const getDepartments = async () => {
        try {
          const response = await axios.get('https://office-app.tasktak.com/api/staffs/departs');
          if (response.status === 200) {
            // Assuming the response.data is an array of department objects with id and name properties
            const departments = response.data.map((department) => ({
              id: department.departmentid,
              name: department.name,
            }));
    
            // Set the department data in the state variable
            setDepartment(departments);
          } else {
            console.log('Fail to fetch department: ' + response.status);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

// console.log("Deparments=============>",departmentdata)
const handleSelectDepartment = (departmentId) => {
    if (selectedDepartment.includes(departmentId)) {
      // If already selected, create a new array without the selected department
      setSelectedDepartment((prevSelected) =>
        prevSelected.filter((selected) => selected !== departmentId)
      );
    } else {
      // If not selected, add it to the selectedDepartments array
      setSelectedDepartment([...selectedDepartment, departmentId]);
    }

    // Log the selected items (IDs)
    console.log('Selected Department IDs:', selectedDepartment);
  };

    const apiAddStaff = async () => {
        const formData = {
          firstname: FirsrName,
          email: Email,
          send_welcome_email:Wel_email,
          password: Password,
          phonenumber: phonenumber,
          hourly_rate:hourlyrate,
          departments:selectedDepartment,
          
        };
    
        console.log("Form Data ==>",formData)
        try {
          const response = await axios.post(APP_URL.BaseUrl + PostStaffDetail,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
            }
          );
          console.log(response)
          if (response.status === 200) {
            console.log('Staff added successfully');
            GoToNextController("Staff")
          } else {
            console.log('Staff add failed with status code: ' + response.status);
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
                        <Text style={styles.labelText}>First Name</Text>
                        <CustomTextfieldBlank value={FirsrName} setValue={setFirsrName} style={{ marginTop: 10 }} placeholder="First Name" isSecure={false} />
                    </View>
           
                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Hourly Rate</Text>
                        <CustomTextfieldBlank value={hourlyrate} setValue={sethourlyrate} style={{ marginTop: 10 }} placeholder="" isSecure={false} />
                    </View>
                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Phone Number</Text>
                        <CustomTextfieldBlank value={phonenumber} setValue={setphonenumber} style={{ marginTop: 10 }} placeholder="Phone Number" isSecure={false} />
                    </View>
                   

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Email</Text>
                        <CustomTextfieldBlank value={Email} setValue={setEmail} style={{ marginTop: 10 }} placeholder="Email" isSecure={false} />
                    </View>
                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Welcome Email</Text>
                        <Selectset arraydata={weldata} value={Wel_email} save={"key"}
                            setSelected={(e) => {
                                console.log("welcome email", e)
                                setWel_email(e)
                            }}
                        />
                    </View>

                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Password</Text>
                        <CustomTextfieldBlank value={Password} setValue={setPassword} style={{ marginTop: 10 }} placeholder="Password" isSecure={false} />
                    </View>
                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Confirm Password</Text>
                        <CustomTextfieldBlank value={ConfirmPassword} setValue={setConfirmPassword} style={{ marginTop: 10 }} placeholder="Confirm Password" isSecure={false} />
                    </View>
                    <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>Departments</Text>
                        {departmentdata.map((department) => (
        <View key={department.id} style={{ flexDirection: 'row', alignItems: 'center' }}> 
            <CheckBox
            value={selectedDepartment.includes(department.id)}
            onValueChange={() => handleSelectDepartment(department.id)}
          />
          <Text>{department.name}</Text>
        
        </View>
      ))}

                    </View>

                    <TouchableOpacity style={{ width: "70%", backgroundColor: AppTheme.PrimaryColor, marginTop: 20, height: 42, borderRadius: 6, alignItems: "center", justifyContent: "center", alignSelf: "center" }} onPress={() => {

                        if (FirsrName == "") {
                            alert("Please enter Staff Name")
                        }
                        else if (Email == "") {
                            alert("Please Enter Email")
                        }
                        else if (Password == "") {
                            alert("Please Enter Password")
                        }
                       
                        else if (ConfirmPassword == "") {
                            alert("Please Enter Conirm Password")
                        }
                        else if (Password !== ConfirmPassword) {
                            alert("Please Match Your Password")
                        }
                        else {
                            apiAddStaff()
                        }
                    }}>
                        <Text style={{ color: "white" }}>
                            Add Staff
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


export default AddNewStaff;
