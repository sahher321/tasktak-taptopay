import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppTheme } from "../AppTheme/AppTheme";
import {
  APP_URL,
  DeleteInvoices,
  DeleteStaffs,
  GetAllStaffs,
} from "../Components/Api";
import { apiDeletePost } from "../Components/ApiDelete";
import { GoToNextController } from "../Components/General";
import { Navigation } from "react-native-navigation";

handleNewStaffPressed = () => {
  GoToNextController("AddNewStaff");
};

const Staff = () => {
  const [dataAllStaffs, setDataAllStaffs] = useState([]);

  useEffect(() => {
    apiPost();
  }, []);

  const apiPost = async (s) => {
    // console.log(`check func =`, MyTasks)

    axios
      .get(APP_URL.BaseUrl + GetAllStaffs)
      .then((data) => {
        console.log(`Staff DATA = ${JSON.stringify(data.data, null, 2)}`);
        // setApiData([])
        // setDataAllTasks(data.data);
        setDataAllStaffs(data?.data || []);
      })
      .catch((e) => {
        console.log(`Error =`, e);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={{ fontSize: 22, marginLeft: 16, marginTop: 20 }}>
          Staff
        </Text>

        <TouchableOpacity
          style={{
            alignItems: "flex-end",
            flex: 1,
            marginTop: 20,
            marginRight: 22,
          }}
          onPress={() => handleNewStaffPressed()}
        >
          <Text style={{ fontSize: 22, color: AppTheme.PrimaryColor }}>
            Add Staff
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <StaffView item={item} apiPost={apiPost} />
        )}
        data={dataAllStaffs}
      />
    </View>
  );
};

const StaffView = ({ item, apiPost }) => {
  return (
    <View
      style={{
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
      <View style={{}}>
        <Text
          style={{
            fontSize: 15,
            marginLeft: 5,
            marginTop: 3,
            textTransform: "capitalize",
          }}
        >
          {" "}
          Name: {item.firstname}
        </Text>
        <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 3 }}>
          Phone: {item.phonenumber ?? "N/A"}
        </Text>
        <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 3 }}>
          Email: {item.email ?? "N/A"}
        </Text>
        <View style={{ flexDirection: "row", marginLeft: 5 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              Navigation.push("AppStack", {
                component: {
                  name: "ViewStaff",
                  passProps: {
                    staffID: item?.staffid,
                  },
                },
              });
            }}
            style={{ justifyContent: "center" }}
          >
            <Text style={{ color: "blue" }}>View | </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              Navigation.push("AppStack", {
                component: {
                  name: "EditStaff",
                  passProps: {
                    StaffDetail: item,
                  },
                },
              });
            }}
            style={{ justifyContent: "center" }}
          >
            <Text style={{ color: "green" }}>Edit | </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 0 }}
            activeOpacity={0.7}
            onPress={async () => {
              apiDeletePost({
                id: item.staffid,
                uri: APP_URL.BaseUrl + DeleteStaffs,
                // setLoading
              }).then((res) => {
                console.log("DELETED = ", res);
                apiPost();
              });
            }}
          >
            <Text style={{ color: "red" }}>Delete</Text>
          </TouchableOpacity>
          {/* <Text style={{ color: "#FFD21F" }}>Create Appointment</Text> */}
        </View>
      </View>
    </View>
  );
};

export default Staff;
