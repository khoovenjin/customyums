import React from 'react';
import { Image, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';

function AppImage({
  border,
  height,
  image,
  style,
  width,
  ...otherProps
}) {
  const borderRadius = Math.ceil((( height + width )/2)*0.5);

  return (
    <Image style={[ { height }, { width }, border && ([ styles.border, { borderRadius } ]), style ]} source={ image } {...otherProps}/>
  );
}

const styles = StyleSheet.create({
  border: {
    borderColor: defaultStyles.colors.primary_teal,
    borderWidth: 2
  }
})

export default AppImage;