import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

function Seperator({ width }) {
  return (
    <View style={{ width }}/>
  );
}

function AppHorizontal({
  containerStyle,
  data,
  seperatorWidth = 5,
  renderItem
}) {
  return (
    <View style={[ styles.container, containerStyle ]}>
      <FlatList
        data={ data }
        keyExtractor={( item, index ) => index.toString()}
        renderItem={ renderItem }
        ItemSeparatorComponent={ <Seperator width={ seperatorWidth }/> }
        horizontal
        showsHorizontalScrollIndicator={ false }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  }
})

export default AppHorizontal;