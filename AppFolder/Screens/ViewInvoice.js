import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { AppTheme } from '../AppTheme/AppTheme';
import { APP_URL, GetInvoiceDetail } from '../Components/Api';

const ViewInvoice = (props) => {
    const {invoiceDetail} = props;
    const [loader, setLoader] = useState(true);
    const [dataSource, setDataSource] = useState({});

    useEffect(() => {
        getInvoiceDetailHandle();
    }, []);
    const getInvoiceDetailHandle = () => {
        try {
            setLoader(true);
            var myHeaders = new Headers();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(APP_URL.BaseUrl+GetInvoiceDetail+invoiceDetail?.id, requestOptions)
            .then(response => response.json())
            .then((result) => {
                setLoader(false);
                setDataSource(result);
            }).catch((error) => {
                setLoader(false);
                console.log("ERROR =====> ", error?.message);
            });
        } catch (error) {
            setLoader(false);
            console.log("ERROR =====> ", error?.message);
        }
    };

    if (loader) {
        return (
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size={"small"} />
            </View>
        )
    } else {
        return (
            <ScrollView>
                <View style={{ flex: 1, marginVertical: '5%',paddingHorizontal: 20 }}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 20, fontWeight:"bold", color: AppTheme.PrimaryColor }}>Invoice Detail</Text>
                        </View>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 16, fontWeight:"bold", color: AppTheme.PrimaryColor, textTransform: 'uppercase', textAlign: "right" }}>{`${dataSource?.prefix} ${dataSource?.number}`}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",marginTop:12,backgroundColor:"#CCC",paddingVertical:12,borderBottomColor:"#ccc",borderBottomWidth:1,borderTopLeftRadius:8,borderTopRightRadius:8}}>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 14, fontWeight:"bold", color: AppTheme.PrimaryColor, textTransform: 'capitalize', textAlign: "center" }}>
                                description
                            </Text>
                        </View>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 14, fontWeight:"bold", color: AppTheme.PrimaryColor, textTransform: 'capitalize', textAlign: "center" }}>
                                quantity
                            </Text>
                        </View>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 14, fontWeight:"bold", color: AppTheme.PrimaryColor, textTransform: 'capitalize', textAlign: "center" }}>
                                price
                            </Text>
                        </View>
                    </View>
                    {dataSource?.items?.map((val, key) => {
                        return (
                            <View key={key} style={{flexDirection:"row",backgroundColor:"#EEEEEE",paddingVertical:12,borderBottomColor:"#ccc",borderBottomWidth:dataSource?.items.length-1===key?0:1,borderBottomLeftRadius:dataSource?.items.length-1===key?8:0,borderBottomRightRadius:dataSource?.items.length-1===key?8:0}}>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{ fontSize: 14, fontWeight:"bold", color: AppTheme.PrimaryColor, textTransform: 'capitalize', textAlign: "center" }}>
                                        {val?.description}
                                    </Text>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{ fontSize: 14, fontWeight:"bold", color: AppTheme.PrimaryColor, textTransform: 'capitalize', textAlign: "center" }}>
                                        {val?.qty}
                                    </Text>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{ fontSize: 14, fontWeight:"bold", color: AppTheme.PrimaryColor, textTransform: 'capitalize', textAlign: "center" }}>
                                        {val?.rate}
                                    </Text>
                                </View>
                            </View>
                        )
                    })}
                    <View style={{flexDirection:'row',paddingTop:"6%"}}>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontWeight: "bold" }}>
                                Subtotal:
                            </Text>
                        </View>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontWeight: "bold", textAlign:"right" }}>
                                {dataSource?.subtotal}
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingTop:"4%"}}>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontWeight: "bold" }}>
                                Total Tax:
                            </Text>
                        </View>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontWeight: "bold", textAlign:"right" }}>
                                {dataSource?.total_tax}
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingTop:"4%"}}>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontWeight: "bold" }}>
                                Adjustment:
                            </Text>
                        </View>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontWeight: "bold", textAlign:"right" }}>
                                {dataSource?.adjustment}
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingTop:"4%"}}>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontWeight: "bold" }}>
                                Discount:
                            </Text>
                        </View>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 16, color: AppTheme.PrimaryColor, fontWeight: "bold", textAlign:"right" }}>
                                {dataSource?.discount_total}
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:"4%",paddingTop:"4%",borderTopColor:"#ccc",borderTopWidth:1}}>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 22, color: AppTheme.PrimaryColor, fontWeight: "bold" }}>
                                Total:
                            </Text>
                        </View>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{ fontSize: 22, color: AppTheme.PrimaryColor, fontWeight: "bold", textAlign:"right" }}>
                                {dataSource?.total}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
};

export default ViewInvoice;
