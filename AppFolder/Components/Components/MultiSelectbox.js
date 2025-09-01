import React, { useState } from 'react'
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native';
import SelectBox from 'react-native-multi-selectbox'
import { Images } from '../../utilites/images';
import { xorBy } from 'lodash'

// Options data must contain 'item' & 'id' keys


const K_OPTIONS = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },

  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
]

export const Multiselection = ({ data = K_OPTIONS, selectedTeams, setSelectedTeams }) => {
  const [selectedTeam, setSelectedTeam] = useState({})
  // const [selectedTeams, setSelectedTeams] = useState([])
  return (
    <>
      <SelectBox
        listOptionProps={{ nestedScrollEnabled: true }}
        label={false}
        multiOptionContainerStyle={{
          height: 40,
          shadowRadius: 2,
          borderWidth: 1,
          borderColor: '#E2E2E2',
          borderRadius: 4,
          padding: 3,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFB156',
        }}
        containerStyle={{
          height: 60,
          shadowRadius: 2,
          borderWidth: 1,
          borderColor: '#E2E2E2',
          borderRadius: 4,
          paddingLeft: 10,
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
        }}
        searchIconComponent={{
          color: '#E2E2E2',
        }}
        searchPlaceholderTextColor={{
          color: '#fff',
        }}
        options={data}
        selectedValues={selectedTeams}
        // onMultiSelect={onMultiChange()}
        onMultiSelect={(item) => {
          console.log("items")
          console.log(item)
          setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
          console.log("SELECTED TEAMS")
          console.log(selectedTeams)
        }}
        onTapClose={onMultiChange()}
        isMulti
        arrowIconColor='#FFB156'
        itemIconStyle='#ccc'
        searchIconColor='#FFB156'
        toggleIconColor='#FFB156' />
    </>
  )

  function onMultiChange() {
    console.log("")
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }

  function onChange() {
    return (val) => setSelectedTeam(val)
  }
}

const styles = StyleSheet.create({

  colorchange: {
    color: '#000'
  },
  searchBar: {
    color: '#fff',
  }

});
