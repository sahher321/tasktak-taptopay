import React, { useState } from "react"
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'

export const PhoneInput = (props, {
    onPress = () => { },
    placeholder = null,
    secureTextEntry,
    eyeIcon = null,
    container = {},
    onChange = text => { },
    value = '',
    onBlur = () => { },

}) => {
    const [toggle, setToggle] = useState(false)
    const [text, settext] = useState(value)
 
    return (
        <>
            <View>
                <View>
                    <Text style={styles.labelText}>{props.title}</Text>
                </View>
                <View style={[styles.input, container]}>
                    <TextInput placeholder={props.name} keyboardType="numeric" style={styles.Inputstyle} />
                </View>
            </View>
         </>
    )
}



const styles = StyleSheet.create({
    input: {
        height: 60,
        marginTop: 10,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 4,
        fontSize: 17,
        padding: 5,
        backgroundColor: '#fff',
    },
    Inputstyle: {
        fontSize: 16,
        color: '#000',
    },
    labelText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        marginTop: 20,
    },




})