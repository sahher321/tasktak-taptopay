import axios from "axios";
import { Alert } from "react-native";

export const apiDeletePost = async (options) => {
  return new Promise((resolve, reject) => {
    // console.log(`delte data func =`, DeleteCustomer + id)
    function _setLoading(bool) {
      if (options?.setLoading) options?.setLoading(bool);
    }
    async function callApi() {
      _setLoading(true);

      console.log("apiDeletePostapiDeletePost", options?.uri + options?.id);

      axios
        .delete(options?.uri + options?.id)
        .then((data) => {
          console.log(`Staff DATA = ${JSON.stringify(data.data, null, 2)}`);
          //  console.log(`delte data func =`, DeleteCustomer + item.id)
          _setLoading(false);
          alert(data.data.message);
          resolve(true);
        })
        .catch((e) => {
          _setLoading(false);
          console.log(`Error =`, e);
          resolve(false);
        });
    }

    Alert.alert("Are you sure, You want to delete?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          callApi();
        },
      },
    ]);
  });
};
