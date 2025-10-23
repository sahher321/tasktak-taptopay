import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  Platform,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { InputField } from "../Components/InputField";
import { Selectset } from "../Components/SelectList";
import { SingleDatepicker } from "../Components/SingleDatepicker";
import CheckBox from "@react-native-community/checkbox";
import { Multiselection } from "../Components/MultiSelectbox";
import { PhoneInput } from "../Components/phoneInput";
import axios from "axios";
import {
  addTask,
  APP_URL,
  GetAllAppointments,
  SetAppointments,
} from "../Components/Api";
import UserPermissions from "../Components/UserPermissions";
import {
  CustomTextfield,
  CustomTextfieldBlank,
  GoToNextController,
} from "../Components/General";
import { AppTheme } from "../AppTheme/AppTheme";
import moment from "moment";

const priorityD = [
  {
    name: "Low",
  },
  {
    name: "Medium",
  },
  {
    name: "High",
  },
  {
    name: "Urgent",
  },
];
const repeatD = [
  {
    name: "2 Weeks",
  },
  {
    name: "1 Month",
  },
  {
    name: "2 Month",
  },
  {
    name: "3 Month",
  },
  {
    name: "6 Month",
  },
  {
    name: "1 Year",
  },
];
const dummy = [
  {
    name: "Fixed Rate",
  },
  {
    name: "Project Hours",
  },
  {
    name: "Task Hours Based on task hourly rate",
  },
];
const statusD = [
  {
    name: "Not Started",
  },
  {
    name: "In Progress",
  },
  {
    name: "On Hold",
  },
  {
    name: "Cancelled",
  },
  {
    name: "Finished",
  },
];
const relatedD = [
  {
    name: "lead",
  },
  {
    name: "customer",
  },
  {
    name: "invoice",
  },
  {
    name: "project",
  },
  {
    name: "quotation",
  },
  {
    name: "contract",
  },
  {
    name: "annex",
  },
  {
    name: "ticket",
  },
  {
    name: "expense",
  },
  {
    name: "proposal",
  },
];

