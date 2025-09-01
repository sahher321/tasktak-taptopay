import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { AppTheme } from "../AppTheme/AppTheme";
import { APP_URL, DeleteTickets, GetAllTickets } from "../Components/Api";
import { Navigation } from "react-native-navigation";


const Tickets = () => {

    const [dataAllTickets, setDataAllTickets] = useState([]);

    useEffect(() => {
        apiPost()
    }, [])


    const apiPost = async (s) => {

        // console.log(`check func =`, MyTasks)

        axios.get(APP_URL.BaseUrl + GetAllTickets)
            .then(data => {
                console.log(`Tickets DATA = ${JSON.stringify(data.data, null, 2)}`)
                // setApiData([])
                // setDataAllTasks(data.data);
                setDataAllTickets(data?.data || []);
            })
            .catch(e => {
                console.log(`Error =`, e)

            })


    }





    return (
        <View style={{ flex: 1, alignItems: "center", height: 300 }}>
            <Text style={{ fontSize: 22, marginLeft: 16, marginTop: 20, alignSelf: "flex-start" }}>Tickets</Text>
            <View style={{ alignItems: "center", flexDirection: "row", width: "90%", height: 40, borderRadius: 5, borderColor: "lightgray", borderWidth: 1, marginTop: 20 }} >
                <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={require("../Assets/ic_search.png")} />
                <TextInput style={{ flex: 1, marginLeft: 10 }} placeholder={"Search"} />
                <Image style={{ width: 50, height: 25, marginRight: 10, alignItems: "flex-end" }} source={require("../Assets/filter.png")} />
            </View>
            <FlatList style={{ marginTop: 20 }} renderItem={({ item, index }) => (<StaffView item={item} apiPost={apiPost} />)} data={dataAllTickets}></FlatList>


        </View>


    )
}




const StaffView = ({ item }) => {
    console.log("item.name ====> ", item.name);

    return (
        <View style={{ flexDirection: "row", flex: 1, borderBottomColor: AppTheme.BorderColor, borderBottomWidth: 1, alignItems: "center" }}>


            {/* <Image style={{ width: 40, height: 40, marginLeft: 16 }} resizeMode="stretch" source={require("../Assets/ic_circle.png")} /> */}
            <View style={{ marginLeft: 20 }}>

                <Text style={{ fontSize: 15, marginLeft: 5, marginTop: 3, marginRight: 20 }}>{"Depatment: " + item.name}</Text>
                <Text style={{ fontSize: 15, marginLeft: 5, marginTop: 3, marginRight: 20 }}>{"Subject: " + item.subject}</Text>
                <Text style={{ fontSize: 15, marginLeft: 5, marginTop: 3, marginRight: 20 }}>{"Message: " + item.message}</Text>

                <View style={{ flexDirection: "row", marginTop: 6, marginBottom: 12 }}>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => {
                            Navigation.push("AppStack", {
                                component: {
                                    name: 'ViewTicket',
                                    passProps: {
                                        ticektID: item?.ticketid,
                                    },
                                },
                            });
                        }}
                        style={{justifyContent:"center"}}>
                        <Text style={{color: "blue"}}>View | </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => alert("EDIT PRESS")}
                        style={{justifyContent:"center"}}>
                        <Text style={{color: "green"}}>Edit | </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center"}}
                        activeOpacity={.7}
                        onPress={async () => {
                            apiDeletePost({
                                id: item.id,
                                uri: APP_URL.BaseUrl +   DeleteTickets,
                                // setLoading
                            }).then(res => {
                                console.log("DELETED = ", res);
                                apiPost();
                            })
                        }}>
                        <Text style={{ color: "red" }}>Delete</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </View>
    )
}

export default Tickets