import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

function Separator({ width }) {
  return (
    <View style={{ width }}/>
  );
}

function AppHorizontal({
  containerStyle,
  data,
  separatorWidth = 5,
  renderItem
}) {
  return (
    <View style={[ styles.container, containerStyle ]}>
      <FlatList
        data={ data }
        keyExtractor={( item, index ) => index.toString()}
        renderItem={ renderItem }
        ItemSeparatorComponent={ <Separator width={ separatorWidth }/> }
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