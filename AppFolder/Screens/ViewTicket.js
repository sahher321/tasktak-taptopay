import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import {Navigation} from "react-native-navigation";
import { AppTheme } from '../AppTheme/AppTheme';
import { APP_URL, GetTicketDetail, } from '../Components/Api';

const ViewTicket = (props) => {
    const {ticektID} = props;
    const [ticketDetail, setTicketDetail] = useState({});

    useEffect(() => {
        getTicketDataHandle();
    }, []);
    const getTicketDataHandle = () => {
        try {
            var myHeaders = new Headers();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(APP_URL.BaseUrl + GetTicketDetail+ticektID, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTicketDetail(result);
            }).catch((error) => {
                console.log('error', error);
            });
        } catch (error) {
            console.log("ERROR =====> ", error?.message);
        }
    };
   
    return (
        <ScrollView>
            <View style={{ flex: 1, marginVertical: '5%',paddingHorizontal: 20 }}>
                <View style={{marginTop:"2%"}}>
                    <Text style={{ fontSize: 20, fontWeight:"bold", color: AppTheme.PrimaryColor }}>Ticket Detail</Text>
                </View>
                <View style={{flex:1,paddingTop:"6%"}}>
                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Department:</Text>
                    <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{ticketDetail?.department_name === "" ? "------" : ticketDetail?.department_name}</Text>
                </View>
                <View style={{flex:1,paddingTop:"6%"}}>
                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Subject:</Text>
                    <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{ticketDetail?.subject === "" ? "------" : ticketDetail?.subject}</Text>
                </View>
                <View style={{flex:1,paddingTop:"8%"}}>
                    <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Message:</Text>
                    <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{ticketDetail?.message === "" ? "------" : ticketDetail?.message}</Text>
                </View>
                <View style={{flexDirection:'row',paddingTop: "8%"}}>
                    <View style={{flex:1,}}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Priority:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{ticketDetail?.priority_name === "" ? "------" : ticketDetail?.priority_name}</Text>
                    </View>
                    <View style={{flex:1,}}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Status:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{ticketDetail?.status_name === "" ? "------" : ticketDetail?.status_name}</Text>
                    </View>
                </View> 
                <View style={{flexDirection:'row',paddingTop: "8%"}}>
                    <View style={{flex:1,}}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>User Name:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{ticketDetail?.user_firstname +" "+ ticketDetail?.user_lastname}</Text>
                    </View>
                    <View style={{flex:1,}}>
                        <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor }}>Staff Name:</Text>
                        <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{ticketDetail?.staff_firstname +" "+ ticketDetail?.staff_lastname}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ViewTicket;



