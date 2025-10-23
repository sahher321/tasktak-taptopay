import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  useWindowDimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { AppTheme } from "../AppTheme/AppTheme";
import {
  GoToNextController,
  Screenheight,
  ScreenWidth,
} from "../Components/General";
import { ProgressView } from "@react-native-community/progress-view";
import { Navigation } from "react-native-navigation";
import axios from "axios";
import { APP_URL, DeleteProjects, GetAllProjects } from "../Components/Api";
import moment from "moment";
import Loader from "../Components/Loader";
import { apiDeletePost } from "../Components/ApiDelete";
import UserPermissions from "../Components/UserPermissions";

const FirstRoute = ({ index }) => {
  
  const [dataAllProjects, setDataAllProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const permissions =
    UserPermissions?.capabilities["projects"]?.permissions || [];
  const isDeletable = permissions.indexOf("delete") != -1;
  const isEditable = permissions.indexOf("edit") != -1;
  const isCreatable = permissions.indexOf("create") != -1;

  const ProjectDetail = ({ item, apiPost }) => {
    const projectTap = () => {
      Navigation.push("AppStack", {
        component: {
          passProps: { item },
          name: "ProjectDetail",
          options: { topBar: { visible: true } },
        },
      });
    };

    return (
      <TouchableOpacity onPress={projectTap}>
        <View
          style={{
            width: ScreenWidth / 1.0 - 50,
            borderColor: AppTheme.BorderColor,
            borderWidth: 1,
            borderRadius: 8,
            marginTop: 16,
            marginEnd: 10,
          }}
        >
          <View style={{ marginLeft: 12, marginTop: 12, flexDirection: "row" }}>
            <Text
              style={{
                flex: 1,
                marginLeft: 5,
                fontSize: 14,
                fontStyle: "normal",
                alignSelf: "center",
              }}
            >
              {item.name}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 16,
              marginTop: 12,
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../Assets/ic_calender.png")}
            />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 12,
                fontStyle: "normal",
                alignSelf: "center",
              }}
            >
              {moment(item.start_date).format("DD-MM-YYYY")}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", marginLeft: 16, marginBottom: 12 }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                Navigation.push("AppStack", {
                  component: {
                    name: "ViewProject",
                    passProps: {
                      projectDetail: item,
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
                    name: "EditNewProject",
                    passProps: {
                      projectDetail: item,
                    },
                  },
                });
              }}
              style={{ justifyContent: "center" }}
            >
              <Text style={{ color: "green" }}>Edit | </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              activeOpacity={0.7}
              onPress={async () => {
                apiDeletePost({
                  id: item.id,
                  uri: APP_URL.BaseUrl + DeleteProjects,
                  // setLoading
                }).then((res) => {
                  console.log("DELETED = ", res);
                  apiPost();
                });
              }}
            >
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setLoading(false);
    apiPost();
  }, []);

  const [sortedDataAllProjects, setSortedDataAllProjects] = useState([]);

  const onSearch = (text) => {
    console.log("TEXT ", text);
    if (text.length > 0) {
      let sorted = dataAllProjects.filter(function (item) {
        console.log(item.name);
        console.log(item.name.toLowerCase().includes(text.toLowerCase()));
        return item.name.toLowerCase().includes(text.toLowerCase());
      });
      setSortedDataAllProjects(sorted);
      return;
    }

    setSortedDataAllProjects(dataAllProjects);
  };
  const apiPost = async (s) => {
    setLoading(true);

    console.log(`url is =`, APP_URL.BaseUrl + GetAllProjects);

    axios
      .get(APP_URL.BaseUrl + GetAllProjects, { keysearch: "" })
      .then((data) => {
        setLoading(false);
        console.log(`DATA = ${JSON.stringify(data.data, null, 2)}`);
        // setApiData([])
        let _index = index || 0;
        let _data = data.data.filter((item, i) => item?.status == _index || 0);
        setDataAllProjects(_data);
        setSortedDataAllProjects(_data);
      })
      .catch((e) => {
        console.log(`Error =`, e);
        setLoading(false);
      });
  };
  return (
    <View style={{ marginLeft: 25 }}>
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
        {/* <TextInput value={searchText} onChangeText={(t) => { setSearchText(t) }} style={{ flex: 1, marginLeft: 10 }} placeholder={"Search"} /> */}
        <TextInput
          style={{ flex: 1, marginLeft: 10 }}
          placeholder={"Search"}
          onChangeText={onSearch}
        />
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
        keyExtractor={(_, index) => String(index)}
        ListHeaderComponent={
          <>
            <FlatList
              renderItem={({ item, index }) => (
                <ProjectDetail item={item} apiPost={apiPost} />
              )}
              data={sortedDataAllProjects}
              keyExtractor={(_, index) => String(index)}
            />
          </>
        }
      />
    </View>
  );
};

const SecondRoute = () => <FirstRoute index={2} />;

const ThirdRoute = () => <FirstRoute index={3} />;

