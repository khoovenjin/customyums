import React from 'react';

import { useFormikContext } from 'formik';

import AppErrorMessage from './AppErrorMessage';
import AppTextInput from '../AppTextInput';

function AppFormField({
  name,
  width,
  ...otherProps
}, ref ) {
  const {
    errors, 
    setFieldTouched, 
    setFieldValue, 
    touched,
    values
  } = useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched( name )}
        onChangeText={text => setFieldValue( name, text )}
        value={ values[ name ] }
        width={ width }
        ref={ ref }
        {...otherProps}
      />
      <AppErrorMessage error={ errors[ name ] } visible={ touched[ name ] }/>
    </>
  );
}

export default React.forwardRef( AppFormField );