import axios from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Button, TextView, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ToastAndroid, AsyncStorage } from "react-native";
import { Navigation } from "react-native-navigation";
import { AppTheme } from "../AppTheme/AppTheme";
import { APP_URL, BaseUrl, GetSignin, setItem } from "../Components/Api";
import { toHome } from "../Components/AppRoutes";
import { CustomTextfield, GoToNextController, ShowToast } from "../Components/General";
import { AppGrayColor } from "./Signup";
import SearchableDropdown from 'react-native-searchable-dropdown';

const CompanyName = () => {

  const [password, setPassword] = useState('')
  const [userName, setuserName] = useState('')
  const [getUserData, setUserData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [GetComapanyName, setComapanyName] = useState([]);

  useEffect(() => {
    fetch('https://app.tasktak.com/api/Authentication/getCompaines')
      .then((response) => response.json())
      .then((responseJson) => {
        //Successful response from the API Call
        console.error("responseJson.results", responseJson.data);

        setServerData(responseJson.data.map((item, index) => {
          item.id = item.company_id,
            item.name = item.company_name
          return item;
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomSearchable data={serverData} />
    </SafeAreaView>
  )
}

export default CompanyName

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});



class CustomSearchable extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedItems: {},
      baseUrl: "",
    }
  }
  render() {
    return (
      <>
        <View style={{ marginTop: "20%", alignItems: "center" }}>
          <Image style={{ width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, position: "absolute", top: -150, right: 0, marginLeft: 10 }} resizeMode="stretch" source={require("../Assets/Mask.png")} />

          <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 20 }}>Welcome</Text>
          <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 15 }}>Enter Company Name To Continue</Text>

        </View>
        {/* Multi */}
        <SearchableDropdown
          multi={false}
          selectedItems={this.state.selectedItems}
          onItemSelect={(item) => {
            const items = this.state.selectedItems;
            // items.push(item)
            this.setState({ selectedItems: { ...item } });
            APP_URL.changeAndSaveBaseUrl(item.base_url)
            console.log("ITEM = ", JSON.stringify(item, null, 2));
            console.log("item.base_urlitem.base_url", item.base_url);
            this.setState({
              baseUrl: item.base_url,
            })

            // BaseUrl =  item.base_url
            //    setComapanyName(item.name)

            // CacheStore('valuefor', 'value'); // Expires in 10 minutes

            // CacheStore.get('valuefor').then((value) => {
            //     // Do something with value
            //   });

          }}
          containerStyle={{ paddingHorizontal: 50, marginTop: 100 }}
          onRemoveItem={(item, index) => {
            const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
            this.setState({ selectedItems: items });
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{ color: '#222' }}
          itemsContainerStyle={{ maxHeight: 140 }}
          items={this?.props?.data || []}
          defaultIndex={2}
          chip={true}
          resetValue={false}
          textInputProps={
            {
              placeholder: "Company Name",
              underlineColorAndroid: "transparent",
              style: {
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              },
              onTextChange: text => { }
            }
          }
          listProps={
            {
              nestedScrollEnabled: true,
            }
          }
        />


        <TouchableOpacity 
        style={{ marginHorizontal: 80, width: "60%", backgroundColor: AppTheme.PrimaryColor, marginTop: 50, height: 42, borderRadius: 6, alignItems: "center", justifyContent: "center" }} onPress={() => {

          // if (GetComapanyName.length == 0){
          //     console.log("userName.length")

          //      ShowToast("Please enter company Name")


          //  }

          // else
          // {
          //     GoToNextController("Signin")

          // }
          if (this.state.baseUrl === "") {
            ShowToast("Please enter company Name")
          } else {
            GoToNextController("Signin")
          }



          //Navigation.push("AppStack",{component:{name:"Dashboard" , options: {  topBar: { backButton:{ visible: false}, visible: true , title : { text : "Dashboard"} } } } })
        }}>
          <Text style={{ color: "white", fontSize: 18 }}>
            Next
          </Text>
        </TouchableOpacity>
        {/* Single */}

      </>
    );
  }
}