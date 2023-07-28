import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import AppText from './AppText';
import defaultStyles from '../config/styles';

function AppDate({
  container,
  day,
  dayStyle,
  date,
  dateStyle,
  onPress
}) {
  return (
    <TouchableWithoutFeedback onPress={ onPress }>
      <View style={[ styles.container, container ]}>
        <AppText style={[ defaultStyles.text, styles.text, styles.day, dayStyle ]}>
          { day }
        </AppText>
        <AppText style={[ defaultStyles.text, styles.text, styles.date, dateStyle ]}>
          { date }
        </AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: defaultStyles.colors.white,
    borderColor: defaultStyles.colors.primary_brown,
    borderRadius: 5,
    borderWidth: 1
  },
  day: {
    fontWeight: 'bold'
  },
  date: {
    fontSize: 14
  },
  text: {
    color: defaultStyles.colors.primary_brown
  }
})

export default AppDate;