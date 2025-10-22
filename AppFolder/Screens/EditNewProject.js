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
  addProject,
  APP_URL,
  GetAllAnnouncement,
  GetAllAppointments,
  GetProjectDetail,
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
    id: 1,
    name: "Not Started",
  },
  {
    id: 2,
    name: "In Progress",
  },
  {
    id: 3,
    name: "On Hold",
  },
  {
    id: 4,
    name: "Cancelled",
  },
  {
    id: 5,
    name: "Finished",
  },
];

const apiPost = async (s) => {
  //setLoading(true)

  console.log(`url is =`, GetAllAppointments);

  axios
    .post(GetAllAppointments, {
      staff_id: UserPermissions.permissions[0].staffid,
    })
    .then((data) => {
      // setLoading(false)

      console.log(
        `GetAllAppointments DATA = ${JSON.stringify(data.data.data, null, 2)}`
      );
      // setMainData([
      //   { key: '1', value: '0' },
      //   { key: '1', value: '0' },
      //   { key: '1', value: '0' }
      // ]);
      setMainData(
        dummy.map((item, index) => {
          return {
            id: item.id,
            value: item.name,
          };
        })
      );
      // setMainData(data.data.data);
      // setApiData([])
      // setDataAllProjects(data.data.data);
    })
    .catch((e) => {
      console.log(`Error =`, e);

      // setLoading(false)
    });
};