const FourthRoute = () => <FirstRoute index={4} />;
const FifthRoute = () => <FirstRoute index={5} />;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  Third: ThirdRoute,
  Fourth: FourthRoute,

  Fifth: FifthRoute,
});
const renderTabBar = (props) => {
  return (
    <TabBar
      {...props}
      // tabStyle={{}}
      scrollEnabled={true}
      tabStyle={{
        alignItems: "center",
        width: ScreenWidth / 2 - 70,
        height: 40,
        justifyContent: "center",
      }}
      indicatorStyle={{ backgroundColor: AppTheme.PrimaryColor }}
      // indicatorStyle={styles.indicatorStyle}
      // indicatorContainerStyle={{backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
      style={{ backgroundColor: "white", paddingBottom: 5 }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            color: focused ? AppTheme.PrimaryColor : "lightgrey",
            margin: 0,
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {route.title}
        </Text>
      )}
      bounces={true}
    />
  );
};
export function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Not Started" },
    { key: "second", title: "In Progress" },
    { key: "Third", title: "On Hold" },
    { key: "Fourth", title: "Finished" },
    { key: "Fifth", title: "Cancelled" },
  ]);

  return (
    <TabView
      style={{ width: ScreenWidth }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

handleNewProjectPressed = (value, item) => {
  alert(value);
  return;
  if (value === "add") {
    GoToNextController("AddNewProject");
  } else if (value === "edit") {
    alert(value);
    Navigation.push("AppStack", {
      component: {
        name: "EditNewProject",
        passProps: {
          projectDetail: item,
        },
      },
    });
  }
};
const MyProjects = () => {
  const [searchText, setSearchText] = React.useState("");

  const permissions =
    UserPermissions?.capabilities["Project"]?.permissions || [];
  const isDeletable = permissions.indexOf("delete") != -1;
  const isEditable = permissions.indexOf("edit") != -1;
  const isCreatable = permissions.indexOf("create") != -1;

  return (
    <View style={{ flex: 1, marginTop: "5%", alignItems: "center" }}>
      <View style={{ flexDirection: "row", width: "90%" }}>
        <Text style={{ marginLeft: 0, fontSize: 20 }}>Projects</Text>

        {/* {isCreatable ? */}
        <TouchableOpacity
          style={{ alignItems: "flex-end", flex: 1 }}
          onPress={() => {
            GoToNextController("AddNewProject");
          }}
        >
          <Text style={{ fontSize: 20, color: AppTheme.PrimaryColor }}>
            Add Project
          </Text>
        </TouchableOpacity>
        {/* : null} */}
      </View>

      <TabViewExample />
    </View>
  );
};

function calculate(StartTime, EndTime) {
  let startShiftTime = moment(StartTime, ["DD-MM-YYYY h:mm:ss A"]).utcOffset(
    0,
    false
  );

  let endShiftTime = moment(EndTime, ["DD-MM-YYYY h:mm:ss A"]).utcOffset(
    0,
    false
  );

  var TotalSeconds = endShiftTime.diff(startShiftTime, "seconds");

  var hours = Math.floor(TotalSeconds / 3600);
  var minutes = Math.floor((TotalSeconds / 60) % 60);
  var day = Math.floor((minutes / 60) % 60);

  console.log(
    `startShiftTime: ${startShiftTime.format(
      "DD-MM-YYYY h:mm:ss A"
    )} endShiftTime: ${endShiftTime.format(
      "DD-MM-YYYY h:mm:ss A"
    )} hours: ${hours} minutes: ${day}`
  );
}

const TaskDetail = ({ item }) => {
  return (
    <View
      style={{
        width: ScreenWidth - 50,
        height: 120,
        borderColor: AppTheme.BorderColor,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 16,
        marginEnd: 10,
      }}
    >
      <View style={{ marginLeft: 16, marginTop: 12, flexDirection: "row" }}>
        <Text
          style={{
            flex: 1,
            marginLeft: 5,
            fontSize: 14,
            fontStyle: "normal",
            alignSelf: "center",
          }}
        >
          {item.title}
        </Text>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 4,
            backgroundColor: AppTheme.PrimaryColor,
            marginRight: 15,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontStyle: "normal",
              color: "white",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            To Do
          </Text>
        </View>
      </View>

      <View
        style={{
          marginLeft: 16,
          marginTop: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ProgressView
          style={{ flex: 1, height: 12 }}
          progressTintColor={AppTheme.PrimaryColor}
          trackTintColor="lightgray"
          progress={0.7}
        />
        <Text
          style={{
            marginRight: 5,
            fontSize: 13,
            fontStyle: "normal",
            marginStart: 5,
          }}
        >
          75%
        </Text>
      </View>

      <View style={{ marginLeft: 16, marginTop: 12, flexDirection: "row" }}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../Assets/ic_calender.png")}
        />
        <Text
          style={{
            marginLeft: 5,
            fontSize: 12,
            fontStyle: "normal",
            alignSelf: "center",
          }}
        >
          12 Sep 2021
        </Text>
        <Image
          style={{ width: 25, height: 25, marginLeft: 20 }}
          source={require("../Assets/ic_list.png")}
        />
        <Text
          style={{
            marginLeft: 5,
            fontSize: 12,
            fontStyle: "normal",
            alignSelf: "center",
          }}
        >
          12 Tasks
        </Text>
      </View>
    </View>
  );
};

export default MyProjects;
