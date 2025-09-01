import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { AppTheme } from "../AppTheme/AppTheme";
import { APP_URL, DeleteInvoices, GetAllInvoices } from "../Components/Api";
import { apiDeletePost } from "../Components/ApiDelete";
import { Navigation } from "react-native-navigation";

import Loader from "../Components/Loader";


const Invoice = () => {

    const [dataAllStaffs, setDataAllStaffs] = useState([]);
    const [sortedDataAllStaff, setSortedDataAllStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiPost()
    }, [])
    const onSearch = (text) => {
        if (text.length > 0) {
            let sorted = dataAllStaffs.filter(function (item) {
                console.log(item.prefix)
                let theItem = item.prefix + item.number
                console.log(theItem.toLowerCase().includes(text.toLowerCase()))
                return theItem.toLowerCase().includes(text.toLowerCase());
            })
            setSortedDataAllStaff(sorted);
            return;
        }


        setSortedDataAllStaff(dataAllStaffs);
    }


    const apiPost = async (s) => {
        // console.log(`check func =`, MyTasks)
        console.log("RAN API POST")
        setLoading(true)
        axios.get(APP_URL.BaseUrl + GetAllInvoices)
            .then(data => {
                // console.log(`Invoice DATA = ${JSON.stringify(data.data, null, 2)}`)
                // setApiData([])
                // setDataAllTasks(data.data);
                setDataAllStaffs(data?.data || []);
                setSortedDataAllStaff(data?.data || []);

                setLoading(false)

            })
            .catch(e => {
                console.log(`Error =`, e)
                setLoading(false)
            })
    }

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 22, marginLeft: 16, marginTop: 20 }}>Invoice</Text>
            <View style={{ alignItems: "center", flexDirection: "row", width: "90%", height: 40, borderRadius: 5, borderColor: "lightgray", borderWidth: 1, marginTop: 20 }} >
                <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={require("../Assets/ic_search.png")} />
                {/* <TextInput value={"searchText"} onChangeText={(t) => { setSearchText(t) }} style={{ flex: 1, marginLeft: 10 }} placeholder={"Search"} /> */}
                <TextInput
                    style={{ flex: 1, marginLeft: 10 }}
                    placeholder={"Search"}
                    onChangeText={onSearch}
                />




                <Image style={{ width: 50, height: 25, marginRight: 10, alignItems: "flex-end" }} source={require("../Assets/filter.png")} />
            </View>
            <FlatList
                style={{ alignSelf: "flex-start", marginTop: 20, width: "100%" }}
                renderItem={({ item, index }) => (
                    <StaffView
                        item={item}
                        index={index}
                        onPress={async (id) => {
                            apiDeletePost({
                                id: id,
                                uri: APP_URL.BaseUrl + DeleteInvoices,
                                setLoading
                            })
                                .then(res => {
                                    console.log("DELETED = ", res);
                                    apiPost();
                                })
                        }}
                    />
                )}
                data={sortedDataAllStaff}
            />
            <Loader loading={loading} />
        </View>
    )
}

// const apiDeletePost = async (id, setLoading) => {
//     // console.log(`delte data func =`, DeleteInvoices + "/" + id)
//     setLoading(true)
//     return new Promise(async (resolve, reject) => {
//         axios.delete(DeleteInvoices + "/" + id)
//             .then(data => {
//                 console.log(`DeleteInvoices DATA = ${JSON.stringify(data.data, null, 2)}`)
//                 alert(data.data.message)
//                 resolve(true);
//                 setLoading(false)
//                 // setDataAllStaffs(data?.data || []);
//                 // setSortedDataAllStaff(data?.data || [])
//             })
//             .catch(e => {
//                 console.log(`Error =`, e);
//                 resolve(false);
//                 setLoading(false)
//             })
//     })

// }

const StaffView = ({ item, index, onPress }) => {


    const handleDelettePressed = () => {


        // apiDeletePost(item.id)
        onPress(item.id);

    }
    return (
        <View style={{ height: 80, flexDirection: "row", flex: 1, borderBottomColor: AppTheme.BorderColor, borderBottomWidth: 1, alignItems: "center" }}>


            <Image style={{ width: 40, height: 40, marginLeft: 16 }} resizeMode="stretch" source={require("../Assets/ic_circle.png")} />
            <View style={{ marginLeft: 15 }}>

                <Text style={{ fontSize: 15, marginTop: 3 }}>{item.prefix + item.number}</Text>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity 
                        activeOpacity={.7}
                        onPress={() => {
                            Navigation.push("AppStack", {
                                component: {
                                    name: 'ViewInvoice',
                                    passProps: {
                                        invoiceDetail: item,
                                    },
                                },
                            });
                        }}>
                        <Text style={{ color: "blue" }}>View |</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity={.7}
                        onPress={handleDelettePressed}>
                        <Text style={{ color: "red" }}>Delete</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ alignItems: "flex-end", flex: 1, marginRight: 20 }}>
                <Text style={{ fontSize: 15, marginLeft: 5, marginTop: 3 }}>{"$" + item.total}</Text>

                <Text style={{ fontSize: 15, marginLeft: 5, marginTop: 3 }}>{"Paid"}</Text>
                {/* <View style={{  flexDirection: "row", marginLeft: 5 }}>
                    <Text style={{color: "blue"}}>View | </Text>
                    <Text style={{color: "red"}}>Delete</Text>
                 </View> */}
            </View>
        </View>
    )
}

export default Invoice