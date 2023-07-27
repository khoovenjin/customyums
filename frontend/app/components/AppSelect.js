import React, { useState } from 'react';

import defaultStyles from '../config/styles';

import DropDownPicker from 'react-native-dropdown-picker';

function AppSelect({
  items,
  setItems,
  value,
  setValue,
  placeholder,
  searchable = true,
  searchPlaceholder,
  ...otherProps
}) {
  const [ isOpen, setOpen ] = useState( false );

  return (
    <DropDownPicker
      open={ isOpen }
      value={ value }
      items={ items }
      setOpen={ setOpen }
      setValue={ setValue }
      setItems={ setItems }
      searchable={ searchable }
      arrowIconStyle={{
        backgroundColor: defaultStyles.colors.primary,
        tintColor: defaultStyles.colors.primary_brown
      }}
      placeholder={ placeholder }
      placeholderStyle={{
        ...defaultStyles.text,
        color: defaultStyles.colors.secondary,
        fontSize: 16
      }}
      searchPlaceholder={ searchPlaceholder }
      searchTextInputStyle={{
        color: defaultStyles.colors.primary_brown
      }}
      listItemLabelStyle={{
        color: defaultStyles.colors.primary_brown,
        fontWeight: 'bold' 
      }}
      selectedItemContainerStyle={{
        backgroundColor: defaultStyles.colors.primary
      }}
      style={{
        backgroundColor: defaultStyles.colors.primary,
        borderWidth: null,
        borderRadius: null,
        marginBottom: 0,
        paddingLeft: 0,
        paddingBottom: 0
      }}
      labelStyle={{
        ...defaultStyles.text,
        color: defaultStyles.colors.primary_brown,
        fontWeight: 'bold'
      }}
      {...otherProps}
    />
  );
}

export default AppSelect;