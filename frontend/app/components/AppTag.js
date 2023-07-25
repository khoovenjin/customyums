import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from './AppText';
import defaultStyles from '../config/styles';

function AppTag({
  color = defaultStyles.colors.white,
  textColor = defaultStyles.colors.black,
  title
}) {
  return (
    <View style={[ styles.container, { backgroundColor: color, borderColor: color }]}>
      <AppText style={[ defaultStyles.text, styles.text, { color: textColor } ]}>
        { title }
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: 'bold'
  }
})

export default AppTag;