import AsyncStorage from "@react-native-async-storage/async-storage";


export async function setItem(key, value) {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // console.error('AsyncStorage#setItem error: ' + error.message);
    }
}

export async function getItem(key) {
    return await AsyncStorage.getItem(key)
        .then((result) => {
            if (result) {
                try {
                    result = JSON.parse(result);
                } catch (e) {
                    // console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, e.message);
                }
            }
            return result;
        });
}
export async function removeItem(key) {
    return await AsyncStorage.removeItem(key);
}

// export default {
//     ,
//     ,

//     // getData = async () => {
//     //     try {
//     //       const value = await AsyncStorage.getItem('@baseurl')
//     //       if(value !== null) {
//     //         // value previously stored

//     //         console.log ("valuevalue" , value)

//     //       }
//     //     } catch(e) {
//     //       // error reading value
//     //     }
//     //   }
export var BaseUrl = "https://nexttak.com"

class URL {

    BaseUrl = "https://nexttak.com"
    constructor() {
        //
        this.loadKey()
    }

    async loadKey() {
        const key = await getItem("MeriKey")
        // -- KEY - KIYA AA RAHI ...
        //NULLL
        this.BaseUrl = key;
    }
    async changeAndSaveBaseUrl(newComponyUrl) {

        // getItem("CompanyUrl").then((keyResult) => {
        //     console.log(JSON.stringify(keyResult,null,2))
        // })
        //DO THE STUFF HERE.
         this.BaseUrl = newComponyUrl;
        setItem("MeriKey", newComponyUrl);
        console.log("newComponyUrl", newComponyUrl)

    }
}

export const GetAllProjects =  "/api/projects/search"
export const GetProDetail = "/api/projects/?id="
export const GetProjectDetail = "/api/projects/"
export const GetAllTasks =  "/api/tasks/search"
export const GetTaskDetail =  "/api/tasks/"
export const GetTasksByType = "/api/leads/init_relation_tasks/"
export const GetAllStaffs = "/api/staffs/search"
export const GetStaffDetail = "/api/staffs/"
export const PostStaffDetail = "/api/staffs"
export const GetAllContacts = "/api/contacts/search"
export const addClientLog = "/api/contacts/"
export const GetAllTickets =  "/api/tickets/search"
export const GetTicketDetail =  "/api/tickets/"
export const GetAllCustomer = "/api/customers/search"
export const DeleteInvoices =  "/api/delete/invoices"
export const DeleteCustomer =  "/api/delete/customers/" 
export const DeleteStaffs = "/api/delete/staffs/" 
export const DeleteProjects = "/api/delete/projects/" 
export const DeleteTasks = "/api/delete/tasks/" 
export const DeleteTickets = "/api/delete/tickets/" 
export const DeleteExpenses = "/api/expenses/" 
export const DeleteLeads = "/api/delete/leads/"
export const GetAllInvoices = "/api/invoices/search"
export const GetInvoiceDetail = "/api/invoices/"
export const GetAllExpenses = "/api/expenses/search"
export const GetAllAnnouncement = "/api/staffs/announcement"
export const GetAllCreditNotes = "/api/credit_notes/search"
export const GetSignin =  "/api/auths/login"
export const GetAllNotifications = "/api/authentication/getAllNotification"
export const GetAllDepartments = "/api/authentication/getDepart"
export const GetAllLeads = "/api/leads/search"
export const GetAllProposals = "/api/proposals/search"
export const  GetAllAppointments = "/api/authentication/getAppointment"
export const SetAppointments = "/api/Appointments/setAppointForm"
export const addProject = "/api/projects"
export const addLead = "/api/leads"
export const UpdateLead = "/api/leads/"
export const addClient = "/api/customers"
export const eidtClient = "/api/customers/"
export const eidtStaff = "/api/staffs/"
export const addTask = "/api/tasks"
export const Services = "/api/services"

export const getAllMails = "/api/StaffMailbox/getStaffMailbox?staff_id="

export const editProfile = "/api/Staffs/editProfile"

export const markAttendence = "/api/Attendance/checkInCheckOut"



const APP_URL = new URL();
export { APP_URL };

