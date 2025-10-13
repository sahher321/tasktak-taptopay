import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { AppTheme } from "../AppTheme/AppTheme";
import { APP_URL, GetAllCreditNotes } from "../Components/Api";
import { GoToNextController } from "../Components/General";
import CreditNotesDetail from "./CreditNotesDetail";

const CreditNotes = () => {
  const [dataAllCreditNotes, setDataCreditNotes] = useState([]);

  useEffect(() => {
    apiPost();
  }, []);

  const apiPost = async (s) => {
    axios
      .get(APP_URL.BaseUrl + GetAllCreditNotes)
      .then((data) => {
        console.log(`CreditNotes DATA = ${JSON.stringify(data.data, null, 2)}`);
        // setApiData([])
        // setDataAllTasks(data.data);
        setDataCreditNotes(data?.data || []);
      })
      .catch((e) => {
        console.log(`Error =`, e);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text
        style={{
          fontSize: 22,
          marginLeft: 16,
          marginTop: 20,
          alignSelf: "flex-start",
        }}
      >
        CreditNotes
      </Text>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          width: "90%",
          height: 40,
          borderRadius: 5,
          borderColor: "lightgray",
          borderWidth: 1,
          marginTop: 20,
        }}
      >
        <Image
          style={{ width: 20, height: 20, marginLeft: 10 }}
          source={require("../Assets/ic_search.png")}
        />
        <TextInput style={{ flex: 1, marginLeft: 10 }} placeholder={"Search"} />
        <Image
          style={{
            width: 50,
            height: 25,
            marginRight: 10,
            alignItems: "flex-end",
          }}
          source={require("../Assets/filter.png")}
        />
      </View>
      <FlatList
        style={{ alignSelf: "flex-start", marginTop: 20, width: "100%" }}
        renderItem={StaffView}
        data={dataAllCreditNotes}
      ></FlatList>
    </View>
  );
};

const StaffView = ({ item }) => {
  handleNewProjectPressed = () => {
    // GoToNextController("CreditNotesDetail")
    Navigation.push("AppStack", {
      component: {
        passProps: { item },
        name: "CreditNotesDetail",
        options: { topBar: { visible: true } },
      },
    });

    console.log("AppStackAppStackAppStack", item);
  };
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
          <TouchableOpacity
            style={{ alignItems: "flex-end" }}
            onPress={handleNewProjectPressed}
          >
            <Text style={{ color: "gray" }}>New Credit Note </Text>
          </TouchableOpacity>
          <Text style={{ color: "blue" }}>| Edit</Text>
        </View>
      </View>

      <View style={{ alignItems: "flex-end", flex: 1, marginRight: 20 }}>
        {/* <Text style={{ fontSize: 15, marginLeft: 5 , marginTop: 3 }}>{"$" + item.total}</Text> */}

        <Text style={{ fontSize: 15, marginLeft: 5, marginTop: 3 }}>
          {"Closed"}
        </Text>
        {/* <View style={{  flexDirection: "row", marginLeft: 5 }}>
                    <Text style={{color: "blue"}}>View | </Text>
                    <Text style={{color: "red"}}>Delete</Text>
                 </View> */}
      </View>
    </View>
  );
};

export default CreditNotes;
