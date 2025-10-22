import axios from "axios";
import React, { useEffect, useState, useRef, memo } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { AppTheme } from "../AppTheme/AppTheme";
import { APP_URL, editProfile, GetAllInvoices } from "../Components/Api";
import {
  CustomTextfield,
  CustomTextfieldWithBorder,
  ScreenWidth,
} from "../Components/General";
import CustomImagePicker from "../Components/ImagePicker/ImagePicker";

import UserPermissions from "../Components/UserPermissions";

const EditProfile = () => {
  const refImagePicker = useRef();
  //    ? require("../Assets/avartor.png") : { uri: UserPermissions.user_data[0].profile_image }
  const [imageData, setImageData] = useState({
    uri: UserPermissions.user_data[0].profile_image,
    base64: "",
    type: "",
  });

  function openCamera() {
    if (refImagePicker?.current?.open != undefined) {
      refImagePicker?.current?.open();
    } else {
      // DebugConsole(`refImagePicker?.current?.open os undefined`);
    }
  }

  const [dataAllStaffs, setDataAllStaffs] = useState([]);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  useEffect(() => {
    setName(
      UserPermissions.user_data[0]?.firstname +
        " " +
        UserPermissions.user_data[0]?.lastname
    );
    setEmail(UserPermissions.user_data[0]?.email);
    setPhone(UserPermissions.user_data[0]?.phonenumber);

    console.log(
      "UserPermissions.user_data[0].profile_image",
      UserPermissions.user_data[0].profile_image
    );
  }, []);
  const apiPost = async (s) => {
    let data = {
      user_id: UserPermissions.user_data[0].staffid,
      firstname: name,
      lastname: name,
      email: email,
      phonenumber: phone,
      default_language: "english",
    };

    const formData = new FormData();
    formData.append(JSON.stringify(data));
    formData.append("profile_image", {
      uri: imageData.uri, //Your Image File Path
      type: "image/jpeg",
      name: "imagename.jpg",
    });
    axios({
      url: APP_URL.BaseUrl + editProfile,
      method: "POST",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        console.log("response :", response);
      })
      .catch(function (error) {
        console.log("data params is", formData);

        console.log("error from image :", error);
      });
  };

  // const apiPost = async (s) => {

  //     // console.log(`check func =`, MyTasks)
  //     let data = {

  //         user_id: UserPermissions.user_data[0].staffid,
  //         firstname: name,
  //         email: email,
  //         phonenumber: phone,
  //         default_language : "english" ,

  //         profile_image : imageData.uri

  //     }

  //     const formData = new FormData();
  //     for (var key of Object.keys(data)) {
  //         formData.append(key, data[key])
  //     }

  //     console.log("APP_URL.BaseUrl + EditProfile", APP_URL.BaseUrl + editProfile)

  //      axios.post(APP_URL.BaseUrl + editProfile, formData
  //     )
  //         .then(data => {
  //             console.log(`EditProfile DATA = ${JSON.stringify(data.data, null, 2)}`)
  //             // setApiData([])
  //             // setDataAllTasks(data.data);
  //             // setDataAllStaffs(data?.data || []);
  //         })
  //         .catch(e => {
  //             console.log(`Error =`, e.message)

  //         })

  // }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            marginLeft: 16,
            marginTop: 20,
            alignSelf: "flex-start",
          }}
        >
          Profile
        </Text>

        <TouchableOpacity
          onPress={() => {
            UserPermissions.removeItemValue("user-data");
            UserPermissions.setUserData({});
            Navigation.setStackRoot("AppStack", {
              component: {
                name: "Tutorial",
                options: { topBar: { visible: false } },
              },
            });
          }}
        >
          <Text
            style={{
              fontSize: 22,
              marginRight: 16,
              marginTop: 20,
              alignSelf: "flex-start",
              color: "red",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Image style={{ width: 145, height: 132, marginLeft: 10 }} source={require("../Assets/avartor.png")} /> */}
      <TouchableOpacity
        onPress={() => {
          openCamera();
        }}
      >
        <Image
          style={{
            width: 145,
            height: 145,
            marginLeft: 10,
            borderRadius: 72.5,
          }}
          source={{
            uri:
              imageData.uri != ""
                ? imageData.uri
                : require("../Assets/avartor.png"),
          }}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 26, marginLeft: 16, marginTop: 20 }}>
        {UserPermissions.user_data[0]?.firstname +
          " " +
          UserPermissions.user_data[0]?.lastname}
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginLeft: 16,
          marginTop: 10,
          color: "#242134",
        }}
      >
        {UserPermissions.user_data[0]?.department}
      </Text>
      <ScrollView style={{ width: ScreenWidth, alignSelf: "center" }}>
        <CustomTextfieldProfile
          value={name}
          setValue={setName}
          placeholder={"User name"}
          fieldName={"User Name"}
          marginTop={50}
        />
        <CustomTextfieldProfile
          value={email}
          setValue={setEmail}
          placeholder={"Email"}
          fieldName={"Email"}
          marginTop={20}
        />
        <CustomTextfieldProfile
          value={phone}
          setValue={setPhone}
          placeholder={"Phone"}
          fieldName={"Phone"}
          marginTop={20}
        />

        {/* <CustomTextfieldProfile value={UserPermissions.user_data[0]?.current_address} placeholder={"Location"} fieldName={"Location"} marginTop={20} />
                <CustomTextfieldProfile placeholder={"Receive Notification"} fieldName={"Receive Notification"} marginTop={20} /> */}

        <TouchableOpacity
          onPress={() => {
            apiPost();
          }}
        >
          <View
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: AppTheme.PrimaryColor,
              alignSelf: "center",
              marginTop: 50,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontStyle: "normal",
                color: "white",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              Update
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <CustomImagePicker
        ref={refImagePicker}
        imageData={imageData}
        setImageData={setImageData}
      />
    </View>
  );
};

