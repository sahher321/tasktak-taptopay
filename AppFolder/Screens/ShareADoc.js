import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
// import { Picker } from '@react-native-picker/picker';
import { CustomTextfield, CustomTextfieldBlank, ScreenWidth } from "../Components/General";
import { AppTheme } from "../AppTheme/AppTheme";
import DropDownPicker from 'react-native-dropdown-picker';
import { APP_URL, GetAllDepartments } from "../Components/Api";
import axios from "axios";
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'



const ShareADoc = () => {


    const [dataAllDeparments, setDataAllDeparments] = useState([]);

    useEffect(() => {
        apiPost()
    }, [])


    const apiPost = async (s) => {

        // console.log(`check func =`, MyTasks)

        axios.get(APP_URL.BaseUrl + GetAllDepartments)
            .then(data => {
                console.log(`Deparments DATA = ${JSON.stringify(data.data.data[0].name, null, 2)}`)
                // setApiData([])
                // setDataAllTasks(data.data);
                setDataAllDeparments(data?.data.data || []);
            })
            .catch(e => {
                console.log(`Error =`, e)

            })


    }

    function DropPicker({ data }) {
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [items, setItems] = useState(data
            // [
            //     { label: 'Time In', value: 'movein' },
            //     { label: 'Time Out', value: 'moveout' },
            // ]
        );
        return (<DropDownPicker style={{ alignSelf: "center", justifyContent: "center", width: ScreenWidth - 100, marginTop: 50 }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            DropDownDirectionType="Top"
        />)
    }

    const [selectedLanguage, setSelectedLanguage] = useState();

    var date = moment()
        .utcOffset('+05')
        .format('MMM d, yyyy');

    var date2 = moment()
        .utcOffset('+05')
        .format('hh:mm a');
    console.log("current time is", date)

    const handleError = (err) => {
        if (DocumentPicker.isCancel(err)) {
            // console.warn('cancelled')
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            // console.warn('multiple pickers were opened, only the last will be considered')
        } else {
            throw err
        }
    }
    const [selectedItems, setSelectedItems] = useState([]);


    return (
        <View style={{ backgroundColor: "", flex: 1 }}>

            <Text style={{ fontSize: 24, textAlign: "center", color: "white", marginTop: 50 }}>Share A Doc</Text>

            <DropPicker data={dataAllDeparments.map((item, index) => { item.label = item.name; item.value = item.name; return item; })} />


            <TextInput style={{ width: "75%", alignSelf: "center", marginTop: 30, borderColor: "black", borderWidth: 1, height: 40, borderRadius: 5 }} placeholder={"Share documents,ideas"} />



            <View style={{ backgroundColor: "#3B3B3D", height: 120, alignSelf: "center", justifyContent: "center", width: ScreenWidth - 100, marginTop: 50, borderRadius: 10 }}>

                <TouchableOpacity onPress={() => {

                    DocumentPicker.pick({
                        allowMultiSelection: true,
                        type: [types.allFiles],
                    })
                        .then((results) => {
                            console.log("Results = ", JSON.stringify(results, null, 2))
                            setSelectedItems([...selectedItems, ...results])
                        })
                        .catch(handleError)
                }}>
                    <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>Upload Docs</Text>
                </TouchableOpacity>
            </View>

            {selectedItems.length != 0 &&
                <View>
                    <ScrollView horizontal style={{ marginVertical: 20, height: 130, width: ScreenWidth }}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', paddingStart: 20 }}>
                            {selectedItems.map((item, index) => {
                                const name = item?.name || ""
                                const source = item?.type == "image/jpeg" ? { uri: item?.uri } : require("../Assets/Dashboard/ic_3.png")
                                // {
                                //     "fileCopyUri": null,
                                //     "size": 362063,
                                //     "name": "Screenshot_2022-12-04-21-39-47-485_com.facebook.katana.jpg",
                                //     "type": "image/jpeg",
                                //     "uri": "content://com.android.providers.media.documents/document/image%3A252666"
                                //   }
                                function removeItem() {
                                    let indexOf = selectedItems.findIndex(val => val.uri == item.uri);
                                    console.log(indexOf)
                                    if (indexOf != -1) {
                                        let _items = [...selectedItems];
                                        _items.splice(indexOf, 1);
                                        setSelectedItems(_items)
                                        // setSelectedItems(i => {
                                        //     i.splice(indexOf, 1);
                                        //     return i;
                                        // })
                                    }
                                }
                                return (
                                    <View style={{ height: 100, width: 70, marginHorizontal: 10, alignItems: 'center' }}>
                                        <Image style={{ width: 70, height: 70, backgroundColor: "grey", borderRadius: 5 }} source={source} />
                                        <Text adjustsFontSizeToFit={true}>{name}</Text>
                                        <TouchableOpacity onPress={removeItem} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: "red", alignItems: 'center', justifyContent: 'center', position: 'absolute', top: -15, right: -5 }}>
                                            <Text style = {{color : "white" , alignSelf : "center"}}>x</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            }


            <TouchableOpacity style={{ backgroundColor: "#777777", height: 45, alignSelf: "center", justifyContent: "center", width: ScreenWidth - 100, marginTop: 50, borderRadius: 5 }} >
                <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>Post</Text>
            </TouchableOpacity>

        </View >
    )
}

export default ShareADoc