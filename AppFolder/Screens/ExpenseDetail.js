import React from "react";
import { View, Text } from "react-native";

const ExpenseDetail = (props) => {
  console.log("AppStackAppStackAppis", props);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "#FFB45C",
          width: "90%",
          borderRadius: 5,
          borderColor: "#DFDFDF",
          borderWidth: 2,
          padding: 10,
          marginTop: 20,
        }}
      >
        <View style={{ justifyContent: "space-between", marginTop: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {props.category_name}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {props.expense_name}
          </Text>

          {/* <Text style={{ fontSize: 16, fontWeight: "normal", color: "#539A61", borderWidth: 1, borderColor: "#707070", borderRadius: 3, padding: 5 }}>Closed</Text> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Amount</Text>
          <Text style={{ fontSize: 16, fontWeight: "normal" }}>
            {props.symbol}
            {props.amount}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Date: </Text>
          <Text style={{ fontSize: 16, fontWeight: "normal" }}>
            {props.date}
          </Text>
        </View>

        {/* <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Credit Used</Text>
                    <Text style={{ fontSize: 16, fontWeight: "normal" }}>C$26.00</Text>
                </View>
               
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Refund</Text>
                    <Text style={{ fontSize: 16, fontWeight: "normal" }}>C$26.00</Text>
                </View> */}

        {/* <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Credits Remaining</Text>
                    <Text style={{ fontSize: 16, fontWeight: "normal" }}>C$26.00</Text>
                </View> */}
      </View>
    </View>
  );
};

export default ExpenseDetail;
