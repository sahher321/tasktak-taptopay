import React from 'react';
import {Dimensions, View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import UserPermissions from './UserPermissions';
import { GoToNextController } from './General';

let allowedFeatures = [
    "Customer", "MailBox", "Contact", "Invoice",
    "Lead", "Staffs", "Project", "Task", "Ticket", 
    "TimeSheet", "Appointly", "Payroll", "Proposals"
];
let AllPermissionsData = [
    { feature_name: "Client", icon: require("../Assets/Dashboard/ic_0.png"), },
    { feature_name: "MailBox", icon: require("../Assets/Dashboard/ic_1.png"), },
    { feature_name: "Invoice", icon: require("../Assets/Dashboard/ic_3.png"), },
    { feature_name: "Lead", icon: require("../Assets/Dashboard/ic_4.png"), },
    //  { feature_name: "Milestone", icon: require("../Assets/Dashboard/ic_5.png"), },
    { feature_name: "Staffs", icon: require("../Assets/Dashboard/ic_6.png"), },
    { feature_name: "Project", icon: require("../Assets/Dashboard/ic_7.png"), },
    { feature_name: "Task", icon: require("../Assets/Dashboard/ic_8.png"), },
    { feature_name: "Ticket", icon: require("../Assets/Dashboard/ic_9.png"), },
    //    { feature_name: "Credit Notes", icon: require("../Assets/Dashboard/ic_10.png"), },
    // { feature_name: "Estimates", icon: require("../Assets/Dashboard/ic_11.png"), },
    { feature_name: "TimeSheet", icon: require("../Assets/Dashboard/ic_12.png"), },
    //    { feature_name: "Expenses", icon: require("../Assets/Dashboard/ic_13.png"), },
    { feature_name: "Appointly", icon: require("../Assets/Dashboard/ic_14.png"), },
    { feature_name: "PayRoll", icon: require("../Assets/Dashboard/ic_14.png"), },
    { feature_name: "Proposals", icon: require("../Assets/Dashboard/ic_15.png"), },
];

const SideBar = (props) => {
    const {isModalVisible, toggleModal} = props;
    const {width, height} = Dimensions.get('window');

    const DashBoardCell = ({item, index}) => {
        const handleIconPress = () => {
            toggleModal();
            if (item.feature_name == "Project") {
                GoToNextController("MyProjects")
            } else if (item.feature_name == "MailBox") {
                GoToNextController("MailBox")
            } else if (item.feature_name == "Staffs") {
                GoToNextController("Staff")
            } else if (item.feature_name == "Lead") {
                GoToNextController("Lead")
            } else if (item.feature_name == "Task") {
                GoToNextController("AllProjects")
            } else if (item.feature_name == "TimeSheet") {
                GoToNextController("Attendance")
            } else if (item.feature_name == "Invoice") {
                GoToNextController("Invoice")
            } else if (item.feature_name == "Expenses") {
                GoToNextController("Expenses")
            } else if (item.feature_name == "Credit Notes") {
                GoToNextController("CreditNotes")
            } else if (item.feature_name == "Ticket") {
                GoToNextController("Tickets")
            } else if (item.feature_name == "Client" || item.feature_name == "Customer") {
                if (item.feature_name == "Customer") {
                    Navigation.push("AppStack", { component: { name: "Contacts", passProps: { permissions: capabilities["Customer"].permissions }, options: { topBar: { visible: true } } } });
                    return;
                }
                GoToNextController("Contacts")
            } else if (item.feature_name == "Appointly") {
                GoToNextController("Appointly")
            } else if (item.feature_name == "Proposals") {
                GoToNextController("Proposals")
            }
        };

        return (
            <TouchableOpacity
                key={index}
                activeOpacity={.7}
                onPress={handleIconPress}
                style={{flexDirection:"row",marginTop:20,marginBottom:12}}>
                <View style={{justifyContent:"center"}}>
                    <Image 
                        style={{width:28,height:28,resizeMode:"contain",tintColor:"#000000"}}
                        source={UserPermissions.permissions.length == 0 ? item.icon : {uri: item.icon}}
                    />
                </View>
                <View style={{flex:1,justifyContent:"center",marginLeft:12}}>
                    <Text style={{fontSize:14,color:"#000000",fontWeight:"bold"}}>
                        {item.feature_name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        // <View style={{flex:1}}>
        <Modal
            style={{margin:0}}
            height={height}
            width={width / 1.5}
            isVisible={isModalVisible}
            statusBarTranslucent={true}
            swipeDirection="left"
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            onBackdropPress={toggleModal}>
            {/* <View style={{flex:1,backgroundColor:'#FFF',paddingTop:16}}> */}
                <FlatList
                    style={{flex:1,backgroundColor:'#FFF',paddingTop:16,paddingVertical:30,paddingHorizontal:20}}
                    ListHeaderComponent={() => (
                        <View>
                            <Image
                                source={require("../Assets/logo.png")}
                                style={{width:180,height:60,resizeMode:"cover",marginBottom:12}}
                            />
                        </View>
                    )}
                    renderItem={({item, index}) => (<DashBoardCell item={item} index={index} />)}
                    data={UserPermissions?.permissions?.length != undefined && UserPermissions.permissions.length == 0 ? AllPermissionsData :
                    UserPermissions.permissions.filter((item, index) => ((item?.capability == "view" && allowedFeatures.indexOf(item.feature_name) != -1) || (item?.capability == "view_own" && item?.feature_name != "")))}
                />
            {/* </View> */}
        </Modal>
        // </View>
  );
};

export default SideBar;
