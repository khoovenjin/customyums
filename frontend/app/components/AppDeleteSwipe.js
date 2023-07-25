import React from 'react';
import { StyleSheet, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import { TouchableWithoutFeedback } from 'react-native';

function AppDeleteSwipe({
  icon = "trash-can",
  size = 30,
  onPress
}) {
  return (
    <TouchableWithoutFeedback onPress={ onPress }>
      <View style={[ styles.container ]}>
        <MaterialCommunityIcons
          name={ icon }
          size={ size }
          color={ defaultStyles.colors.white }
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: defaultStyles.colors.primary_red,
    width: 60
  }
})

export default AppDeleteSwipe;