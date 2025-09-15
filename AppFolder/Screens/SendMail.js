import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { APP_URL } from "../Components/Api";
import { AppTheme } from "../AppTheme/AppTheme";
import { GoToNextController } from "../Components/General";
import DocumentPicker from "react-native-document-picker";
import UserPermissions from "../Components/UserPermissions";

const SendMail = () => {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [pickedDocument, setPickedDocument] = useState(null);

  const pickDocumentHandle = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      var selectedImage = {
        name: result[0]?.name,
        type: result[0]?.type,
        uri: result[0]?.uri,
      };
      setPickedDocument(selectedImage);
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };
  const sendEmailHandle = () => {
    try {
      if (toEmail == "") {
        alert("Please specify at least one recipient");
      } else if (subject == "") {
        Alert.alert(
          "Alert",
          "Send this message without a subject or text in the body?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => postApiHandle(),
            },
          ],
          { cancelable: false }
        );
      } else {
        postApiHandle();
      }
    } catch (error) {
      console.log("ERROR =====> ", error?.message);
    }
  };
  const postApiHandle = () => {
    try {
      setButtonLoader(true);
      var formdata = new FormData();
      formdata.append("staff_id", UserPermissions.user_data[0].staffid);
      formdata.append("to", toEmail);
      formdata.append("subject", subject);
      formdata.append("message", message);
      formdata.append("attachments", pickedDocument);

      console.log("Mail =======> ", formdata);
      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        `${APP_URL.BaseUrl}/api/StaffMailbox/sendEmailToStaff`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("result =====> ", result);
          setButtonLoader(false);
          if (result?.code === 200) {
            Alert.alert(
              "Alert",
              result?.message,
              [
                {
                  text: "OK",
                  onPress: () => GoToNextController("MailBox"),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert(result?.message);
          }
        })
        .catch((error) => {
          setButtonLoader(false);
          console.log("ERROR =====> ", error?.message);
        });
    } catch (error) {
      setButtonLoader(false);
      console.log("ERROR =====> ", error?.message);
    }
  };

  return (
    <View style={styles.maincontainer}>
      <ScrollView>
        <View>
          <Text style={styles.labelText}>New Message</Text>
        </View>
        <View style={{ marginTop: 22 }}>
          <Text style={{ fontSize: 14, color: "#000", marginBottom: 5 }}>
            To
          </Text>
          <TextInput
            value={toEmail}
            multiline={true}
            placeholder={"To"}
            onChangeText={(txt) => setToEmail(txt)}
            style={{
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 6,
              paddingHorizontal: 12,
            }}
          />
        </View>
        <View style={{ marginTop: 22 }}>
          <Text style={{ fontSize: 14, color: "#000", marginBottom: 5 }}>
            Suject
          </Text>
          <TextInput
            value={subject}
            multiline={true}
            placeholder={"Suject"}
            onChangeText={(txt) => setSubject(txt)}
            style={{
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 6,
              paddingHorizontal: 12,
            }}
          />
        </View>
        <View style={{ marginTop: 22 }}>
          <Text style={{ fontSize: 14, color: "#000", marginBottom: 5 }}>
            Message
          </Text>
          <TextInput
            value={message}
            multiline={true}
            placeholder={"Message"}
            onChangeText={(txt) => setMessage(txt)}
            style={{
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 6,
              paddingHorizontal: 12,
              paddingBottom: 120,
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={pickDocumentHandle}
          style={{
            flexDirection: "row",
            paddingVertical: 12,
            paddingHorizontal: pickedDocument === null ? 0 : 12,
            borderRadius: 4,
            marginTop: pickedDocument === null ? 0 : 12,
            backgroundColor:
              pickedDocument === null ? "transparent" : "#f5f5f5",
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Image
              style={{ height: 26, width: 26, resizeMode: "cover" }}
              source={require("../Assets/attachment-icon.png")}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "center", paddingLeft: 12 }}>
            <Text style={{ fontSize: 14, color: "#000", marginBottom: 5 }}>
              {pickedDocument === null ? "Attach files" : pickedDocument?.name}
            </Text>
          </View>
          {pickedDocument !== null ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setPickedDocument(null)}
              style={{ justifyContent: "center", paddingLeft: 16 }}
            >
              <Image
                source={require("../Assets/close-icon.png")}
                style={{ height: 18, width: 18, resizeMode: "cover" }}
              />
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={sendEmailHandle}
          style={{
            width: "70%",
            backgroundColor: AppTheme.PrimaryColor,
            marginTop: 20,
            height: 42,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          {buttonLoader ? (
            <ActivityIndicator size={"small"} color={"#FFF"} />
          ) : (
            <Text style={{ color: "white" }}>Send</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginTop: 15,
  },
  textAreaC: {
    height: 120,
    justifyContent: "flex-start",
  },
  dflex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  labelText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  maincontainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  textarea: {
    marginTop: 10,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 4,
    padding: 10,
  },
  MarginTop: {
    marginTop: 20,
  },
  para: {
    fontSize: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  checkedBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  checkText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  checkmain: {
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
  },
});

export default SendMail;
