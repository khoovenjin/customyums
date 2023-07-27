import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppButton from './AppButton';
import AppModal from './AppModal';
import AppText from './AppText';

import defaultStyles from '../config/styles';

function AppAlert({
  alertStyle,
  button,
  close,
  EventComponent,
  icon,
  iconColor,
  overlayStyle,
  size,
  subTitle,
  subtitleStyle,
  title,
  titleStyle
}) {
  const [ showModal, setShowModal ] = useState(false);

  const ModalContent = (
    <>
      { close && <TouchableWithoutFeedback onPress={() => setShowModal( false )}>
        <View style={ styles.close }>
          <MaterialCommunityIcons 
            name="close-thick" 
            size={ 25 } 
            color={ defaultStyles.colors.primary_brown }
          />
        </View>
      </TouchableWithoutFeedback> }
      <View style={ styles.alert }>
        <MaterialCommunityIcons 
          name={ icon } 
          size={ size } 
          color={ iconColor }
        />
        { title && <AppText 
          adjustsFontSizeToFit={ true } 
          numberOfLines={ 3 } 
          style={[ styles.text, titleStyle ]}>
            { title }
        </AppText> }
        { subTitle && <AppText 
          adjustsFontSizeToFit={ true } 
          numberOfLines={ 3 } 
          style={[ styles.text, subtitleStyle ]}>
            { subTitle }
        </AppText> }
        { button && <View style={ styles.button }>
          { button.length > 1?
            <FlatList
              columnWrapperStyle={ styles.buttonWrapper }
              data={ button }
              keyExtractor={( item, index ) => index.toString() }
              numColumns={ button.length }
              renderItem={({ item }) =>
                <AppButton
                  color={ item.color }
                  onPress={ item.event }
                  style={ item.style }
                  textStyle={ item.textStyle }
                  title={ item.title }
                />
              }
            />
          :
            <FlatList
              data={ button }
              keyExtractor={( item, index ) => index.toString() }
              renderItem={({ item }) => 
              <AppButton
                color={ item.color }
                onPress={ item.event }
                style={ item.style }
                textStyle={ item.textStyle }
                title={ item.title }
                />
              }
            />
          }
        </View> }
      </View>
    </>
  );

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowModal( true )}>
        { EventComponent }
      </TouchableWithoutFeedback>
      <AppModal
        animationType="none" 
        transparent={ true }
        visible={ showModal }
        ModalComponent={
          <>
            <TouchableWithoutFeedback onPress={() => setShowModal( false )}>
              <View style={[ styles.overlay, overlayStyle ]}/>
            </TouchableWithoutFeedback>
            <View style={ styles.container }>
              <View style={[ styles.alertContainer, alertStyle ]}>
                { ModalContent }
              </View>
            </View>
          </>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  alert: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 25
  },
  alertContainer: {
    alignSelf: 'center',
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 10,
    height: '45%',
    width: '80%'
  },
  button: {
    flexDirection: 'row'
  },
  buttonWrapper: { 
    justifyContent: 'space-evenly' 
  },
  close: {
    right: 10,
    top: 10,
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  overlay: {
    backgroundColor: defaultStyles.colors.translucent,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute'
  },
  text: {
    color: defaultStyles.colors.primary_brown,
    fontSize: 14,
    textAlign: 'center'
  }
});

export default AppAlert;