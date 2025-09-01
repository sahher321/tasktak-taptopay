import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, ScrollView, StyleSheet} from 'react-native';
import {AppTheme} from '../AppTheme/AppTheme';
import {Navigation} from "react-native-navigation";
import { APP_URL } from '../Components/Api';
import moment from 'moment';


const tabsData = [
    {id: 1, title: "Profile"},
    {id: 2, title: "Projects"},
    {id: 8, title: "Invoices"},
    {id: 5, title: "Task"},
    // {id: 9, title: "Taks"},
    // {id: 3, title: "Notes"},
    // {id: 4, title: "Statement"},
    // {id: 6, title: "Payments"},
    // {id: 7, title: "Proposals"},
];

const ViewClient = (props) => {
    const {clientDetail} = props;
    const [tabActive, setTabActive] = useState(0);
    const [contactsData, setContactsData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [invoiceData, setInvoiceData] = useState([]);
    const [taskData, setTaskData] = useState([]);


    console.log("Console Detail",clientDetail)
    var Client_id = clientDetail?.userid;
    console.log("Console id",clientDetail.userid)
    console.log('project Data ===>',projectData)
    console.log('Task Data ===>',taskData)
    console.log('Invoice Data ===>',invoiceData)

    useEffect(() => {
        getClientProjects();
        getClientTask();
        getClientInvoice();
    }, []);
    const handleNewCleintPressed = () => {
        Navigation.push("AppStack", {
            component: {
                name: 'EditClient',
                passProps: {
                    clientDetail: clientDetail,
                },
            },
        });
    };
    const getClientProjects = () => {
        try {
            var myHeaders = new Headers();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(APP_URL.BaseUrl + `/api/Clients/getprojects?clientid=${Client_id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result?.code === 200) {
                    setProjectData(result?.data);
                }
            }).catch((error) => {
                console.log('error', error);
            });
        } catch (error) {
            console.log(error?.message);
        }
    };
    const getClientTask = () => {
        try {
            var myHeaders = new Headers();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(APP_URL.BaseUrl + `/api/Clients/gettasks/?clientid=${Client_id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result?.code === 200) {
                    setTaskData(result?.data);
                }
            }).catch((error) => {
                console.log('error', error);
            });
        } catch (error) {
            console.log(error?.message);
        }
    };
    const getClientInvoice = () => {
        try {
            var myHeaders = new Headers();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(APP_URL.BaseUrl + `/api/Clients/getinvoices/?clientid=${Client_id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result?.code === 200) {
                    setInvoiceData(result?.data);
                }
            }).catch((error) => {
                console.log('error', error);
            });
        } catch (error) {
            console.log(error?.message);
        }
    };
   
    return (
        <ScrollView>
            <View style={{ flex: 1, marginVertical: '5%'}}>
                <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                    <View style={{flex:1,justifyContent:"center"}}>
                        <Text style={{ fontSize: 20 }}>Client</Text>
                    </View>
                    <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "flex-end", }} onPress={()=> handleNewCleintPressed()}>
                        <Text style={{ fontSize: 20, color: AppTheme.PrimaryColor }}>Edit Client</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    { tabsData?.map((val, key) => {
                        return (
                            <TouchableOpacity
                                key={key}
                                activeOpacity={.7}
                                onPress={() => setTabActive(key)}
                                style={{marginTop:16,backgroundColor:tabActive===key?"#EEE":"transparent",marginLeft:key===0?20:0,borderRadius:tabActive===key?6:0,paddingHorizontal:20,paddingVertical:10}}>
                                <Text style={{fontSize:13,color:tabActive===key?"#4967ff":"#000",fontFamily:'Prompt-Medium'}}>
                                    {val?.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                {tabActive===0?
                    <View style={{paddingHorizontal:20}}>
                        <View style={{marginTop: "4%", paddingTop: "4%",borderTopColor:"#ccc", borderTopWidth:1}}>
                            <Text style={{ fontSize: 20, fontWeight:"bold", color: AppTheme.PrimaryColor }}>Client Detail</Text>
                        </View>
                        <View style={{flexDirection:'row',paddingTop: "6%"}}>
                            <View style={{flex:1,justifyContent:"center"}}>
                                <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Company Name:</Text>
                                <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{clientDetail?.company === null ? "------" : clientDetail?.company}</Text>
                            </View>
                            <View style={{flex:1,justifyContent:"center"}}>
                                <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Phone Number:</Text>
                                <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{clientDetail?.phonenumber === null ? "------" : clientDetail?.phonenumber}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',paddingTop: "8%"}}>
                            <View style={{flex:1,}}>
                                <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Website:</Text>
                                <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{clientDetail?.website === null ? "------" : clientDetail?.website}</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Address:</Text>
                                <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{clientDetail?.address === null ? "------" : clientDetail?.address}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',paddingTop: "8%"}}>
                            <View style={{flex:1,}}>
                                <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>City:</Text>
                                <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{clientDetail?.city === null ? "------" : clientDetail?.city}</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>State:</Text>
                                <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{clientDetail?.state === null ? "------" : clientDetail?.state}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',paddingTop: "8%"}}>
                            <View style={{flex:1,}}>
                                <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Zip:</Text>
                                <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{clientDetail?.zip === null ? "------" : clientDetail?.zip}</Text>
                            </View>
                        </View>
                       
                        
                    </View>
                :tabActive===1?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {Array.isArray(projectData) && projectData.length > 0 ? (
                <View style={styles.tableHeaderMain}>
                    <View style={{ flex: .2, justifyContent: 'center' }}>
                        <Text style={styles.tableHeaderText}>S No</Text>
                    </View>
                    <View style={{ flex: .5, justifyContent: 'center' }}>
                        <Text style={styles.tableHeaderText}>Name</Text>
                    </View>
                    <View style={{ flex: .4, justifyContent: 'center' }}>
                        <Text style={styles.tableHeaderText}>S Date</Text>
                    </View>
                    <View style={{ flex: .4, justifyContent: 'center' }}>
                        <Text style={styles.tableHeaderText}>D Date</Text>
                    </View>
                    {/* <View style={{ flex: .5, justifyContent: 'center' }}>
                        <Text style={styles.tableHeaderText}>Members</Text>
                    </View> */}
                    <View style={{ flex: .4, justifyContent: 'center' }}>
                        <Text style={styles.tableHeaderText}>Status</Text>
                    </View>
                </View>
                 ) : null}
                {Array.isArray(projectData) && projectData.length > 0 ? (
projectData.map((val, key) => {
const even = key % 2 === 0;
const lastIndex = projectData.length - 1 === key;
return (
<View
key={key}
style={[
  styles.tableRowMain,
  {
    borderBottomLeftRadius: lastIndex ? 8 : 0,
    borderBottomRightRadius: lastIndex ? 8 : 0,
    backgroundColor: even ? "rgba(0,0,0,.05)" : "#FFF",
  },
]}
>
<View style={{ flex: 0.2, justifyContent: 'center' }}>
  <Text style={styles.tableRowText}>{key + 1}</Text>
</View>
<View style={{ flex: 0.5, justifyContent: 'center' }}>
  <Text style={styles.tableRowText}>{val?.name}</Text>
</View>
<View style={{ flex: 0.4, justifyContent: 'center' }}>
  <Text style={styles.tableRowText}>{moment(val?.startdate).format('dd-mm-yyyy')}
</Text>
</View>
<View style={{ flex: 0.4, justifyContent: 'center' }}>
  <Text style={styles.tableRowText}>{val?.deadline}</Text>
</View>
{/* <View style={{ flex: 0.5, justifyContent: 'center' }}>
  <Text style={styles.tableRowText}>{val?.note}</Text>
</View> */}
<View style={{ flex: 0.4, justifyContent: 'center' }}>
  <Text style={styles.tableRowText}>
    {val?.status === "1"
      ? "Not Started"
      : val?.status === "2"
      ? "Awaiting Feedback"
      : val?.status === "3"
      ? "Testing"
      : val?.status === "4"
      ? "In Progress"
      : val?.status === "5"
      ? "Completed"
      : val?.status === "6"
      ? "On Hold"
      : null}
  </Text>
</View>
</View>
);
})
) : (
<View>
<Text  style={{ alignItems: 'center' }}>No project yet</Text>
</View>
)}

            </View>
             :tabActive===3?
             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             {Array.isArray(taskData) && taskData.length > 0 ? (
             <View style={styles.tableHeaderMain}>
                 <View style={{ flex: .2, justifyContent: 'center' }}>
                     <Text style={styles.tableHeaderText}>S No</Text>
                 </View>
                 <View style={{ flex: .5, justifyContent: 'center' }}>
                     <Text style={styles.tableHeaderText}>Task</Text>
                 </View>
                 <View style={{ flex: .4, justifyContent: 'center' }}>
                     <Text style={styles.tableHeaderText}>S Date</Text>
                 </View>
                 <View style={{ flex: .4, justifyContent: 'center' }}>
                     <Text style={styles.tableHeaderText}>D Date</Text>
                 </View>
                 {/* <View style={{ flex: .5, justifyContent: 'center' }}>
                     <Text style={styles.tableHeaderText}>Members</Text>
                 </View> */}
                 <View style={{ flex: .4, justifyContent: 'center' }}>
                     <Text style={styles.tableHeaderText}>Status</Text>
                 </View>
             </View>
              ) : null}
             {Array.isArray(taskData) && taskData.length > 0 ? (
taskData.map((val, key) => {
const even = key % 2 === 0;
const lastIndex = taskData.length - 1 === key;
return (
<View
key={key}
style={[
styles.tableRowMain,
{
 borderBottomLeftRadius: lastIndex ? 8 : 0,
 borderBottomRightRadius: lastIndex ? 8 : 0,
 backgroundColor: even ? "rgba(0,0,0,.05)" : "#FFF",
},
]}
>
<View style={{ flex: 0.2, justifyContent: 'center' }}>
<Text style={styles.tableRowText}>{key + 1}</Text>
</View>
<View style={{ flex: 0.5, justifyContent: 'center' }}>
<Text style={styles.tableRowText}>{val?.name.split(' ').slice(0, 3).join(' ')}{val?.name.split(' ').length > 3 ? ' ...' : ''}
</Text>
</View>
<View style={{ flex: 0.4, justifyContent: 'center' }}>
<Text style={styles.tableRowText}>{moment(val?.startdate).format('DD-MM-YY')}</Text>
</View>
<View style={{ flex: 0.4, justifyContent: 'center' }}>
<Text style={styles.tableRowText}>{moment(val?.duedate).format('DD-MM-YY')}</Text>
</View>
{/* <View style={{ flex: 0.5, justifyContent: 'center' }}>
<Text style={styles.tableRowText}>{val?.note}</Text>
</View> */}
<View style={{ flex: 0.4, justifyContent: 'center' }}>
<Text style={styles.tableRowText}>
 {val?.status === "1"
   ? "Not Started"
   : val?.status === "2"
   ? "Awaiting Feedback"
   : val?.status === "3"
   ? "Testing"
   : val?.status === "4"
   ? "In Progress"
   : val?.status === "5"
   ? "Completed"
   : val?.status === "6"
   ? "On Hold"
   : null}
</Text>
</View>
</View>
);
})
) : (
<View>
<Text  style={{ alignItems: 'center' }}>No task yet</Text>
</View>
)}

         </View>     
                :tabActive===2?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {Array.isArray(invoiceData) && invoiceData.length > 0 ? (
                        <View style={styles.tableHeaderMain}>
                            {/* <View style={{ flex: .2, justifyContent: 'center' }}>
                                <Text style={styles.tableHeaderText}>S No</Text>
                            </View> */}
                            <View style={{ flex: .5, justifyContent: 'center' }}>
                                <Text style={styles.tableHeaderText}>Name</Text>
                            </View>
                            <View style={{ flex: .4, justifyContent: 'center' }}>
                                <Text style={styles.tableHeaderText}>Total</Text>
                            </View>
                            <View style={{ flex: .4, justifyContent: 'center' }}>
                                <Text style={styles.tableHeaderText}>D Date</Text>
                            </View>
                            
                            <View style={{ flex: .4, justifyContent: 'center' }}>
                                <Text style={styles.tableHeaderText}>Status</Text>
                            </View>
                        </View>
                         ) : null}
                        {Array.isArray(invoiceData) && invoiceData.length > 0 ? (
  invoiceData.map((val, key) => {
    const even = key % 2 === 0;
    const lastIndex = invoiceData.length - 1 === key;
    return (
      <View
        key={key}
        style={[
          styles.tableRowMain,
          {
            borderBottomLeftRadius: lastIndex ? 8 : 0,
            borderBottomRightRadius: lastIndex ? 8 : 0,
            backgroundColor: even ? "rgba(0,0,0,.05)" : "#FFF",
          },
        ]}
      >
       
        <View style={{ flex: 0.5, justifyContent: 'center' }}>
          <Text style={styles.tableRowText}>{val?.prefix}+{val?.number}</Text>
        </View>
        <View style={{ flex: 0.4, justifyContent: 'center' }}>
          <Text style={styles.tableRowText}>${val?.total}</Text>
        </View>
        <View style={{ flex: 0.4, justifyContent: 'center' }}>
          <Text style={styles.tableRowText}>{moment(val?.duedate).format('DD-MM-YY')}</Text>
        </View>
     
        <View style={{ flex: 0.4, justifyContent: 'center' }}>
          <Text style={styles.tableRowText}>
            {val?.status === "1"
              ? "Not Started"
              : val?.status === "2"
              ? "Awaiting Feedback"
              : val?.status === "3"
              ? "Testing"
              : val?.status === "4"
              ? "In Progress"
              : val?.status === "5"
              ? "Completed"
              : val?.status === "6"
              ? "On Hold"
              : null}
          </Text>
        </View>
      </View>
    );
  })
) : (
    <View>
      <Text  style={{ alignItems: 'center' }}>No Invoice yet</Text>
    </View>
)}

                    </View>
                :null}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tableHeaderMain: {
        flexDirection: "row",
        marginTop: 14,
        backgroundColor: "#FFF",
        marginHorizontal: 14,
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomColor: "#dee2e6",
        borderBottomWidth: 1,
        shadowColor: "#EEEEEE",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    tableHeaderText: {
        color: "#000",
        fontFamily: 'Prompt-Medium',
        fontSize: 14,
    },
    tableRowMain: {
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,.05)",
        marginHorizontal: 14,
        paddingHorizontal: 12,
        paddingVertical: 14,
        // shadowColor: "#EEEEEE",
        // shadowOffset: {
        //   width: 0,
        //   height: 6,
        // },
        // shadowOpacity: 0.37,
        // shadowRadius: 7.49,
        // elevation: 12,
    },
    tableRowText: {
        color: "#212529",
        fontFamily: 'Prompt-Light',
        fontSize: 12,
    },
})

export default ViewClient;
