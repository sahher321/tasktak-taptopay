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
} from "react-native";

import { InputField } from "../Components/InputField";
import { Selectset } from "../Components/SelectList";
import { SingleDatepicker } from "../Components/SingleDatepicker";
import CheckBox from "@react-native-community/checkbox";
import { Multiselection } from "../Components/MultiSelectbox";
import { PhoneInput } from "../Components/phoneInput";
import axios from "axios";
import {
  GetAllAnnouncement,
  GetAllAppointments,
  SetAppointments,
} from "../Components/Api";
import UserPermissions from "../Components/UserPermissions";
import { AppTheme } from "../AppTheme/AppTheme";

const dummy = [
  {
    name: "lead_related",
  },
  {
    name: "external",
  },
  {
    name: "internal",
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

const AppointmentContact = () => {

  const [mainData, setMainData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [contactata, setcontactata] = useState([]);
  const [appointmentTypetata, setappointmentType] = useState([]);
  const [staffmembersdata, setstaffmembers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [related, setRelated] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [subject, setsubject] = useState("");
  const [textarea, setTextarea] = useState("");
  const [leads, setLeads] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [repeat, setrepeat] = useState("");

  useEffect(() => {
    apiPost();
  }, []);

  const apiPost = async (s) => {
    console.log(`url is =`, SetAppointments);
    axios
      .get(SetAppointments)
      .then(async (data) => {
        console.log(
          `GetAllAppointments DATA = ${JSON.stringify(data.data.data, null, 2)}`
        );
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
            id: 1,
            value: item.firstname + " " + item.lastname + item.company,
          };

          return obj;
        });
        setcontactata([...contactsLeads]);

        let appointment_typesdata = data.data.data.appointment_types;
        let appointment_typesLeads = appointment_typesdata.map((item) => {
          let obj = {
            id: 1,
            value: item.type,
          };

          return obj;
        });
        setappointmentType([...appointment_typesLeads]);

        console.log("MAPPED appointment_typesLeads- ", appointment_typesLeads);
        console.log(appointment_typesLeads.length);

        let _staff_membersdata = data.data.data.staff_members;

        let staff_membersLeads = _staff_membersdata.map((item) => {
          console.log("MAPPED item.staffid- ", item.staffid);

          let obj = {
            id: item.staffid,
            item: item.firstname + " " + item.lastname,
          };

          return obj;
        });
        setstaffmembers([...staff_membersLeads]);

        // console.log("MAPPED setstaffmembers- ", setstaffmembers)
        console.log(setstaffmembers.length);
        setTimeout(() => {
        }, 500);
      })
      .catch((e) => {
        console.log(`Error =`, e);
      });
  };

  return (
    <>
      <View style={styles.maincontainer}>
        <View>
          <Text style={styles.labelText}>New appointment</Text>
        </View>
        <ScrollView>
          <View>
            <InputField
              title="Subject"
              name="subject"
              value={subject}
              onChange={(e) => {
                setsubject(e.target.value);
              }}
            />
          </View>
          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Description</Text>
            <TextInput
              style={styles.textarea}
              multiline={true}
              numberOfLines={4}
              value={textarea}
              onChange={(e) => {
                setTextarea(e);
              }}
            />
          </View>
          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Related</Text>
            <Selectset
              arraydata={mainData}
              title="name"
              selected={related}
              setSelected={setRelated}
              value={subject}
              onChange={async (e) => {
                console.log("NEW AP CALLING");
                //  apiPost()
              }}
            />
          </View>
          <View style={styles.MarginTop}>
            {related == "lead_related" ? (
              <>
                <Text style={styles.labelText}>Leads</Text>
                <Selectset
                  arraydata={leadsData}
                  value={leads}
                  onChange={(e) => {
                    setLeads(e);
                  }}
                />
              </>
            ) : null}
          </View>
          <View style={styles.MarginTop}>
            {related == "internal" ? (
              <>
                <Text style={styles.labelText}>Contact</Text>
                <Selectset
                  arraydata={contactata}
                  value={leads}
                  onChange={(e) => {
                    setLeads(e);
                  }}
                />
              </>
            ) : null}
          </View>
          <View>
            <InputField
              title="Name"
              value={name}
              onChange={(e) => {
                setName(e);
              }}
            />
          </View>
          <View>
            <InputField
              title="Email "
              value={email}
              onChange={(e) => {
                setEmail(e);
              }}
            />
          </View>
          <View>
            <PhoneInput
              title="Phone (Ex: +1 69 1234 5678) "
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </View>
          <View>
            <PhoneInput
              title="Contact"
              value={phone}
              onChange={(e) => {
                setPhone(e);
              }}
            />
          </View>
          <View style={styles.MarginTop}>
            {/* <SingleDatepicker /> */}

            <SingleDatepicker
              title="Start Date"
              date={startDate}
              setDate={setStartDate}
            />
          </View>
          <View>
            <InputField title="Appointment Location (optional)" />
          </View>
          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Attendees</Text>
            <Multiselection data={staffmembersdata} />
          </View>
          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Appointment Type</Text>

            <Selectset
              arraydata={appointmentTypetata}
              value={leads}
              onChange={(e) => {
                setLeads(e);
              }}
            />
          </View>
          <View style={styles.MarginTop}>
            <Text style={styles.labelText}>Repeat every</Text>
            <Selectset />
          </View>
          <View>
            <InputField title="Total Cycles " />
          </View>
          <View>
            <Text style={styles.para}>
              Please mark the checkboxs as checked if you want selected attendes
              and contact to recieve reminders eg. if set 30 minutes before the
              appointment start. Note that this feature requires cron job to be
              configured.
            </Text>
          </View>
          <View style={styles.checkmain}>
            <View style={styles.dflex}>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={styles.checkText}> SMS Notification</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={styles.checkText}>Email Notification</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.labelText}>Appointment notes</Text>
            <TextInput
              style={styles.textarea}
              multiline={true}
              numberOfLines={4}
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
              //Navigation.push("AppStack",{component:{name:"Dashboard" , options: {  topBar: { backButton:{ visible: false}, visible: true , title : { text : "Dashboard"} } } } })
            }}
          >
            <Text style={{ color: "white" }}>Add Appointment</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

export default AppointmentContact;