const EditNewProject = (props) => {
  const { projectDetail } = props;

  const [mainData, setMainData] = useState([]);
  const [contactata, setcontactData] = useState([]);
  const [billingTypeData, setbillingTypeData] = useState([]);
  const [projectStatusData, setprojectStatusData] = useState([]);
  const [buttonLoader, setButtonLoader] = useState(false);

  const [proName, setProName] = useState("");
  const [totalRate, settotalRate] = useState("");
  const [billingType, setbillingType] = useState("");
  const [projectStatus, setprojectStatus] = useState("");
  const [estimatedTime, setestimatedTime] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [Description, setDescription] = useState("");

  // const [startDate, setstartDate] = useState("")

  const [leadsData, setLeadsData] = useState([]);

  const [appointmentTypetata, setappointmentType] = useState([]);
  const [staffmembersdata, setstaffmembers] = useState([]);

  const [related, setRelated] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [clients, setClients] = useState([]);

  const [textarea, setTextarea] = useState("");
  const [leads, setLeads] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("");
  const [defaultContactOption, setdefaultContactOption] = useState({
    key: "1",
    value: "Select",
  });
  const [defaultBillingtOption, setdefaultBillingOption] = useState({
    key: "1",
    value: "Select",
  });
  const [defaultProjecttOption, setdefaultProjectOption] = useState({
    key: "1",
    value: "Select",
  });
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [repeat, setrepeat] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [dataSource, setDataSource] = useState({});

  useEffect(() => {
    //for Billing data

    let mapped = dummy.map((item, index) => {
      let obj = {
        id: index + 1,
        value: item.name,
      };
      return obj;
    });
    setbillingTypeData([...mapped]);
    //for Project Status data

    let mappedstatus = statusD.map((item, index) => {
      console.log("status idd", item);
      let obj = {
        key: item.id,
        value: item.name,
      };
      return obj;
    });
    setprojectStatusData([...mappedstatus]);
    apiPost();
  }, []);

  const getProjectDetail = (cdataFinal) => {
    try {
      console.log("RUN");
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      // fetch(APP_URL.BaseUrl + GetProjectDetail+"115", requestOptions)
      fetch(
        APP_URL.BaseUrl + GetProjectDetail + projectDetail?.id,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setDataSource(result);
          setProName(result?.name);
          cdataFinal?.map((val) => {
            if (val.key === result.clientid) {
              setContact(parseInt(val.key));
              setdefaultContactOption({ key: val.key, value: val.value });
            }
          });
          billingTypeData?.map((val) => {
            if (val.id === parseInt(result?.billing_type)) {
              setbillingType(val.id);
              setdefaultBillingOption({ id: val.id, value: val.value });
            }
          });
          projectStatusData?.map((val) => {
            if (val.key === parseInt(result?.status)) {
              setprojectStatus(val.key);
              setdefaultProjectOption({ key: val.key, value: val.value });
            }
          });
          settotalRate(result?.project_cost);
          setestimatedTime(result?.estimated_hours);
          // setStartDate(result?.start_date);
          // setDeadlineDate(result?.deadline);
          setDescription(result?.description);
        })
        .catch((error) => {
          console.log("ERROR ======> ", error?.message);
        });
    } catch (error) {
      console.log("ERROR ======> ", error?.message);
    }
  };

  const apiAddPro = async (s) => {
    //  setLoading(true)
    const params = JSON.stringify({});

    const formattedDeadlineDate = moment(deadlineDate).format("MM-DD-YYYY");
    const formattedStartDate = moment(startDate).format("MM-DD-YYYY");

    console.log("formattedDeadlineDate", formattedDeadlineDate);

    let data = {
      name: proName,
      clientid: contact,
      billing_type: billingType,
      start_date: formattedStartDate,
      status: projectStatus,
      progress_from_tasks: "",
      project_cost: totalRate,
      project_rate_per_hour: "",
      estimated_hours: estimatedTime,
      project_members: selectedTeams,
      deadline: formattedDeadlineDate,
      description: Description,
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
    console.log(`params =`, formData);
    // console.log(`addProject Url =`, addProject)

    axios
      .post(
        APP_URL.BaseUrl + addProject,
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
                GoToNextController("MyProjects");
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
  const updateProjectHandle = () => {
    try {
      setButtonLoader(true);
      const formattedStartDate = moment(startDate).format("MM-DD-YYYY");
      const formattedDeadlineDate = moment(deadlineDate).format("MM-DD-YYYY");
      var raw = JSON.stringify({
        name: proName,
        clientid: contact,
        billing_type: billingType,
        start_date: formattedStartDate,
        status: projectStatus,
        progress_from_tasks: "",
        project_cost: totalRate,
        project_rate_per_hour: "",
        estimated_hours: estimatedTime,
        project_members: selectedTeams,
        deadline: formattedDeadlineDate,
        description: Description,
      });

      console.log("raw =====> ", raw);

      var requestOptions = {
        method: "PUT",
        body: raw,
        redirect: "follow",
      };

      fetch(
        APP_URL.BaseUrl + addProject + "/" + projectDetail?.id,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setButtonLoader(false);
          console.log("result =====> ", result);
          if (result.status == 400) {
            alert(result?.message);
          } else if (result?.status == true) {
            Alert.alert(result?.message, "", [
              {
                text: "OK",
                onPress: async () => {
                  GoToNextController("MyProjects");
                },
              },
            ]);
          } else if (result?.status == false) {
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

  const apiPost = async (s) => {
    // setLoading(true)

    console.log(`url is =`, APP_URL.BaseUrl + addProject);

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
        const cdataFinal = [...contactsLeads];
        setcontactData(cdataFinal);

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

        getProjectDetail(cdataFinal);

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

  return (
    <>
      <View style={styles.maincontainer}>
        <ScrollView>
          <View>
            <Text style={styles.labelText}>Project Name</Text>

            <CustomTextfieldBlank
              value={proName}
              setValue={setProName}
              style={{ marginTop: 10 }}
              placeholder="Project Name"
              isSecure={false}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Client</Text>

            <Selectset
              save={"key"}
              value={contact}
              arraydata={contactata}
              defaultOption={defaultContactOption}
              setSelected={(e) => {
                console.log("Cleint Data", e);
                setContact(e);
              }}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Billing Type</Text>
            <Selectset
              defaultOption={defaultBillingtOption}
              arraydata={billingTypeData}
              title="name"
              value={billingType}
              save={"value"}
              setSelected={(e) => {
                console.log("setbillingType", e);
                setbillingType(e);
              }}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Project Status</Text>
            <Selectset
              defaultOption={defaultProjecttOption}
              arraydata={projectStatusData}
              title="name"
              value={projectStatus}
              save={"key"}
              setSelected={(e) => {
                console.log("selected status", e);
                setprojectStatus(e);
              }}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Total Rate</Text>
            <CustomTextfieldBlank
              value={totalRate}
              setValue={settotalRate}
              style={{ marginTop: 10 }}
              placeholder="Total Rate"
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
            <Text style={styles.labelText}>Members</Text>
            <Multiselection
              data={staffmembersdata}
              selectedTeams={selectedTeams}
              setSelectedTeams={setSelectedTeams}
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
              title="Deadline"
              date={deadlineDate}
              setDate={setDeadlineDate}
            />
          </View>

          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Description</Text>
          </View>

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
              console.log("contactcontactcontactcontactcontact", contact);

              if (proName == "") {
                alert("Please enter Project Name");
              } else if (contact == "1") {
                alert("Please select Client");
              } else if (billingType == "1") {
                alert("Please select billing type");
              } else if (projectStatus == "1") {
                alert("Please select project status");
              } else if (startDate == "") {
                alert("Please select start date");
              } else {
                // apiAddPro()
                updateProjectHandle();
              }
              //Navigation.push("AppStack",{component:{name:"Dashboard" , options: {  topBar: { backButton:{ visible: false}, visible: true , title : { text : "Dashboard"} } } } })
            }}
          >
            {buttonLoader ? (
              <ActivityIndicator size={"small"} color={"#FFF"} />
            ) : (
              <Text style={{ color: "white" }}>Edit Project</Text>
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

export default EditNewProject;
