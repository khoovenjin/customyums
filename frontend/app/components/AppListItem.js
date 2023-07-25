import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import AppText from './AppText';
import defaultStyles from '../config/styles';

function AppListItem({
  PrescriptComponent,
  prescriptStyle,
  containerStyle,
  detailsContainerStyle,
  onPress,
  textStyle,
  textContainerStyle,
  title,
  titleStyle,
  subTitle,
  subTitleStyle,
  PostscriptComponent,
  postscriptStyle
}) {
  return (
    <TouchableWithoutFeedback onPress={ onPress }>
      <View style={[ styles.container, containerStyle ]}>
        { PrescriptComponent && <View style={[ styles.prescriptStyle, prescriptStyle ]}>
          { PrescriptComponent }
        </View> }
        <View style={[ styles.detailsContainer, detailsContainerStyle ]}>
          <View style={[ styles.textContainer, textContainerStyle ]}>
            <AppText style={[ styles.text, textStyle, titleStyle ]}>{ title }</AppText>
            { subTitle && <AppText numberOfLines={3} style={{ ...styles.text, ...textStyle, ...subTitleStyle }}>
              { subTitle }
            </AppText> }
          </View>
          { PostscriptComponent && <View style={[ styles.postscriptContainer, postscriptStyle ]}>
            { PostscriptComponent }
          </View> }
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  prescriptStyle: {
    marginRight: 10
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    marginRight: 10
  },
  text: {
    color: defaultStyles.colors.primary,
    fontSize: 14,
    marginVertical: 2
  },
  postscriptContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
})

export default AppListItem;