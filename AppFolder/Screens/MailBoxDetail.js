import axios from "axios";
import React, { useState , useEffect } from "react";
import { View, Text, TextInput, Image, FlatList } from "react-native";
import { AppTheme } from "../AppTheme/AppTheme";
import { APP_URL, getAllMails } from "../Components/Api";
import Loader from "../Components/Loader";
import UserPermissions from "../Components/UserPermissions";


const MailBoxDetail = (props) => {
    const [searchText, setSearchText] = React.useState("");

    const [loading, setLoading] = useState(true);


    const [dataAllEmails, setdataAllEmails] = useState([]);
    const [sorteddataAllEmails, setSorteddataAllEmails] = useState([]);

    useEffect(() => {

        setLoading(false)

        apiPost()
    }, [])


    const apiPost = async (s) => {
        setLoading(true)

        console.log(`url is =`, APP_URL.BaseUrl + getAllMails + UserPermissions.user_data[0]?.staffid)

        axios.get(APP_URL.BaseUrl + getAllMails + UserPermissions.user_data[0]?.staffid  , { "": "" })
            .then(data => {
                setLoading(false)

                console.log(`getAllMails DATA = ${JSON.stringify(data.data, null, 2)}`)
                // setApiData([])
                setdataAllEmails(data.data.data);

                setSorteddataAllEmails(data.data);

            })
            .catch(e => {
                console.log(`Error =`, e)

                setLoading(false)

            })
    }


    return (
        <View style={{ flex: 1, marginTop: '10%', alignItems: "center" }}>

            <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 20 }}>MailBox</Text>

            <View style={{ alignItems: "center", flexDirection: "row", width: "90%", height: 40, borderRadius: 5, borderColor: "lightgray", borderWidth: 1, marginTop: 20 }} >
                <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={require("../Assets/ic_search.png")} />
                <TextInput value={searchText} onChangeText={(t) => { setSearchText(t) }} style={{ flex: 1, marginLeft: 10 }} placeholder={"Search"} />
                <Image style={{ width: 50, height: 25, marginRight: 10, alignItems: "flex-end" }} source={require("../Assets/filter.png")} />
            </View>

            <FlatList style={{ width: "100%" }}
                renderItem={({ item, index }) => (
                    <>
                        {
                            index > 2 ?
                                <InboxView item={item} index={index} />
                                :
                                <UpperView item={item} index={index} />


                        }
                    </>

                )}
                data={ dataAllEmails

                    // { title: "Customer", image: require("../Assets/ic_social.png") },
                    // { title: "Customer", image: require("../Assets/ic_promotion.png") },
                    // { title: "Customer", image: require("../Assets/ic_info.png") },

                    // { title: "Andy Brown", desc: "Bring Your Parents to Work Day! Hey! What do you think about a...", image: require("../Assets/ic_avarter.png") },
                    // { title: "Keri Anderson", desc: "Board game night? Sunday works! If you can get Dex...", image: require("../Assets/ic_avarter.png") },
                    // { title: "Regis, Peter, Rachel", desc: "About to go on a trip and was h…", image: require("../Assets/ic_avarter.png") },
                    // { title: "Aruna Knight", desc: "Check out the new friend we made, Me…", image: require("../Assets/ic_avarter.png") },
                    // { title: "Keri Anderson", desc: "Check out the new friend we made, Me…", image: require("../Assets/ic_avarter.png") },


                 } />

            {/* <FlatList style={{ width: "100%" }}
                renderItem={InboxView}
                data={[

                    { title: "Customer", image: require("../Assets/avarter.png") },
                    { title: "Customer", image: require("../Assets/avarter.png") },
                    { title: "Customer", image: require("../Assets/avarter.png") },

                ]} /> */}

<Loader loading={loading} />
        
        </View>)
}

const UpperView = ({ item, index }) => {

    return (
        <View style={{ alignItems: "center", alignSelf: "center", flexDirection: "row", width: "90%", height: 50, borderRadius: 5, borderColor: "lightgray", borderBottomWidth: 1, marginTop: 20 }} >
            <Image style={{ width: 20, height: 20, marginLeft: 10 }} resizeMode="contain" source={item.image} />
            <View style={{ flex: 1, alignItems: "flex-start", alignSelf: "center" }} >

                <Text style={{ marginLeft: 10, color: "black" }}>Social</Text>
                <Text style={{ marginLeft: 10, color: "#9A9A9A" }}>Zagat, Google Offers</Text>
            </View>

            <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4, backgroundColor: "#19A765", alignSelf: "flex-end", alignSelf: "center", marginRight: 10 }}>
                <Text style={{ fontSize: 14, fontStyle: "normal", color: "white", alignSelf: "center", justifyContent: "center" }}>1 new</Text>
            </View>


            {/* <TextInput value={searchText} onChangeText={(t) => { setSearchText(t) }} style={{ flex: 1, marginLeft: 10 }} placeholder={"Search"} /> */}
            {/* <Image style={{ width: 50, height: 25, marginRight: 10, alignItems: "flex-end" }} source={require("../Assets/filter.png")} /> */}
        </View>
    )
}

const InboxView = ({ item, index }) => {
    
    return (
        <View style={{ alignItems: "center", alignSelf: "center", flexDirection: "row", width: "90%", borderRadius: 5, borderColor: "lightgray", borderBottomWidth: 1, marginTop: 20 }} >
            <Image style={{ width: 40, height: 40, marginLeft: 10 }} resizeMode="contain" source={require("../Assets/ic_avarter.png")} />
            <View style={{ flex: 1, alignItems: "flex-start", alignSelf: "center" }} >
            <Text style={{ marginLeft: 10, color: "#9A9A9A" }}>{ "From: " + item.from_email}</Text>
            <Text style={{ marginLeft: 10, color: "#9A9A9A" }}>{ "To: " + item.to_email}</Text>
            <Text style={{ marginLeft: 10, color: "black" , marginBottom : 20 , marginTop : 20 }}>{ "Subject: " +item.subject}</Text>
            </View>

            <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4, backgroundColor: "white", alignSelf: "flex-end", alignSelf: "center", marginRight: 10 }}>
                {/* <Text style={{ alignSelf: "center", justifyContent: "center" }}>{item.created_date}</Text> */}
                {/* <Text style={{ fontSize: 14, fontStyle: "normal", color: "white", alignSelf: "center", justifyContent: "center" }}>1 new</Text> */}
                <Image style={{ width: 20, height: 20, marginLeft: 10, alignSelf: "center", justifyContent: "center" }} resizeMode="contain" source={require("../Assets/ic_star.png")} />
            </View>

            {/* <TextInput value={searchText} onChangeText={(t) => { setSearchText(t) }} style={{ flex: 1, marginLeft: 10 }} placeholder={"Search"} /> */}
            {/* <Image style={{ width: 50, height: 25, marginRight: 10, alignItems: "flex-end" }} source={require("../Assets/filter.png")} /> */}
        </View>
    )
}

export default MailBoxDetail