import React from "react";
import {
  Dimensions,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { Navigation } from "react-native-navigation";
import Toast from "react-native-simple-toast";



export const ScreenWidth = Dimensions.get("screen").width;
export const Screenheight = Dimensions.get("screen").height;

export const GoToNextController = (VcName) => {
  Navigation.push("AppStack", {
    component: { name: VcName, options: { topBar: { visible: true } } },
  });
};

export const CustomTextfield = ({
  style,
  placeholder,
  isSecure,
  image,
  value,
  setValue,
}) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 40,
        borderRadius: 5,
        borderColor: "lightgray",
        borderWidth: 1,
        ...style,
      }}
    >
      <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={image} />
      <TextInput
        value={value}
        onChangeText={(t) => {
          setValue(t);
        }}
        style={{ width: "60%", marginLeft: 10 }}
        placeholder={placeholder}
        secureTextEntry={isSecure}
      />
    </View>
  );
};

export const CustomTextfieldWithRIcon = ({
  style,
  placeholder,
  image,
  value,
  setValue,
}) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 40,
        borderRadius: 5,
        borderColor: "lightgray",
        borderWidth: 1,
        ...style,
      }}
    >
      <TextInput
        value={value}
        onChangeText={(t) => {
          setValue(t);
        }}
        style={{ width: "85%", marginLeft: 10 }}
        placeholder={placeholder}
      />
      <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={image} />
    </View>
  );
};

export const CustomTextfieldBlank = ({
  style,
  placeholder,
  isSecure,
  value,
  setValue,
}) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 40,
        borderRadius: 5,
        borderColor: "lightgray",
        borderWidth: 1,
        ...style,
      }}
    >
      <TextInput
        value={value}
        onChangeText={(t) => {
          setValue(t);
        }}
        style={{ width: "60%", marginLeft: 10 }}
        placeholder={placeholder}
        secureTextEntry={isSecure}
      />
    </View>
  );
};

export const ShowToast = (message) => {
  Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
};
