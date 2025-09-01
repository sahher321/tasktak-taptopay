import React from "react";

import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Dimensions, ScrollView } from "react-native";
// import Carousel from 'react-native-carousel-view';
import Carousel from 'react-native-banner-carousel';
import { CustomTextfield, GoToNextController, ShowToast } from "../Components/General";

import { Navigation } from "react-native-navigation";
import { AppTheme } from "../AppTheme/AppTheme";
import { getItem } from "../Components/Api";


const Tutorial = () => {

    const { width, height } = Dimensions.get('screen');
    return (

        // <ScrollView>
        <View style={[styles.mainStyle, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
            {/* <Text style={{ alignSelf: "flex-start", marginLeft: 20 }}>Welcome</Text>
            <Text style={{ alignSelf: "flex-start", marginLeft: 20 }}>Signin To Continue</Text>
            <Image style={{ width: "70%", height: "30%", marginTop: 60 }} source={require("../Assets/splash.png")} />
            <Text style={{ fontSize: 20 }}>Task Tak BMP</Text>
            <Text style={{ textAlign: "center", fontSize: 14 }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </Text>

            <TouchableOpacity style={{ justifyContent: 'center', marginTop: 25, fontSize: 14, backgroundColor: "yellow", width: "70%", height: 40, borderRadius: 10 }}>
                <Text style={{ textAlign: "center" }}>Login Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', marginTop: 25, fontSize: 14, backgroundColor: "gray", width: "70%", height: 40, borderRadius: 10 }}>
                <Text style={{ textAlign: "center" }}>Login Staff</Text>
            </TouchableOpacity> */}



            {/* <Carousel
                width={Dimensions.get("screen").width}
                height={height * 0.9}
                // delay={2000} 
                indicatorAtBottom={true}
                indicatorSize={10}
                // indicatorText="✽"
                indicatorColor={AppTheme.yellowButtonColor}
                animate={false}
            >
                <View style={styles.contentContainer}>
                    <ScrollPages source={require("../Assets/Group128.png")} />
                </View >


                <View style={styles.contentContainer}>
                    <ScrollPages source={require("../Assets/Group200.png")} />
                </View>
                <View style={styles.contentContainer}>
                    <ScrollPages source={require("../Assets/Group217.png")} />
                </View>
            </Carousel> */}
            <Carousel
                autoplay={false}
                // autoplayTimeout={5000}
                loop={false}
                index={0}
                pageSize={width}

            >
                {[0, 1, 2].map((image, index) => (
                    index == 0 ?
                        <View style={styles.contentContainer}>
                            <ScrollPages source={require("../Assets/Group128.png")} />
                        </View >
                        : index == 1 ?
                            <View style={styles.contentContainer}>
                                <ScrollPages source={require("../Assets/Group200.png")} />
                            </View>
                            : index == 2 ?
                                <View style={styles.contentContainer}>
                                    <ScrollPages source={require("../Assets/Group217.png")} />
                                </View>
                                :
                                null
                ))}
            </Carousel>
            <View style={{ width: "70%", flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: "10%" }}>


            </View>

        </View>
        // </ScrollView>
    )
}


const ScrollPages = ({ source }) => {
    const { width, height } = Dimensions.get('screen');

    return (

        <View style={[styles.mainStyle, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
            <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 20 }}>Welcome</Text>
            <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 15 }}>Signin To Continue</Text>

            <Image style={{ width: width * 0.7, height: height * 0.2, marginTop: 20 }} source={source} resizeMode="contain" />
            <Text style={{ fontSize: 20, marginTop: 20 }}>ARBEIT TECH</Text>
            <Text style={{ textAlign: "center", fontSize: 14, marginTop: 20 }}> An All-In-One Robust SaaS Business Management Platform For Digital Transformation Across All Industries.

</Text>

           
            <TouchableOpacity 
            style={{ justifyContent: 'center', marginTop: 10, fontSize: 14, backgroundColor: AppTheme.PrimaryColor, width: width * 0.7, height: 40, borderRadius: 10 }} 
            // onPress={() => {
            //     Navigation.push("AppStack", { component: { name: "CompanyName", options: { topBar: { visible: true } } } })
            // }}
            onPress={()=> GoToNextController("Signin") }
            >
                <Text style={{ textAlign: "center", color: "white" }}>Login </Text>
            </TouchableOpacity>
        </View>

    )

}


const styles = StyleSheet.create({

    mainStyle: { marginTop: "10%" },
    container: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        // borderWidth: 2,
        // borderColor: '#CCC',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Tutorial;