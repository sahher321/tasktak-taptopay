import axios from "axios";
import React, { useEffect, useState} from "react";
import { View, StyleSheet, Text, FlatList, Image, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import { AppTheme } from "../AppTheme/AppTheme";
import { APP_URL, DeleteCustomer, GetAllContacts, GetAllCustomer, GetAllStaffs } from "../Components/Api";
import { GoToNextController, ShowToast } from "../Components/General";
import Loader from "../Components/Loader";
import UserPermissions from "../Components/UserPermissions";
import { Navigation } from "react-native-navigation";


handleNewCleintPressed = (value, item) => {

    if (value === "add") {
        GoToNextController("AddClient")
    } else if (value === "edit") {
        Navigation.push("AppStack", {
            component: {
                name: 'EditClient',
                passProps: {
                    clientDetail: item,
                },
            },
        });
    }

}


const Contacts = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [dataAllStaffs, setDataAllStaffs] = useState([]);
    const [sortedDataAllStaff, setSortedDataAllStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const permissions = UserPermissions?.capabilities["Customer"]?.permissions || []
    const isDeletable = permissions.indexOf("delete") != -1
    const isEditable = permissions.indexOf("edit") != -1
    const isCreatable = permissions.indexOf("create") != -1

    useEffect(() => {

        
        apiPost();
    }, [])

    const ContactsView = ({ item }) => {


        console.log ("id is idd" , item)
        const userid = item.userid;
        const handleDelettePressed = () => {
           
            console.log(userid)
            apiDeletePost(userid)
          
         }

        return (
            <View style={{ flexDirection: "row", flex: 1, borderBottomColor: AppTheme.BorderColor, borderBottomWidth: 1, alignItems: "center" }}>
                <Image style={{ width: 40, height: 40, marginLeft: 16 }} resizeMode="stretch" source={require("../Assets/ic_circle.png")} />
                <View style={{}}>

                    <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 3, textTransform: "capitalize" }}>{"Company : " + item.company}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 3 }}>{"Phone : " + item.phonenumber ?? "N/A"}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 3 }}>{"Address: " + item.address ?? "N/A"}</Text>

                    {/* {isDeletable ?
                        <TouchableOpacity style={{ marginLeft: 10, flex: 1 }} onPress={handleDelettePressed}>
                            <Text style={{ fontSize: 15, color: "red", marginBottom: 10 }}>Delete </Text>
                        </TouchableOpacity> : null} */}
                    <View style={{  flexDirection: "row", marginLeft: 5 }}>
                        <TouchableOpacity
                            activeOpacity={.7}
                            onPress={() => {
                                Navigation.push("AppStack", {
                                    component: {
                                        name: 'ViewClient',
                                        passProps: {
                                            clientDetail: item,
                                        },
                                    },
                                });
                            }}
                            style={{justifyContent:"center"}}>
                            <Text style={{color: "blue"}}>View | </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.7}
                            onPress={() => handleNewCleintPressed("edit", item)}
                            // onPress={() => alert("EDIT PRESS")}
                            style={{justifyContent:"center"}}>
                            <Text style={{color: "green"}}>Edit | </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.7}
                            onPress={handleDelettePressed} 
                            style={{justifyContent:"center"}}>
                            <Text style={{color: "red"}}>Delete </Text>
                        </TouchableOpacity>
                        {/* <Text style={{color: "#FFD21F"}}>Create Appointment</Text> */}
                    </View>
                </View>
             
            </View>
        )
    }


    const apiPost = async (s) => {

        // console.log(`Clients DATA URL =`, APP_URL.BaseUrl + GetAllCustomer)
        setLoading(true)

        axios.get(APP_URL.BaseUrl + GetAllCustomer)
            .then(data => {
                // console.log(`Clients DATA = ${JSON.stringify(data.data, null, 2)}`)
                setLoading(false)

                setDataAllStaffs(data?.data || []);
                setSortedDataAllStaff(data?.data || [])
            })
            .catch(e => {
                // console.log(`Error =`, e);
                setLoading(false)

            })
    }




    const onSearch = (text) => {
        if (text.length > 0) {
            let sorted = dataAllStaffs.filter(function (item) {
                console.log(item.company)
                console.log(item.company.toLowerCase().includes(text.toLowerCase()))
                return item.company.toLowerCase().includes(text.toLowerCase());
            })
            setSortedDataAllStaff(sorted);
            return;
        }

        setSortedDataAllStaff(dataAllStaffs);
    }


    return (
        <View style={{ flex: 1, marginTop: '5%' }}>
            <View style={{ flexDirection: "row", width: "90%" }}>

                <Text style={{ marginLeft: 20, fontSize: 20 }}>Clients</Text>
                {/* {isCreatable ? */}
                    <TouchableOpacity style={{ alignItems: "flex-end", flex: 1, marginRight: -20 }} onPress={()=> handleNewCleintPressed("add", "")}>
                        <Text style={{ fontSize: 20, color: AppTheme.PrimaryColor }}>Add Client</Text>
                    </TouchableOpacity>
                {/* : null} */}
            </View>
            <View style={{ alignItems: "center", flexDirection: "row", height: 40, borderRadius: 5, borderColor: "lightgray", borderWidth: 1, marginTop: 20, marginLeft: 15, marginRight: 15 }} >
                <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={require("../Assets/ic_search.png")} />

                <TextInput
                    style={{ flex: 1, marginLeft: 10 }}
                    placeholder={"Search"}
                    onChangeText={onSearch}
                />


                {/* <Image style={{ width: 50, height: 25, marginRight: 10, alignItems: "flex-end" }} source={require("../Assets/filter.png")} /> */}
            </View>



            <FlatList
                style={{ marginTop: 20 }}
                renderItem={ContactsView}
                data={sortedDataAllStaff}
            />

            <Loader loading={loading} />

        </View>


    )
}


const apiDeletePost = async (id) => {

    console.log(`delte data func =`, APP_URL.BaseUrl + DeleteCustomer + id)

    axios.delete(APP_URL.BaseUrl + DeleteCustomer + id)
        .then(data => {
            console.log(`Staff DATA = ${JSON.stringify(data.data, null, 2)}`)
            //  console.log(`delte data func =`, DeleteCustomer + item.id)



            alert(data.data.message)

            // setDataAllStaffs(data?.data || []);
            // setSortedDataAllStaff(data?.data || [])
        })
        .catch(e => {
            console.log(`Error =`, e);

        })


}




export default Contacts