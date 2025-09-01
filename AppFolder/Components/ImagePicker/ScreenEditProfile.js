// import React, { useEffect, useState, memo, useReducer, useRef } from 'react'
// import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native'
// import Ioicon from 'react-native-vector-icons/Ionicons'
// import { Constants, DebugConsole, height, RenderConsole, str, width } from '../General/Constants'
// import CustomStatusBar, { barStyles, setStatusBarStyle } from '../General/CustomStatusBar'
// import { AppBackIcon, AppHeader } from '../General/Components/AppHeader'
// import { AppScreens, popToRoot, pushScreen } from '../General/AppRoutes'
// import { colors, textColors } from '../General/AppTheme'
// import LinearGradient from 'react-native-linear-gradient'
// import Clickable from '../General/Components/Clickable'
// import MobxUser from '../Modal/User'
// import deviceInfoModule from 'react-native-device-info'
// import { asyncStoreUser } from '../Modal/asyncStorage'
// import { SuccessSnackBar } from '../General/Components/SnackBar'
// import { apiPostWithToken, Apis, auth, BaseUrl } from '../General/Components/Api'
// // import { Cu } from '../General/Components/ImagePicker'
// import CustomImagePicker from '../General/Components/ImagePicker/ImagePicker'
// import axios from 'axios'
// import { getProfilePic } from '../General/Components/UserImage'
// import CrashLog from '../General/CrashLog'



// const ScreenEditProfile = (props) => {
//     RenderConsole(`Rendered Tab ScreenEditProfile `)
//     props = { ...props, viewWillAppear: () => { viewWillAppear() }, viewWillDisappear: () => { viewWillDisappear() }, name: '_props' }

//     const refImagePicker = useRef(); 
//     const [name, setName] = useState(`${MobxUser?.user?.first_name || ''} ${MobxUser?.user?.last_name != undefined && " "}${MobxUser?.user?.last_name || ''}`);
//     const [email, setEmail] = useState(MobxUser?.user?.email || '');
//     const [phone, setPhone] = useState(MobxUser?.user?.mobile || '');
//     const [imageData, setImageData] = useState({
//         uri: '',
//         base64: '',
//         type: '',
//     });
//     const imageSource =
//         imageData.uri != "" ? { uri: imageData.uri } :
//             props?.passedProps?.gender != undefined && props.passedProps.gender == "Male" ? require('../Assets/ic_male.png') :
//                 require('../Assets/ic_female.png')
//     const gender = props?.passedProps?.gender || "Male";
//     const dob = props?.passedProps?.dob || "";

//     const viewWillDisappear = () => {
//         DebugConsole('View Will DisAppear for Tabr Home')
//     }

//     useEffect(() => {
//         setStatusBarStyle({ props: props, style: barStyles.light })
//         setImageData({ ...imageData, uri: getProfilePic() })
//         return () => {
//             CrashLog(`Exited - ScreenEditProfile`);
//         }
//     }, [])

