import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import AppText from './AppText';

function AppListItem({
  PrescriptComponent,
  prescriptStyle,
  containerStyle,
  detailsContainerStyle,
  onPress,
  textStyle,
  title,
  titleStyle,
  titleContainerStyle,
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
          <View style={[ styles.titleContainer, titleContainerStyle ]}>
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
    marginRight: 20
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  titleContainer: {
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