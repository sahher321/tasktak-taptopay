import React, {useState} from 'react';
import {View, Pressable, Platform, StyleSheet, Text, Image} from 'react-native';
import {Images} from '../Utilities/images';
import DateTimePicker from '@react-native-community/datetimepicker';

export const SingleDatepicker = ({title = "Date / Time", date, setDate}) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(Platform.OS === 'ios');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === "android") setShow(false);
    setDate(currentDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    if (Platform.OS === "android") setShow(true);
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <Text style={styles.labelText}>
        {title}
      </Text>
      <Pressable
        onPress={showDatepicker}
        style={styles.datestyling}>
        {show &&
          <DateTimePicker
            mode={mode}
            value={date}
            is24Hour={true}
            display="default"
            onChange={onChange}
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
          />
        }
        <Image
          style={styles.icon1}
          source={Images.Pictures.date}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dflex: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  datestyling: {
    height: 60,
    padding: 9,
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    shadowRadius: 2,
    display: 'flex',
    borderRadius: 4,
    position: 'relative',
    borderColor: '#E2E2E2',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  icon1: {
    right: 13,
    width: 15,
    height: 15,
    objectfit: 'cover',
    position: 'absolute',
  }
});