//     async function apiSignup() {
//         //     // .addMultipartFile("image", image)
//         //     // jsonObject.put("email", email);
//         //     // jsonObject.put("mobile", mobile);
//         //     // jsonObject.put("gender", gender);
//         //     // jsonObject.put("dob", dob);
//         //     // jsonObject.put("fname", fname);
//         //     // jsonObject.put("lname", lname);
//         //     // jsonObject.put("password", password);
//         //     // jsonObject.put("device_id", device_id);
//         //     // jsonObject.put("device_token", device_token);
//         //     // jsonObject.put("type", type);
//         // popToRoot(props)
//         // return;
//         // .addMultipartFile("image", image)
//         // jsonObject.put("email", email);
//         // jsonObject.put("mobile", mobile);
//         // jsonObject.put("gender", gender);
//         // jsonObject.put("dob", dob);
//         // jsonObject.put("fname", fname);
//         // jsonObject.put("lname", lname);
//         // jsonObject.put("password", password);
//         // jsonObject.put("device_id", device_id);
//         // jsonObject.put("device_token", device_token);
//         // jsonObject.put("type", type);
//         // body: {
//         //     // "user_id": "699981",
//         //     "mobile": phone,
//         //     "email": email,
//         //     "fname": nameSplit[0] || "",
//         //     "lname": nameSplit.length > 1 ? nameSplit[1] : "",
//         //     "device_id": id,
//         //     "device_token": MobxUser?.user?.device_token || "",
//         //     "password": "",
//         //     "dob": "",
//         //     "gender": ""
//         // }
//         const token = await auth.getUserToken();
//         const id = deviceInfoModule.getDeviceId()
//         const formData = new FormData();
//         let nameSplit = name.split(" ");
//         let nameLength = nameSplit.length;
//         console.log("Name Splits");
//         console.log(nameSplit);
//         console.log("Name")
//         console.log(name)
//         console.log(nameLength)
//         console.log(nameSplit.length)
//         formData.append('user_id', MobxUser?.user?.uid);
//         formData.append("mobile", phone);
//         formData.append("email", email);
//         formData.append("fname", nameSplit[nameLength - 2] || "");
//         formData.append("lname", nameSplit[nameLength - 1] ? nameSplit[nameLength - 1] : "");
//         formData.append("device_id", id);
//         formData.append("device_token", MobxUser?.user?.device_token || "");
//         formData.append("password", "");
//         formData.append("dob", dob);
//         formData.append("gender", gender);
//         let body = {
//             "user_id": MobxUser?.user?.uid,
//             "mobile": phone,
//             "email": email,
//             "fname": nameSplit[nameLength - 2] || "",
//             "lname": nameSplit[nameLength - 1] ? nameSplit[nameLength - 1] : "",
//             "device_id": id,
//             "device_token": MobxUser?.user?.device_token || "",
//             "password": "",
//             "dob": dob,
//             "gender": gender,
//         }
//         if (getProfilePic() != imageData.uri && imageData.uri != "") {
//             formData.append("image", {
//                 uri: imageData.uri,
//                 type: imageData.type,
//                 name: 'Photo.jpg'
//             })
//             body["image"] = {
//                 uri: imageData.uri,
//                 type: imageData.type,
//                 name: 'Photo.jpg'
//             }
//         }

//         let headers = {
//             'Content-Type': 'application/json',// this is a imp line
//             // 'User-Role': USER_ROLL,
//             Authorization: "Bearer " + token,
//             Accept: 'application/json',
//         };
//         DebugConsole(`FormData = ${str(body)}`)
//         try {

//             const { data, error } = await apiPostWithToken({
//                 url: Apis.signup,
//                 showSpinner: true,
//                 body: { ...body },
//                 headers: {
//                     // "Content-Type": "multipart/form-data",
//                     "Content-Type": "application/json",// this is a imp line
//                     // 'User-Role': USER_ROLL,
//                     // Authorization: "Bearer " + token,
//                     // 'User-Role': USER_ROLL,
//                     // Accept: 'application/json',
//                 }
//                 // body: {
//                 //     // "user_id": "699981",
//                 //     "mobile": phone,
//                 //     "email": email,
//                 //     "fname": nameSplit[0] || "",
//                 //     "lname": nameSplit.length > 1 ? nameSplit[1] : "",
//                 //     "device_id": id,
//                 //     "device_token": MobxUser?.user?.device_token || "",
//                 //     "password": "",
//                 //     "dob": "",
//                 //     "gender": ""
//                 // }
//             })
//             // const { data, error } = await axios.post(BaseUrl + Apis.signup, { ...body }, { headers: { ...headers } })
//             DebugConsole(`Signup Response ${JSON.stringify(data, null, 2)}`)
//             if (data) {
//                 asyncStoreUser(data)
//                     .then(isStored => {
//                         DebugConsole(`asyncStoreUser .then isStored = ${isStored}`)
//                         if (isStored == true) {
//                             SuccessSnackBar("Profile updated successfully.")
//                             setTimeout(() => {
//                                 popToRoot(props)
//                             }, 2000)
//                         }
//                     });
//             }
//         } catch (e) {
//             console.log("Error =", e, "\n And Message = ", e?.message)
//         }
//     }