const CustomTextfieldProfile = memo(
  ({ placeholder, fieldName, marginTop, value, setValue }) => {
    return (
      <View style={{ marginTop: marginTop, alignSelf: "center" }}>
        <Text style={{ marginLeft: 10 }}>{fieldName}</Text>

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: "90%",
            height: 40,
            borderRadius: 5,
            borderColor: "lightgray",
            borderBottomWidth: 1,
          }}
        >
          {/* <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={require("../Assets/ic_search.png")} /> */}
          <TextInput
            value={value}
            onChangeText={(t) => setValue(t)}
            style={{ flex: 1, marginLeft: 10 }}
            placeholder={placeholder}
          />
          <TouchableOpacity>{/* <Text>Edit</Text> */}</TouchableOpacity>
          {/* <Image style={{ width: 50, height: 25, marginRight: 10, alignItems: "flex-end" }} source={require("../Assets/filter.png")} /> */}
        </View>
      </View>
    );
  }
);

const StaffView = ({ item }) => {
  return (
    <View
      style={{
        height: 80,
        flexDirection: "row",
        flex: 1,
        borderBottomColor: AppTheme.BorderColor,
        borderBottomWidth: 1,
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 40, height: 40, marginLeft: 16 }}
        resizeMode="stretch"
        source={require("../Assets/ic_circle.png")}
      />
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 15, marginTop: 3 }}>
          {item.prefix + item.number}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "blue" }}>View | </Text>
          <Text style={{ color: "red" }}>Delete</Text>
        </View>
      </View>

      <View style={{ alignItems: "flex-end", flex: 1, marginRight: 20 }}>
        <Text style={{ fontSize: 15, marginLeft: 5, marginTop: 3 }}>
          {"$" + item.total}
        </Text>

        <Text style={{ fontSize: 15, marginLeft: 5, marginTop: 3 }}>
          {"Paid"}
        </Text>
        {/* <View style={{  flexDirection: "row", marginLeft: 5 }}>
                    <Text style={{color: "blue"}}>View | </Text>
                    <Text style={{color: "red"}}>Delete</Text>
                 </View> */}
      </View>
    </View>
  );
};

export default EditProfile;
