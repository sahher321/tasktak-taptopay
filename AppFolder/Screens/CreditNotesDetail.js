import React from "react";
import { View, Text } from "react-native";



const CreditNotesDetails = (props) => {


    console.log("CreditNotesDetailsCreditNotesDetails" , props.item.prefix)

    return (

        <View style={{ flex: 1, alignItems: "center" }}>

            <View style={{ backgroundColor: "#F5F5F5", width: "90%", borderRadius: 5, borderColor: "#DFDFDF", borderWidth: 2, padding: 10, marginTop: 20 }}>

                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{props.item.prefix + props.item.number}</Text>
                    <Text style={{ fontSize: 16, fontWeight: "normal", color: "#539A61", borderWidth: 1, borderColor: "#707070", borderRadius: 3, padding: 5 }}>Closed</Text>
                </View>

                <Text style={{ fontSize: 16, fontWeight: "normal" }}>{props.item.company ? ""  : "N/A"}</Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Bill To: ABC 1234 sound tech drive Chicago Illinoise US 60680 Ship to: 1234 sound tech drive Chicago Illinoise US 60680 </Text>
                <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Credit Note Date:   {props.item.date}</Text>

                <Text style={{
                    fontSize: 14, fontWeight: "normal", lineHeight: 30,
                }}>Reference #: {props.item.reference_no} </Text>

                <Text style={{ fontSize: 14, fontWeight: "normal", lineHeight: 30 }}>Project: Test 123</Text>


            </View>


            <View style={{ backgroundColor: "#FFB45C", width: "90%", borderRadius: 5, borderColor: "#DFDFDF", borderWidth: 2, padding: 10, marginTop: 20 }}>

                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Boys Long Shirt White Size 08 yr 2021</Text>
                    <Text style={{ fontSize: 16, fontWeight: "normal", color: "#539A61", borderWidth: 1, borderColor: "#707070", borderRadius: 3, padding: 5 }}>Closed</Text>
                </View>

               
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 , marginTop : 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Sub Total </Text>
                    <Text style={{ fontSize: 16, fontWeight: "normal" }}>C$26.00</Text>
                </View>
               
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Total </Text>
                    <Text style={{ fontSize: 16, fontWeight: "normal" }}>C$26.00</Text>
                </View>
               
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Credit Used</Text>
                    <Text style={{ fontSize: 16, fontWeight: "normal" }}>C$26.00</Text>
                </View>
               
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Refund</Text>
                    <Text style={{ fontSize: 16, fontWeight: "normal" }}>C$26.00</Text>
                </View>
               
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Credits Remaining</Text>
                    <Text style={{ fontSize: 16, fontWeight: "normal" }}>C$26.00</Text>
                </View>
               

            </View>
        </View>
    )
}


export default CreditNotesDetails
