import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, ScrollView, useWindowDimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView} from 'react-native';
import HTML from "react-native-render-html";
import { APP_URL } from '../Components/Api';
import UserPermissions from '../Components/UserPermissions';
import { AppTheme } from '../AppTheme/AppTheme';

const ViewMail = (props) => {
    const {mailDetail} = props;
    const {width} = useWindowDimensions();
    const [buttonLoader, setButtonLoader] = useState(false);
    const [replyBox, setReplyBox] = useState(false);
    const [mailReply, setMailReply] = useState(null);
    const [forwardMail, setForwardMail] = useState(null);
    const [messageBody, setMessageBody] = useState("");

    useEffect(() => {
        getMailReply();
        getForwardMail();
    }, []);
    const getMailReply = () => {
        try {
            var myHeaders = new Headers();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(APP_URL.BaseUrl + `/api/StaffMailbox/getReplyMail?id=${mailDetail?.id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result?.code === 200) {
                    setMailReply(result?.data);
                }
            }).catch((error) => console.log('error', error));
        } catch (error) {
            console.log("ERROR =====> ", error?.message);
        }
    };
    const getForwardMail = () => {
        try {
            var myHeaders = new Headers();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(APP_URL.BaseUrl + `/api/StaffMailbox/getforwardMail?id=${mailDetail?.id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result?.code === 200) {
                    setForwardMail(result?.data);
                }
            }).catch((error) => console.log('error', error));
        } catch (error) {
            console.log("ERROR =====> ", error?.message);
        }
    };
    const sendReplyHandle = () => {
        try {
            setButtonLoader(true);
            const user_id = UserPermissions.user_data[0]?.staffid;
            var myHeaders = new Headers();

            var formdata = new FormData();
            formdata.append("reply_from_id", mailDetail?.id);
            formdata.append("to", mailDetail?.to_email);
            formdata.append("cc", "");
            formdata.append("subject  ", mailDetail?.subject);
            formdata.append("body", messageBody);
            formdata.append("userid", user_id);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(APP_URL.BaseUrl + "/api/StaffMailbox/sendReplyEmail", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("result =====> ", result);
                setButtonLoader(false);
                setReplyBox(false);
                if (result?.code === 200) {
                    Alert.alert(
                        'Alert',
                        result?.message,
                        [
                           {
                                text: 'OK',
                                onPress: () => {},
                            }
                        ],
                        { cancelable: false }
                    );
                } else {
                    alert(result?.message);
                }
            }).catch((error) => {
                setButtonLoader(false);
                setReplyBox(false);
                console.log("ERROR =====> ", error?.message);
            });
        } catch (error) {
            setButtonLoader(false);
            setReplyBox(false);
            console.log("ERROR =====> ", error?.message);
        }
    };
    const forwardMailHandle = () => {
        try {
            setButtonLoader(true);
            const user_id = UserPermissions.user_data[0]?.staffid;
            var myHeaders = new Headers();

            var formdata = new FormData();
            formdata.append("forwordfrom_id", mailDetail?.id);
            formdata.append("to", mailDetail?.to_email);
            formdata.append("cc", "");
            formdata.append("subject", mailDetail?.subject);
            formdata.append("body", mailDetail?.message);
            formdata.append("userid", user_id);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(APP_URL.BaseUrl + "/api/StaffMailbox/sendForwordEmail", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("result =====> ", result);
                setButtonLoader(false);
                if (result?.code === 200) {
                    Alert.alert(
                        'Alert',
                        "Email Forward Successfully",
                        [
                           {
                                text: 'OK',
                                onPress: () => {},
                            }
                        ],
                        { cancelable: false }
                    );
                } else {
                    alert(result?.message);
                }
            }).catch((error) => {
                setButtonLoader(false);
                console.log("ERROR =====> ", error?.message);
            });
        } catch (error) {
            setButtonLoader(false);
            console.log("ERROR =====> ", error?.message);
        }
    };

    return (
        <View style={styles.maincontainer}>
            <ScrollView>
                <View style={{padding:16}}>
                    <Text style={styles.labelText}>
                        {mailDetail?.subject}
                    </Text>
                    <View style={{flexDirection:"row",marginTop:26}}>
                        <Image
                            resizeMode="contain"
                            style={{width:40,height:40}}
                            source={require("../Assets/ic_avarter.png")}
                        />
                        <View style={{flex:1,alignItems:"flex-start",alignSelf:"center",marginLeft:12}} >
                            <Text style={{color:"#000",fontFamily:"Prompt-Medium",}}>{"From: " + mailDetail?.from_email}</Text>
                            <Text style={{color:"#000",fontFamily:"Prompt-Medium",}}>{"To: " + mailDetail?.to_email}</Text>
                        </View>
                    </View>
                    <View style={{marginTop:16}}>
                        <HTML
                            contentWidth={width}
                            source={{html: mailDetail?.message}}
                            tagsStyles = {{p:{color:'#000',fontFamily:'Prompt-Light',fontSize:14}}}
                        />
                    </View>
                    {mailReply === null ? null : 
                        <View style={{borderTopColor:"#ccc",borderTopWidth:1,marginTop:12}}>
                            <View style={{flexDirection:"row",marginTop:26}}>
                                <Image
                                    resizeMode="contain"
                                    style={{width:40,height:40}}
                                    source={require("../Assets/ic_avarter.png")}
                                />
                                <View style={{flex:1,alignItems:"flex-start",alignSelf:"center",marginLeft:12}} >
                                    <Text style={{color:"#000",fontFamily:"Prompt-Medium"}}>{"From: " + mailReply?.from_email}</Text>
                                    <Text style={{color:"#000",fontFamily:"Prompt-Medium"}}>{"To: " + mailReply?.to}</Text>
                                </View>
                            </View>
                            <View style={{marginTop:16}}>
                                <HTML
                                    contentWidth={width}
                                    source={{html: mailReply?.body}}
                                    tagsStyles = {{p:{color:'#000',fontFamily:'Prompt-Light',fontSize:14}}}
                                />
                            </View>
                        </View>
                    }
                    {forwardMail === null ? null : 
                        <View style={{borderTopColor:"#ccc",borderTopWidth:1,marginTop:12}}>
                            <Text style={[styles.labelText,{marginTop:18}]}>
                                Forward
                            </Text>
                            <View style={{flexDirection:"row",marginTop:12}}>
                                <Image
                                    resizeMode="contain"
                                    style={{width:40,height:40}}
                                    source={require("../Assets/ic_avarter.png")}
                                />
                                <View style={{flex:1,alignItems:"flex-start",alignSelf:"center",marginLeft:12}} >
                                    <Text style={{color:"#000",fontFamily:"Prompt-Medium"}}>{"From: " + forwardMail?.from_email}</Text>
                                    <Text style={{color:"#000",fontFamily:"Prompt-Medium"}}>{"To: " + forwardMail?.to}</Text>
                                </View>
                            </View>
                            <View style={{marginTop:16}}>
                                <HTML
                                    contentWidth={width}
                                    source={{html: forwardMail?.body}}
                                    tagsStyles = {{p:{color:'#000',fontFamily:'Prompt-Light',fontSize:14}}}
                                />
                            </View>
                        </View>
                    }
                </View>
            </ScrollView>
            <KeyboardAvoidingView behavior='padding'>
            {replyBox ? 
                <View style={{backgroundColor:"#EEE",marginTop:22,borderTopLeftRadius:20,borderTopRightRadius:20,padding:16}}>
                    <Text style={{fontSize:16,color:"#000",marginBottom:8,fontFamily:"Prompt-Medium"}}>Message</Text>
                    <TextInput
                        multiline={true}
                        value={messageBody}
                        placeholder={'Message'}
                        onChangeText={(txt) => setMessageBody(txt)}
                        style={{borderColor:"#ccc",borderWidth:1,borderRadius:6,paddingHorizontal:12,paddingBottom:120}}
                    />
                    <View style={{flexDirection:"row",marginTop:20}}>
                        <TouchableOpacity
                            activeOpacity={.7}
                            onPress={sendReplyHandle}
                            style={{width:"40%",backgroundColor:AppTheme.PrimaryColor,height:42,borderRadius:6,alignItems:"center",justifyContent:"center"}}>
                            {buttonLoader ? 
                                <ActivityIndicator size={"small"} color={"#FFF"} />
                            :
                                <Text style={{color:"#FFF",fontFamily:"Prompt-Medium"}}>Send</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.7}
                            onPress={() => setReplyBox(false)}
                            style={{width:"40%",backgroundColor:"#FFF",marginLeft:20,height:42,borderRadius:6,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{color:AppTheme.PrimaryColor,fontFamily:"Prompt-Medium"}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            :
                <View style={{flexDirection:"row",padding:16}}>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => setReplyBox(true)}
                        style={{flex:1,borderRadius:100,borderColor:"#000",borderWidth:1,paddingVertical:14,marginRight:8}}>
                        <View style={{flexDirection:"row",alignSelf:"center"}}>
                            <View style={{justifyContent:"center",marginRight:14}}>
                                <Image
                                    source={require("../Assets/reply-icon.png")}
                                    style={{height:25,width:25,resizeMode:"contain",tintColor:"#000",opacity:.7}}
                                />
                            </View>
                            <View style={{justifyContent:"center"}}>
                                <Text style={{color:"#000",fontFamily:"Prompt-Medium"}}>Reply</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={forwardMailHandle}
                        style={{flex:1,borderRadius:100,borderColor:"#000",borderWidth:1,paddingVertical:14,marginLeft:8}}>
                        <View style={{flexDirection:"row",alignSelf:"center"}}>
                            <View style={{justifyContent:"center",marginRight:14}}>
                                <Image
                                    source={require("../Assets/forward-icon.png")}
                                    style={{height:25,width:25,resizeMode:"contain",tintColor:"#000",opacity:.7}}
                                />
                            </View>
                            <View style={{justifyContent:"center"}}>
                                <Text style={{color:"#000 ",fontFamily:"Prompt-Medium"}}>Forward</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            }
            </KeyboardAvoidingView>
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
        fontFamily:"Prompt-Medium",
        textTransform: 'capitalize'
    },
    maincontainer: {
        flex: 1,
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

export default ViewMail;
