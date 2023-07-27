import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import AppText from './AppText';
import defaultStyles from '../config/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function AppIndexText({
  addItem,
  removeItem,
  containerStyle,
  index,
  indexContainerStyle,
  text
}) {
  const [ checked, setChecked ] = useState( false );

  const onPress = () => {
    if( checked )
      addItem( text );
    else
      removeItem( text );

    setChecked( !checked );
  }

  return (
    <TouchableWithoutFeedback onPress={ addItem && removeItem && onPress }>
      <View style={[ styles.container, containerStyle ]}>
        <View style={[
          styles.indexContainer,
          indexContainerStyle,
          { backgroundColor: checked? defaultStyles.colors.secondary_green : defaultStyles.colors.primary_grey }
        ]}>
          { checked?
            <MaterialCommunityIcons
              name="check-bold"
              color={ defaultStyles.colors.primary_green }
              size={ 20 }
            />
            :
            <AppText style={[
              defaultStyles.text,
              styles.index
            ]}>
              { index }
            </AppText>
          }
        </View>
        <AppText style={[ defaultStyles.text, styles.text ]}>{ text }</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  index: {
    fontSize: 12,
    color: defaultStyles.colors.white,
    fontWeight: 'bold'
  },
  indexContainer: {
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.primary_grey,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    marginRight: 10,
    width: 30
  },
  text: {
    fontSize: 14
  }
})

export default AppIndexText;