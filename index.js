/**
 * @format
 */

import { Constants, Navigation } from "react-native-navigation";
import Dashboard from "./AppFolder/Screens/DashBoard";
import Signin from "./AppFolder/Screens/Signin";
import Signup from "./AppFolder/Screens/Signup";
import Splash from "./AppFolder/Screens/Splash";
import Tutorial from "./AppFolder/Screens/Tutorial";
import MyProjects from "./AppFolder/Screens/MyProjects";
import MyTasks from "./AppFolder/Screens/AllProjects";
import NewTask from "./AppFolder/Screens/NewTask";
import MailBox from "./AppFolder/Screens/MailBox";
import Staff from "./AppFolder/Screens/Staff";
import TaskDetail from "./AppFolder/Screens/TaskDetails";
import ProjectDetail from "./AppFolder/Screens/ProjectDetail";
import Contacts from "./AppFolder/Screens/Contacts";
import AddNewProject from "./AppFolder/Screens/AddNewProject";
import AddNewStaff from "./AppFolder/Screens/AddNewStaff";
import Invoice from "./AppFolder/Screens/Invoice";
import CreditNotes from "./AppFolder/Screens/CreditNotes";
import Attendance from "./AppFolder/Screens/Attandence"
import AllAnnouncement from "./AppFolder/Screens/AllAnnouncement"
import CompanyName from "./AppFolder/Screens/CompanyName"
import Tickets from "./AppFolder/Screens/Tickets"
import Todo from "./AppFolder/Screens/Todo"
import CreditNotesDetail from "./AppFolder/Screens/CreditNotesDetail"
import Notification from "./AppFolder/Screens/Notification"
import EditStaff from "./AppFolder/Screens/EditStaff"
import ShareADoc from "./AppFolder/Screens/ShareADoc"
import EditProfile from "./AppFolder/Screens/EditProfile"
import DocPicker from "./AppFolder/Components/DocPicker";

import Lead from "./AppFolder/Screens/Lead"

import LeadsDetail from "./AppFolder/Screens/LeadsDetail"

import Expenses from "./AppFolder/Screens/Expenses"

import ExpenseDetail from "./AppFolder/Screens/ExpenseDetail"

import Appointly from "./AppFolder/Screens/Appointly"

import Proposals from "./AppFolder/Screens/Proposals"

import AppointmentContact from "./AppFolder/Screens/AppointmentContact"
import AddContact from "./AppFolder/Screens/AddContact";
import AddClient from "./AppFolder/Screens/AddClient";
import AddNewLead from "./AppFolder/Screens/AddNewLead";
import EditClient from "./AppFolder/Screens/EditClient";
import EditNewLead from "./AppFolder/Screens/EditLeads";
import EditNewProject from "./AppFolder/Screens/EditNewProject";
import EditTask from "./AppFolder/Screens/EditTask";
import ViewClient from "./AppFolder/Screens/ViewClient";
import ViewProject from "./AppFolder/Screens/ViewProject";
import ViewInvoice from "./AppFolder/Screens/ViewInvoice";
import ViewStaff from "./AppFolder/Screens/ViewStaff";
import ViewTicket from "./AppFolder/Screens/ViewTicket";
import SendMail from "./AppFolder/Screens/SendMail";
import AppointmentCalendar from "./AppFolder/Screens/AppointmentCalendar";
import ViewMail from "./AppFolder/Screens/ViewMail";


// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import Splash from './AppFolder/Screens/Splash';

// AppRegistry.registerComponent(appName, () => Splash);

Navigation.registerComponent("Splash", () => Splash)
Navigation.registerComponent("Tutorial", () => Tutorial)
Navigation.registerComponent("Signin", () => Signin)
Navigation.registerComponent("Signup", () => Signup)
Navigation.registerComponent("Dashboard", () => Dashboard)
Navigation.registerComponent("MyProjects", () => MyProjects)
Navigation.registerComponent("AllProjects", () => MyTasks)
Navigation.registerComponent("NewTask", () => NewTask)
Navigation.registerComponent("EditTask", () => EditTask)
Navigation.registerComponent("MailBox", () => MailBox)
Navigation.registerComponent("SendMail", () => SendMail)
Navigation.registerComponent("ViewMail", () => ViewMail)
Navigation.registerComponent("Staff", () => Staff)
Navigation.registerComponent("ViewStaff", () => ViewStaff)
Navigation.registerComponent("TaskDetail", () => TaskDetail)
Navigation.registerComponent("ProjectDetail", () => ProjectDetail)
Navigation.registerComponent("Contacts", () => Contacts)
Navigation.registerComponent("AddNewProject", () => AddNewProject)
Navigation.registerComponent("EditNewProject", () => EditNewProject)
Navigation.registerComponent("ViewProject", () => ViewProject)
Navigation.registerComponent("Invoice", () => Invoice)
Navigation.registerComponent("ViewInvoice", () => ViewInvoice)
Navigation.registerComponent("CreditNotes", () => CreditNotes)
Navigation.registerComponent("Attendance", () => Attendance)
Navigation.registerComponent("AllAnnouncement", () => AllAnnouncement)
Navigation.registerComponent("CompanyName", () => CompanyName)
Navigation.registerComponent("Tickets", () => Tickets)
Navigation.registerComponent("ViewTicket", () => ViewTicket)
Navigation.registerComponent("Todo", () => Todo)
Navigation.registerComponent("CreditNotesDetail", () => CreditNotesDetail)
Navigation.registerComponent("Notification", () => Notification)
Navigation.registerComponent("DocPicker", () => DocPicker)

Navigation.registerComponent("ShareADoc", () => ShareADoc)

Navigation.registerComponent("EditProfile", () => EditProfile)

Navigation.registerComponent("EditStaff", () => EditStaff)
Navigation.registerComponent("Lead", () => Lead)
Navigation.registerComponent("LeadsDetail", () => LeadsDetail)
Navigation.registerComponent("Expenses", () => Expenses)

Navigation.registerComponent("ExpenseDetail", () => ExpenseDetail)
Navigation.registerComponent("Appointly", () => Appointly)
Navigation.registerComponent("Proposals", () => Proposals)
Navigation.registerComponent("AppointmentContact", () => AppointmentContact)
Navigation.registerComponent("AddContact", () => AddContact)
Navigation.registerComponent("AddClient", () => AddClient)
Navigation.registerComponent("EditClient", () => EditClient)
Navigation.registerComponent("ViewClient", () => ViewClient)
Navigation.registerComponent("AddNewLead", () => AddNewLead)
Navigation.registerComponent("EditNewLead", () => EditNewLead)
Navigation.registerComponent("AppointmentCalendar", () => AppointmentCalendar)
Navigation.registerComponent("AddNewStaff", () => AddNewStaff)
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                id: "AppStack",
                children: [
                    {
                        component: {
                            name: "Splash",
                            // name: "DocPicker",
                            options: {
                                //   layout: {
                                //     backgroundColor: colors.darkPurple,
                                //     componentBackgroundColor: colors.darkPurple,
                                //   },
                                //   window: {
                                //     backgroundColor: colors.darkPurple
                                //   },

                                topBar: {
                                    visible: false
                                },
                                statusBar: {
                                    drawBehind: 'true',
                                    backgroundColor: 'transparent',
                                    style: 'light'
                                }
                            }
                        }
                    }
                ]
            },
        }
    });
});








