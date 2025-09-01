import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Image, SafeAreaView } from "react-native";
import { AppTheme } from "../AppTheme/AppTheme";
import { APP_URL, GetAllNotifications } from "../Components/Api";
import UserPermissions from "../Components/UserPermissions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';



const Notification = () => {

    const [dataAllStaffs, setDataAllStaffs] = useState([]);
   
    useEffect(() => {
        apiPost()
    }, [])

    const [Staff_identity, setStaff_identity] = useState([]);
    async function getValueFromAsyncStorage() {
        try {
        const staffId = await AsyncStorage.getItem('staffid');
          if (staffId !== null) {
            setStaff_identity(staffId);
            console.log("Staff id for Notification:",Staff_identity)
          } else {
            console.log("not found")
          }
        } catch (error) {
          // Handle errors (e.g., storage not accessible)
          console.error('Error retrieving data from AsyncStorage:', error);
          throw error; // You can choose to rethrow or handle the error here
        }
      }
      getValueFromAsyncStorage()

    // const apiPost = async (s) => {

    //   console.log(`check func =`, GetAllNotifications)

    //     let data = {

    //         staff_id: Staff_identity
    //      }

    //     axios.post(APP_URL.BaseUrl + GetAllNotifications, data, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
 
    //         }
    //     })
    //         .then(data => {
    //             console.log(`GetAllNotifications DATA = ${JSON.stringify(data.data, null, 2)}`)
    //             console.log(`GetAllNotifications DATA = ${JSON.stringify(data.data, null, 2)}`)
    //             // setApiData([])
    //             // setDataAllTasks(data.data);
    //             setDataAllStaffs(data?.data.data || []);
    //         })
    //         .catch(e => {
    //             console.log(`Error =`, e)

    //         })


    // }
    const apiPost = async () => {
        try {
          const staffId = await AsyncStorage.getItem('staffid');
          if (staffId !== null) {
            console.log("Staff id for Notification:", staffId);
            const data = {
              staff_id: staffId,
            };
    
            axios
              .post(APP_URL.BaseUrl + GetAllNotifications, data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then((response) => {
                console.log('GetAllNotifications DATA:', response.data);
                setDataAllStaffs(response?.data.data || []);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          } else {
            console.log("Not found");
          }
        } catch (error) {
          console.error('Error retrieving data from AsyncStorage:', error);
        }
      };

 



    return (
        <View style={{ flex: 1 }}>
            <Text style={{fontSize : 22 , marginLeft : 16 , marginTop : 20}}>Notification</Text>

            <FlatList style ={{marginTop : 20}} renderItem={NotificationView} data={dataAllStaffs}></FlatList>

 
        </View>

        
    )
}




const NotificationView = ({item}) => {

    return (
        <View style={{ height: 80, flexDirection: "row", flex: 1,borderBottomColor:AppTheme.BorderColor , borderBottomWidth:1 , alignItems: "center"  }}>
            <Image style={{ width: 40, height: 40, marginLeft: 16 }} resizeMode="stretch" source={require("../Assets/ic_circle.png")} />
            <View style={{ }}>

                <Text style={{ fontSize: 15, marginLeft: 5 , marginTop: 3 }}>{item.description}</Text>
                <Text style={{ fontSize: 15, marginLeft: 5 , marginTop: 3 }}>{moment(item?.date).format("DD-MM-YY")}</Text>

                {/* <View style={{  flexDirection: "row", marginLeft: 5 }}>
                    <Text style={{color: "blue"}}>View | </Text>
                    <Text style={{color: "red"}}>Delete | </Text>
                    <Text style={{color: "#FFD21F"}}>Create Appointment</Text>
                </View> */}
            </View>
        </View>
    )
}

export default Notification
