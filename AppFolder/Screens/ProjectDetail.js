import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { APP_URL, GetProDetail } from "../Components/Api";



const ProjectDetail = (props) => {
    const proID = props?.item?.id || 0
    const name = props?.item?.name || ""
    const description = props?.item?.description || ""
    const deadline = props?.item?.deadline || "Not set"
    const [dataProjectDetail, setDataAllProjects] = useState([]);
    
    useEffect(() => {
        console.log(`Project ID =`, proID)
        apiPost();
    }, []);
    const apiPost = async (s) => {

        console.log(`url is =`, GetProDetail + proID)

        axios.get(APP_URL.BaseUrl + GetProDetail + proID, { "keysearch": "" })
            .then(data => {
                console.log(`DATA is = ${JSON.stringify(data.data[0].taskDetail, null, 2)}`)
                // setApiData([])
                setDataAllProjects(data.data[0].taskDetail);
            })
            .catch(e => {
                console.log(`Error =`, e)
            })
    };
    // props.item.description
    // useEffect(() => {

    //     console.log("get detail Data", props.item.name)

    //     apiPost()
    // }, [])


   
    return (
        <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={{ fontSize: 18, marginTop: "8%" }}>{name}</Text>
            <Text style={{ fontSize: 14, marginTop: 15, color: "#868696" , marginRight :10 }}>{description}</Text>
            <View style={{ width: "50%", backgroundColor: "#F1F1F1", alignItems: "center", borderRadius: 10, marginTop: 15, flexDirection: "row", height: 40 }}>
                <Image style={{ width: 20, height: 20 }} source={require("../Assets/ic_calender.png")} />

                <Text style={{ fontSize: 14, marginLeft: 10 }}>Deadline</Text>
                <Text style={{ fontSize: 12, marginLeft: 10 }}>{deadline}</Text>

            </View>

            <Text style={{ fontSize: 15, marginTop: 15 }}>Team Members</Text>

            <View style={{ justifyContent: "space-between", marginEnd: 100, alignItems: "center", borderRadius: 10, marginTop: 15, flexDirection: "row", height: 40 }}>

                <Image style={{ width: 35, height: 35 }} source={require("../Assets/ic_circle.png")} />
                <Image style={{ width: 35, height: 35 }} source={require("../Assets/ic_circle.png")} />
                <Image style={{ width: 35, height: 35 }} source={require("../Assets/ic_circle.png")} />
                <Image style={{ width: 35, height: 35 }} source={require("../Assets/ic_circle.png")} />
                <Image style={{ width: 35, height: 35 }} source={require("../Assets/ic_circle.png")} />

            </View>

            <Text style={{ fontSize: 15, marginTop: 15 }}>Tasks</Text>


            <FlatList renderItem={TasksView} data={dataProjectDetail}></FlatList>

            {/* <Image style={{ width: 60, height: 60, alignSelf: "flex-end" }} source={require("../Assets/circleAdd.png")} /> */}


        </View>


    )
}



const TasksView = ({item}) => {
    return (
        <View style={{ alignItems: "center", borderRadius: 10, marginTop: 15, flexDirection: "row", height: 40 }}>
            <Image style={{ width: 35, height: 35 }} source={require("../Assets/ic_list.png")} />

            <View style={{}}>
                <Text style={{ fontSize: 14, marginLeft: 10 }}>{item.name}</Text>
                <Text style={{ fontSize: 12, marginLeft: 10 }}>{item.status==4?"In Progress": item.status==3?"Testing" : item.status==1?"Not Started": ""}</Text>
            </View>

             
        </View>
    )
}

export default ProjectDetail