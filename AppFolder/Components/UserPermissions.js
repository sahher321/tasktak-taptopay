import { getItem, setItem } from "./Api"

class USER_PERMISSIONS {

    permissions = []
    capabilities = {}

    constructor() {
        this.retreivePermissions();
        this.retreiveUserData();

    }

    setPermissions(data) {
        this.permissions = data
        setItem("user-permissions", data);
    }

    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            
            return true;
        }
        catch(exception) {
            return false;
        }
    }
    async retreivePermissions() {
        let data = await getItem("user-permissions")
        console.log(`Permissions`)
        if (null) return;
        this.permissions = data
        console.log(JSON.stringify(data, null, 2));
    }

    user_data = []

     

    setUserData(data) {
        this.user_data = data
        setItem("user-data", data);
    }

    async retreiveUserData() {
        let data = await getItem("user-data")
        console.log(`user_data`)
        if (null) return;
        this.user_data = data
        console.log(JSON.stringify(data, null, 2));
    }
}

class USER_DATA {

    

}

const UserPermissions = new USER_PERMISSIONS()
 
export default UserPermissions;
 