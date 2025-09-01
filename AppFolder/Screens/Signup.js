import React from "react";
import { View, Text, Button, TextView, StyleSheet, TextInput, Image, TouchableOpacity , Dimensions } from "react-native";
import { Navigation } from "react-native-navigation";
import { AppTheme } from "../AppTheme/AppTheme";
import { CustomTextfield } from "./Signin";

const Signup = () => {
    return (
        <View style={{flex:1}}>
            <Image style={{ width: Dimensions.get("screen").width, height: Dimensions.get("screen").height , position: "absolute", top: -90, right: 0, marginLeft: 10 }} resizeMode="stretch" source={require("../Assets/Mask.png")} />
            <View style={{ flex: 1, marginTop: "20%", alignItems: "center" }}>
                <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize : 20 }}>Sign Up</Text>
                <Text style={{ alignSelf: "flex-start", marginLeft: 20 , fontSize : 15}}>Create new account</Text>

                <View style={{width:'70%' , alignItems:'center'}}>
                    <CustomTextfield style={{ marginTop: 80 }} placeholder="Full Name" isSecure={false} image = {require("../Assets/ic_user.png")} />
                    <CustomTextfield style={{ marginTop: 20 }} placeholder="User Name or Email" isSecure={false} image = {require("../Assets/ic_email.png")} />

                    <CustomTextfield style={{ marginTop: 20 }} placeholder="******" isSecure={true} image = {require("../Assets/ic_password.png")}/>

                    
                    <TouchableOpacity onPress={()=> {
                        Navigation.push("AppStack",{component:{name:"Dashboard" , options: { topBar: { visible: true } } } })
                    }} style={{width:"90%" , backgroundColor : AppTheme.PrimaryColor , marginTop : 50 , height : 40 , borderRadius : 6 , alignItems : "center" , justifyContent:"center"}}>
                        <Text style ={{color : "white"}}>
                            Create account
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    )
}


 

 
export default Signup


 