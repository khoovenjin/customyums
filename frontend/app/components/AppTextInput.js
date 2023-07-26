import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from '../config/styles.js';

function AppTextInput({
  containerStyle,
  icon,
  iconColor = defaultStyles.colors.primary,
  placeholder,
  placeholderColor = defaultStyles.colors.cream,
  size = 20,
  textStyle,
  width = '100%',
  ...otherProps 
}, ref ) {
  return (
    <View style={[ styles.container, { width }, containerStyle ]}>
      { icon && <MaterialCommunityIcons name={ icon } size={ size } color={ iconColor }/>}
      <TextInput
        placeholder={ placeholder }
        placeholderTextColor={ placeholderColor }
        style={[ defaultStyles.text, styles.text, textStyle ]}
        ref={ ref }
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 10,
    padding: 10
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10
  }
})

export default React.forwardRef( AppTextInput );