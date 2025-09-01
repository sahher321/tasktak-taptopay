import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Button, TextView, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ToastAndroid } from "react-native";
import { Navigation } from "react-native-navigation";
import { AppTheme } from "../AppTheme/AppTheme";
import { GetSignin } from "../Components/Api";
import { toHome } from "../Components/AppRoutes";
import { CustomTextfield, ShowToast } from "../Components/General";
import Loader from "../Components/Loader";
import UserPermissions from "../Components/UserPermissions";
import { APP_URL } from "../Components/Api";
import { AppGrayColor } from "./Signup";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signin = () => {

    const [password, setPassword] = useState('')
    const [userName, setuserName] = useState('')
    const [loading, setLoading] = useState(false);

    const [getUserData, setUserData] = useState([]);

    useEffect(() => {
        // apiPost()
    }, [])


    const apiPost = async (s) => {


        setLoading(true)
        const params = JSON.stringify({

        });

        let data = {

            email: userName,
            password: password
        }
        const formData = new FormData();
        formData.append(JSON.stringify(data));


        console.log(`params =`, formData)
        console.log(`Signin Url =`, GetSignin)

        //  axios({
        //     method: 'post',
        //     url: GetSignin,
        //     headers: {}, 
        //     data: {
        //         "email": "junaid@tasktak.com"  // This is the body part
        //     }
        //   }).then(data=>{
        //     console.log(`UserData DATA = ${JSON.stringify(data.data, null, 2)}`)

        // })

        console.log("MAIN APP URL = " , APP_URL.BaseUrl + GetSignin)
        axios.post('https://nexttak.com' + `${GetSignin}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'

            }
        })
            .then(data => {


                setLoading(false) 
                console.log(`UserData DATA = ${JSON.stringify(data.data, null, 2)}`)
                 console.log(`UserData code = ${JSON.stringify(data.data.staffid, null, 2)}`)
             
                 async function save() {
                    console.log("Saving Staff id...");
                    try {
                      await AsyncStorage.setItem('staffid', data.data.staffid);
                      console.log("Staff id in storage:", data.data.staffid);
                    } catch (error) {
                      console.error("Error saving Staff id in storage:", error);
                    }
                  }
                  
                  save();
                  
              
              save();

                if (data.data.code == 400) {
                    alert(data.data.data)
                    console.log("email or password Invalid")
                    return
                }

                
                UserPermissions.setPermissions(data.data.permission)
                UserPermissions.setUserData(data.data)
                toHome()

                // setApiData([])
                // setDataAllTasks(data.data);
                setUserData(data || []);
            })
            .catch(e => {
                console.log(`Error =`, e)

                setLoading(false)
                alert(e)

            })


    }

    validates = () => {

        let text = userName
        let emailError = this.state.emails;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.warn("Invalid email")
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({ email: text })
            console.log("Email is Correct");
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <Image style={{ width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, position: "absolute", top: -90, right: 0, marginLeft: 10 }} resizeMode="stretch" source={require("../Assets/Mask.png")} />
            <View style={{ flex: 1, marginTop: "20%", alignItems: "center" }}>

                <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 20 }}>Welcome</Text>
                <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 15 }}>Signin To Continue</Text>

                <View style={{ width: '70%', alignItems: 'center' }}>
                    <CustomTextfield value={userName} setValue={setuserName} style={{ marginTop: 80 }} placeholder="Email" isSecure={false} image={require("../Assets/ic_user.png")} />
                    <CustomTextfield value={password} setValue={setPassword} style={{ marginTop: 20 }} placeholder="******" isSecure={true} image={require("../Assets/ic_password.png")} />

                    <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 10 }}>
                        <Text style={{ color: "lightgray" }}>
                            Forget Password?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: "90%", backgroundColor: AppTheme.PrimaryColor, marginTop: 20, height: 42, borderRadius: 6, alignItems: "center", justifyContent: "center" }} onPress={() => {

                        if (userName.length == 0) {
                            console.log("userName.length")

                            ShowToast("Please enter company Name")


                        }
                        else if (password.length == 0) {
                            console.log("password.length")

                            ShowToast("Please enter Password")
                        }
                        else {
                            apiPost()

                        }
                        //Navigation.push("AppStack",{component:{name:"Dashboard" , options: {  topBar: { backButton:{ visible: false}, visible: true , title : { text : "Dashboard"} } } } })
                    }}>
                        <Text style={{ color: "white" }}>
                            Login
                        </Text>
                    </TouchableOpacity>

                </View>
                <Loader loading={loading} />

            </View>
        </View>


    )
}

export default Signin

