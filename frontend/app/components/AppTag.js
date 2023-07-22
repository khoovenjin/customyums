import React from 'react';
import { View, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';

function AppTag({
  color = defaultStyles.colors.white,
  title
}) {
  return (
    <View style={{ ...styles.container, backgroundColor: color }}>
      <AppText style={ styles.text }>{ title }</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20
  },
  text: {
    fontSize: 12
  }
})

export default AppTag;