const NewTask = () => {

  const [mainData, setMainData] = useState([]);
  const [contactata, setcontactData] = useState([]);
  const [billingTypeData, setbillingTypeData] = useState([]);
  const [projectStatusData, setprojectStatusData] = useState([]);
  const [repeatData, setrepeatData] = useState([]);
  const [priorityData, setpriorityData] = useState([]);
  const [defaultPriorityOption, setdefaultPriorityOption] = useState({
    key: 1,
    value: "select",
  });
  const [selectedName, setSelectedName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [subject, setsubject] = useState("");
  const [totalcycles, settotalcycles] = useState("");
  const [totalRate, settotalRate] = useState("");
  const [billingType, setbillingType] = useState("");
  const [projectStatus, setprojectStatus] = useState("");
  const [priority, setpriority] = useState("");
  const [repeatevery, setrepeatevery] = useState("");
  const [estimatedTime, setestimatedTime] = useState("");
  const [hourlyrate, sethourlyrate] = useState("");
  const [tags, settags] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [Description, setDescription] = useState("");
  const [leadsData, setLeadsData] = useState([]);
  const [appointmentTypetata, setappointmentType] = useState([]);
  const [staffmembersdata, setstaffmembers] = useState([]);
  const [related, setRelated] = useState([]);
  const [Project, setPoject] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [clients, setClients] = useState([]);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [textarea, setTextarea] = useState("");
  const [leads, setLeads] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("");
  const [defaultFollowersOption, setdefaultFollowersOption] = useState({
    key: 1,
    value: "Select",
  });
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [repeat, setrepeat] = useState("");
  const [defaultRepeatOption, setdefaultRepeatOption] = useState({
    key: 1,
    value: "Select",
  });
  const [relatedV, setrelatedV] = useState("");
  const [defaultRelatedOption, setdefaultRelatedOption] = useState({
    key: 1,
    value: "Select",
  });
  const [defaultProjectOption, setdefaultProjectOption] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    let remapped = relatedD.map((item, index) => {
      let obj = { id: 1, value: item.name };
      return obj;
    });
    setRelated([...remapped]);
    //for Billing data
    let mapped = dummy.map((item, index) => {
      let obj = { id: 1, value: item.name };
      return obj;
    });
    setbillingTypeData([...mapped]);
    // for repeat
    let rmapped = repeatD.map((item, index) => {
      let obj = { id: 1, value: item.name };
      return obj;
    });
    setrepeatData([...rmapped]);
    // forpriority
    let pmapped = priorityD.map((item, index) => {
      let obj = { id: 1, value: item.name };
      return obj;
    });
    setpriorityData([...pmapped]);
    //for Project Status data
    let mappedstatus = statusD.map((item, index) => {
      let obj = { id: 1, value: item.name };
      return obj;
    });
    setprojectStatusData([...mappedstatus]);
    apiPost();
  }, []);
  const apiAddPro = async (s) => {
    const params = JSON.stringify({});
    const formattedDeadlineDate = moment(deadlineDate).format("MM-DD-YYYY");
    const formattedStartDate = moment(startDate).format("MM-DD-YYYY");
    let data = {
      name: subject,
      startdate: formattedStartDate,
      duedate: formattedDeadlineDate,
      priority: priority,
      repeat_every: repeatevery,
      cycles: totalcycles,
      rel_type: relatedV,
      tags: tags,
      description: Description,
      // clientid: contact,
      // billing_type: billingType,
      // status: projectStatus,
      // progress_from_tasks: "",
      // project_cost: totalRate,
      // project_rate_per_hour: "",
      // estimated_hours: estimatedTime,
      // project_members: selectedTeams,
      // deadline: formattedDeadlineDate,
      // description: Description
    };
    const formData = new FormData();
    for (var key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
    // console.log(JSON.stringify(data, null, 2));
    // const formData = new FormData();
    // formData.append(JSON.stringify(data));

    let mappedItems = selectedTeams.map((item, index) => {
      return item.id;
    });
    // console.log("SELECTED TEAMS = ", mappedItems);
    // console.log(`params =`, formData)
    // console.log(`addProject Url =`, addProject)

    axios
      .post(
        APP_URL.BaseUrl + addTask,
        // { ...data },
        formData
      )
      .then((_data) => {
        console.log("DATA");
        console.log(JSON.stringify(_data.data, null, 2));
        //    setLoading(false)

        if (_data.data.status == 400) {
          alert(_data.data.message);
        } else if (_data.data.status == true) {
          // alert(_data.data.message)

          Alert.alert(_data.data.message, "", [
            {
              text: "OK",
              onPress: async () => {
                GoToNextController("AllProjects");
              },
            },
          ]);
        }
      })
      .catch((e) => {
        console.log(`Error =`, JSON.stringify(e));
        // setLoading(false)
      });
  };
  const apiPost = async (s) => {
    // setLoading(true)

    console.log(`url is =`, APP_URL.BaseUrl + SetAppointments);

    axios
      .get(APP_URL.BaseUrl + SetAppointments)
      .then(async (data) => {
        // setLoading(false)

        //console.log(`GetAllAppointments DATA = ${JSON.stringify(data.data.data, null, 2)}`)
        let _data = data.data.data.proposal_related;

        let mapped_array = [];

        let mapped = _data.map((item) => {
          let obj = {
            id: 1,
            value: item.name,
          };

          return obj;
        });
        setMainData([...mapped]);

        let _leadsdata = data.data.data.leads;

        let mappedLeads = _leadsdata.map((item) => {
          let obj = {
            id: 1,
            value: item.name,
          };

          return obj;
        });
        setLeadsData([...mappedLeads]);

        let _contactdata = data.data.data.contacts;

        let contactsLeads = _contactdata.map((item) => {
          let obj = {
            key: item.client_id,
            value: item.firstname + " " + item.lastname + item.company,
          };

          return obj;
        });
        setcontactData([...contactsLeads]);

        //console.log("MAPPED contactsLeads- ", contactsLeads)
        //console.log(contactsLeads.length);

        let appointment_typesdata = data.data.data.appointment_types;

        let appointment_typesLeads = appointment_typesdata.map((item) => {
          let obj = {
            id: 1,
            value: item.type,
          };
          return obj;
        });
        setappointmentType([...appointment_typesLeads]);

        //console.log("MAPPED appointment_typesLeads- ", appointment_typesLeads)
        //console.log(appointment_typesLeads.length);

        let _staff_membersdata = data.data.data.staff_members;

        let staff_membersLeads = _staff_membersdata.map((item) => {
          // console.log("MAPPED item.staffid- ", item.staffid)
          let obj = {
            id: item.staffid,
            item: item.firstname + " " + item.lastname,
          };
          return obj;
        });
        setstaffmembers([...staff_membersLeads]);

        // console.log("MAPPED setstaffmembers- ", setstaffmembers)
        // console.log(setstaffmembers.length);

        // (item)));
        // let mapped = _data.map((item, index) => {
        //   let obj = {
        //     id: item.id,
        //     value: item.name
        //   }
        //   // mapped_array.push(obj)
        //   // console.log("MAP for index = ", index);
        //   // console.log(obj);

        //   return obj
        // })
        // console.log(mapped);
        // console.log(mapped.length);
        setTimeout(() => {
          // setMainData(mapped);
        }, 500);
        // setMainData([...mapped] );
        // setMainData([
        //   { key: '1', value: '0' },
        //   { key: '1', value: '0' },
        //   { key: '1', value: '0' }
        // ]);

        // setMainData(data.data.data);
        // setApiData([])rr
        // setDataAllProjects(data.data.data);
      })
      .catch((e) => {
        console.log(`Error =`, e);

        // setLoading(false)
      });
  };
  const apiAddTask = async () => {
    const formattedStartDate = moment(startDate).format("MM-DD-YYYY");
    const formattedDeadlineDate = moment(deadlineDate).format("MM-DD-YYYY");
    const formData = {
      name: subject,
      startdate: formattedStartDate,
      duedate: formattedDeadlineDate,
      rel_type: relatedV,
      rel_id: selectedId,
      tags: tags,
      description: Description,
      priority: priority,
      repeat_every: repeatevery,
      cycles: totalcycles,
    };

    console.log("Form Data======>", formData);
    try {
      const response = await axios.post(APP_URL.BaseUrl + addTask, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("task added successfully");
        GoToNextController("AllProjects");
      } else {
        console.log("task add failed with status code: " + response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchRelatedData = async (s) => {
    console.log("data =====> ");
    const params = JSON.stringify({});
    let data = {
      rel_type: relatedV,
    };

    const formData = new FormData();
    for (var key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
    let mappedItems = selectedTeams.map((item, index) => {
      return item.id;
    });

    axios
      .post(APP_URL.BaseUrl + "/api/tasks/types/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((_data) => {
        // Log the response data
        console.log("Response Data:", _data.data);

        // Extract and log the names
        const Alldata = _data.data;
        setPoject(Alldata);
        console.log("Name :", Project);

        if (_data.data.status == 400) {
          console.log("error request");
        } else if (_data.data.status == true) {
          console.log("true");
        }
      })

      .catch((e) => {
        console.log(`Error =`, JSON.stringify(e));
      });
  };

  const handleOptionSelection = (selectedOption) => {
    console.log("related", selectedOption);
    setrelatedV(selectedOption);
    fetchRelatedData();
  };
  const handleSelectChange = (itemValue) => {
    setSelectedName(itemValue);

    // Find the corresponding ID based on the selected name
    const selectedItem = Project.find((item) => item.name === itemValue);
    if (selectedItem) {
      setSelectedId(selectedItem.id);
      console.log(
        `Selected ID: ${selectedItem.id}, Selected Name: ${itemValue}`
      );
    }
  };

  return (
    <>
      <View style={styles.maincontainer}>
        <ScrollView>
          <View>
            <Text style={styles.labelText}>Subject</Text>

            <CustomTextfieldBlank
              value={subject}
              setValue={setsubject}
              style={{ marginTop: 10 }}
              placeholder="Subject"
              isSecure={false}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Hourly Rate</Text>
            <CustomTextfieldBlank
              value={hourlyrate}
              setValue={sethourlyrate}
              style={{ marginTop: 10 }}
              placeholder="Hourly Rate"
              isSecure={false}
            />
          </View>

          <View style={styles.MarginTop}>
            <SingleDatepicker
              title="Start Date"
              date={startDate}
              setDate={setStartDate}
            />
          </View>
          <View style={styles.MarginTop}>
            <SingleDatepicker
              title="Due Date"
              date={deadlineDate}
              setDate={setDeadlineDate}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Priority</Text>
            <Selectset
              defaultOption={defaultPriorityOption}
              arraydata={priorityData}
              title="name"
              value={priority}
              save={"value"}
              setSelected={(e) => {
                console.log("Priority", e);
                setpriority(e);
              }}
            />
          </View>
          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Repeat every</Text>
            <Selectset
              defaultOption={defaultRepeatOption}
              arraydata={repeatData}
              title="name"
              value={repeat}
              save={"value"}
              setSelected={(e) => {
                console.log("Repeat every", e);
                setrepeat(e);
              }}
            />
          </View>
          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Total Cycles</Text>

            <CustomTextfieldBlank
              value={totalcycles}
              setValue={settotalcycles}
              style={{ marginTop: 10 }}
              placeholder="Total Cycles"
              isSecure={false}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Related To</Text>
            <Selectset
              defaultOption={defaultRelatedOption}
              arraydata={related}
              title="name"
              value={relatedV}
              save={"value"}
              setSelected={handleOptionSelection}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>{relatedV}</Text>
            <Selectset
              arraydata={Project.map((item) => item.name)}
              // title="Select a `${relatedV}`"
              value={selectedName}
              save={selectedName}
              setSelected={handleSelectChange}
            />

            {/* Render Project data or do something with it */}
            {/* {Project.map((item, index) => (
        <View key={index}>
          <Text>
            {item && item.ky ? item.ky : 'No key available'}
          </Text>
        </View>
      ))} */}
          </View>

          {/* <View style={styles.MarginTop}>
                        <Text style={styles.labelText}>
                            Projects
                        </Text>
                        <Selectset arraydata={mainData} title='Projects' selected={related} setSelected={setRelated} value={subject} onChange={async (e) => {
                            console.log("NEW AP CALLING");
                            //  apiPost()
                        }} />
                    </View> */}

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Assignees</Text>
            <Multiselection
              data={staffmembersdata}
              selectedTeams={selectedTeams}
              setSelectedTeams={setSelectedTeams}
            />
          </View>
          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Followers</Text>

            <Selectset
              defaultOption={defaultFollowersOption}
              arraydata={contactata}
              value={contact}
              save={"key"}
              setSelected={(e) => {
                console.log("Cleint Data", e);
                setContact(e);
              }}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Tags</Text>
            <CustomTextfieldBlank
              value={tags}
              setValue={settags}
              style={{ marginTop: 10 }}
              placeholder="Tags"
              isSecure={false}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Estimated Hours</Text>
            <CustomTextfieldBlank
              value={estimatedTime}
              setValue={setestimatedTime}
              style={{ marginTop: 10 }}
              placeholder="Estimated Hours"
              isSecure={false}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Description</Text>

            <View style={styles.textAreaContainer}>
              <TextInput
                onChangeText={setDescription}
                value={Description}
                style={styles.textAreaC}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={8}
                multiline={true}
              />
            </View>
          </View>

          <TouchableOpacity
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
            onPress={() => {
              if (subject == "") {
                alert("Please enter  Subject");
              } else if (startDate == "") {
                alert("Please select startDate");
              } else if (related == "1") {
                alert("Please select related type");
              } else {
                // apiAddPro()
                apiAddTask();
              }
              //Navigation.push("AppStack",{component:{name:"Dashboard" , options: {  topBar: { backButton:{ visible: false}, visible: true , title : { text : "Dashboard"} } } } })
            }}
          >
            {buttonLoader ? (
              <ActivityIndicator size={"small"} color={"#FFF"} />
            ) : (
              <Text style={{ color: "white" }}>Add Task</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
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
    fontSize: 16,
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

export default NewTask;
