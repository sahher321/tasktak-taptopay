import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TextInput,
  WebView,
} from "react-native";
import { AppTheme } from "../AppTheme/AppTheme";
import { APP_URL, GetAllAnnouncement } from "../Components/Api";
import HTML from "react-native-render-html";

const AllAnnouncement = () => {
  const [getAllAssigment, setAllAssigment] = useState([]);

  useEffect(() => {
    apiPost();
  }, []);

  const apiPost = async (s) => {
    console.log(`Announcement DATA`);

    axios
      .get(APP_URL.BaseUrl + GetAllAnnouncement, { "": "" })
      .then((data) => {
        console.log(
          `Announcement DATA = ${JSON.stringify(data.data.data, null, 2)}`
        );
        setAllAssigment(data.data.data);
      })
      .catch((e) => {
        console.log(`Error =`, e);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 22, marginLeft: 16, marginTop: 20 }}>
        Announcements
      </Text>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          height: 40,
          borderRadius: 5,
          borderColor: "lightgray",
          borderWidth: 1,
          marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        <Image
          style={{ width: 20, height: 20, marginLeft: 10 }}
          source={require("../Assets/ic_search.png")}
        />
        <TextInput style={{ flex: 1, marginLeft: 10 }} placeholder={"Search"} />
        {/* <Image style={{ width: 50, height: 25, marginRight: 10, alignItems: "flex-end" }} source={require("../Assets/filter.png")} /> */}
      </View>

      <FlatList
        style={{ marginTop: 20 }}
        renderItem={AnnouncementView}
        data={getAllAssigment}
      ></FlatList>
    </View>
  );
};

const AnnouncementView = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        borderBottomColor: AppTheme.BorderColor,
        borderBottomWidth: 1,
      }}
    >
      <Image
        style={{ marginTop: 22, width: 40, height: 40, marginLeft: 16 }}
        resizeMode="stretch"
        source={require("../Assets/ic_circle.png")}
      />
      <View style={{}}>
        <Text style={{ fontSize: 18, marginLeft: 10, marginTop: 20 }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginLeft: 10,
            marginTop: 3,
            marginRight: 80,
            marginBottom: 20,
          }}
        >
          {<HTML source={{ html: item?.message }} />}
        </Text>
      </View>
    </View>
  );
};

export default AllAnnouncement;
