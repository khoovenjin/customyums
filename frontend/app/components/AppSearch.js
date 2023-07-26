import React from 'react';
import { StyleSheet } from 'react-native';

import AppTextInput from './AppTextInput';

function AppSearch({
  onChange,
  icon = 'magnify',
  placeholder = 'Search...',
  ...otherProps 
}, ref ) {
  return (
    <AppTextInput
      onChangeText={ onChange }
      icon={ icon }
      placeholder={ placeholder }
      ref={ ref }
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({

})

export default React.forwardRef( AppSearch );