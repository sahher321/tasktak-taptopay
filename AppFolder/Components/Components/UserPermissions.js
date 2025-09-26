import { getItem, setItem } from "./Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

class USER_PERMISSIONS {
  permissions = [];
  capabilities = {};
  user_data = [];

  constructor() {
    this.retrievePermissions();
    this.retrieveUserData();
  }

  setPermissions(data) {
    this.permissions = data || []; // ✅ fallback to []
    setItem("user-permissions", data || []);
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }

  async retrievePermissions() {
    let data = await getItem("user-permissions");
    console.log("Permissions");
    if (!data) {
      // ✅ proper null check
      this.permissions = [];
      return;
    }
    this.permissions = data;
    console.log(JSON.stringify(data, null, 2));
  }

  setUserData(data) {
    this.user_data = data || [];
    setItem("user-data", data || []);
  }

  async retrieveUserData() {
    let data = await getItem("user-data");
    console.log("user_data");
    if (!data) {
      // ✅ proper null check
      this.user_data = [];
      return;
    }
    this.user_data = data;
    console.log(JSON.stringify(data, null, 2));
  }
}

class USER_DATA {}

const UserPermissions = new USER_PERMISSIONS();

export default UserPermissions;