//     return (
//         <ScrollView>
//             <View style={styles.mainView}>
//                 <CustomStatusBar />
//                 <AppBackIcon style={{ padding: 20 }} props={props} />
//                 {/*  */}
//                 <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 20 }}>
//                     <View>
//                         <Text style={styles.txtHeading}>Tell us your about yourself</Text>
//                         <Text style={styles.txtSubHeading}>to make account more personal</Text>
//                     </View>
//                     <View style={{ flexDirection: 'row', marginVertical: 30, justifyContent: 'center', marginBottom: 0 }}>
//                         <View style={{ alignItems: 'center', marginEnd: 10 }}>

//                             <View style={{ height: 100 }}>
//                                 <Image
//                                     source={imageSource}
//                                     style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: colors.lightgrey, borderWidth: 2, borderColor: colors.white, padding: 4 }}

//                                 />
//                                 <Clickable
//                                     onPress={() => {
//                                         if (refImagePicker?.current?.open != undefined) {
//                                             refImagePicker?.current?.open()
//                                         } else {
//                                             DebugConsole(`refImagePicker?.current?.open os undefined`);
//                                         }
//                                     }}
//                                     style={{ position: 'absolute', bottom: 5, right: 5, width: 25, height: 25, borderRadius: 13 }}
//                                 >
//                                     <Ioicon name='add-circle-outline' size={25} style={{}} color={'white'} />
//                                 </Clickable>
//                             </View>
//                             <Text style={{ color: textColors.white, fontWeight: '700', marginTop: 10 }}>{props?.passedProps?.gender || "No Props"}</Text>
//                         </View>
//                     </View>

//                     <View style={{ width: '100%', alignItems: 'center', marginBottom: 50 }}>
//                         <ViewPicker title='Name' value={name} setValue={setName} />
//                         <ViewPicker title='email' value={email} setValue={setEmail} editable={false} />
//                         <ViewPicker title='phone' value={phone} setValue={setPhone} limit={13} />
//                     </View>
//                     <LinearGradient colors={["#29ABE2", "#4F00BC"]} style={{ borderRadius: 5, width: '35%', height: 45, alignSelf: 'center' }} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}>
//                         <Clickable onPress={apiSignup} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3, borderRadius: 5, width: '100%', height: '100%' }} activeOpacity={0.6}>
//                             <Text style={{ color: "white", textAlign: 'center', flex: 1 }} >Done</Text>
//                         </Clickable>
//                     </LinearGradient>
//                 </View>
//                 {/*  */}
//                 <CustomImagePicker ref={refImagePicker} imageData={imageData} setImageData={setImageData} />
//             </View>
//         </ScrollView>
//     )
// }

// const ViewPicker = memo(({ title = "title", style, value, setValue, editable = true, limit = 30 }) => {
//     // const [text, setText] = useState('');
//     return (
//         <View style={{ paddingVertical: 3, width: '70%', borderWidth: 1, borderColor: colors.white, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: 10, style }}>
//             <TextInput
//                 placeholder={title}
//                 value={value}
//                 onChangeText={text => setValue(text)}
//                 placeholderTextColor="grey"
//                 maxLength={limit}
//                 editable={editable}
//                 style={{
//                     height: 40,
//                     color: 'white',
//                     fontWeight: '800',
//                     // backgroundColor:'grey',
//                     width: '100%',
//                     textAlign: 'center'
//                 }}
//             />
//             {/* <Text style={{ color: 'white', fontWeight: '800' }}>{title}</Text> */}
//         </View>
//     )
// })
// export default ScreenEditProfile;


// const styles = StyleSheet.create({
//     mainView: {
//         flex: 1,
//         backgroundColor: colors.darkPurple
//     },
//     txtHeading: {
//         color: textColors.white,
//         fontWeight: '700',
//         fontSize: 17,
//         textAlign: 'center'
//     },
//     txtSubHeading: {
//         color: textColors.white,
//         // fontWeight:'bold',
//         fontSize: 11,
//         textAlign: 'center'
//     }
// })