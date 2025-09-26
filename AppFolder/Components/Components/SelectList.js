import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'


const data = [
  { key: '1', value: '0' },
  { key: '1', value: '0' },
  { key: '1', value: '0' }
]
export const Selectset = ({ arraydata = data, selected, setSelected, onChange, save = "value", defaultOption }) => {

  // const [selected, setSelected] = React.useState("");

  useEffect(() => {
    console.log("ARRAY DATA");
    console.log(JSON.stringify(arraydata, null, 2))
  }, [])

  return (
    <>
        <SelectList
          setSelected={(val) => {
            console.log("VAL")
            console.log(val)
            if (onChange != undefined)
              onChange()
            if (setSelected != undefined)
              setSelected(val)
          }}
          data={arraydata}
          defaultOption={defaultOption === undefined ? { key: '1', value: 'Select' } : defaultOption}
          save={save}
          boxStyles={{
            height: 60,
            marginTop: 10,
            shadowRadius: 2,
            borderWidth: 1,
            borderColor: '#E2E2E2',
            borderRadius: 4,
            padding: 3,
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
          }}
          inputStyles={{ fontSize: 17, color: '#ccc' }}
        />
    </>
  );

}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  dflex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  headingh1: {
    fontSize: 20,
    fontWeight: "500",
    color: '#333',
  },

  icon1: {
    width: 20,
    height: 20,
    objectfit: 'cover',
  },
  labelText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  MarginTop: {
    marginTop: 40,
  },
  formMain: {
    marginTop: 20,
  },
  MarTop: {
    marginTop: 30,
  }

});
