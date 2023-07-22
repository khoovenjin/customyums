import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import AppImage from './AppImage';
import AppText from './AppText';

function AppCard({
  image,
  title,
  description,
  tags
}) {
  return (
    <View style={ styles.container }>
      <AppImage image={ image } />
      <View style={ styles.detailsContainer }>
        <AppText>{ title }</AppText>
        <AppText>{ description }</AppText>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  detailsContainer: {

  }
})

export default AppCard;