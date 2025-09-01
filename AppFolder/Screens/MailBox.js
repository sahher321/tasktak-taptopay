import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { APP_URL, getAllMails } from "../Components/Api";
import Loader from "../Components/Loader";
import { Navigation } from "react-native-navigation";
import UserPermissions from "../Components/UserPermissions";

const MailBox = () => {
    const [searchText, setSearchText] = React.useState("");
    const [loading, setLoading] = useState(true);
    const [dataAllEmails, setdataAllEmails] = useState([]);
    const [sorteddataAllEmails, setSorteddataAllEmails] = useState([]);

    useEffect(() => {
        setLoading(false)
        apiPost()
    }, []);
    const apiPost = async (s) => {
        setLoading(true)
        axios.get(APP_URL.BaseUrl + getAllMails + UserPermissions.user_data[0]?.staffid, { "": "" })
        .then(data => {
            setLoading(false)
            setdataAllEmails(data.data.data);
            setSorteddataAllEmails(data.data);
        }).catch(e => {
            console.log(`Error =`, e)
            setLoading(false)
        })
    };

    return (
        <View style={{ flex: 1, marginTop: '5%', alignItems: "center" }}>
            <View style={{flexDirection:"row"}}>
                <View style={{flex:1}}>
                    <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 20 }}>MailBox</Text>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => {
                            Navigation.push("AppStack", {
                                component: {
                                    name: 'SendMail',
                                },
                            });
                        }}>
                        <Text style={{ alignSelf: "flex-end", marginRight: 20, fontSize: 20 }}>
                            Send Mail
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ alignItems: "center", flexDirection: "row", width: "90%", height: 40, borderRadius: 5, borderColor: "lightgray", borderWidth: 1, marginTop: 20 }} >
                <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={require("../Assets/ic_search.png")} />
                <TextInput value={searchText} onChangeText={(t) => { setSearchText(t) }} style={{ flex: 1, marginLeft: 10 }} placeholder={"Search"} />
                <Image style={{ width: 50, height: 25, marginRight: 10, alignItems: "flex-end" }} source={require("../Assets/filter.png")} />
            </View>

            <FlatList
                data={dataAllEmails}
                style={{width:"100%"}}
                renderItem={({item, index}) => (
                    <>
                        {<InboxView item={item} index={index} />}
                    </>
                )} 
            />
            <Loader loading={loading} />
        </View>)
}

const InboxView = ({item, index}) => {
    return (
        <View key={index} style={{alignItems:"center",alignSelf:"center",flexDirection:"row",width:"90%",borderRadius:5,borderColor:"lightgray",borderBottomWidth:1,marginTop:20}} >
            <TouchableOpacity
                activeOpacity={.7}
                style={{flexDirection:"row",width:"100%",marginTop:0}}
                onPress={() => {
                    Navigation.push("AppStack", {
                        component: {
                            name: 'ViewMail',
                            passProps: {
                                mailDetail: item,
                            },
                        },
                    });
                }}>
                <Image
                    resizeMode="contain"
                    style={{width:40,height:40,marginLeft:10}}
                    source={require("../Assets/ic_avarter.png")}
                />
                <View style={{flex:1,alignItems:"flex-start",alignSelf:"center"}} >
                    <Text style={{marginLeft:10,color:"#9A9A9A"}}>{"From: " + item.from_email}</Text>
                    <Text style={{marginLeft:10,color:"#9A9A9A"}}>{"To: " + item.to_email}</Text>
                    <Text style={{marginLeft:10,color:"black",marginBottom:20,marginTop:20}}>{"Subject: " + item.subject}</Text>
                </View>

                <View style={{paddingHorizontal:10,paddingVertical:5,borderRadius:4,backgroundColor:"white",marginRight:10}}>
                    <Image
                        resizeMode="contain"
                        source={require("../Assets/ic_star.png")}
                        style={{width:20,height:20,marginLeft:10,alignSelf:"center",justifyContent:"center"}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
};

export default MailBox