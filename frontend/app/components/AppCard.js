import React from 'react';
import { FlatList, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

import AppImage from './AppImage';
import AppTag from './AppTag';
import AppText from './AppText';
import defaultStyles from '../config/styles';

function AppCard({
  containerStyle,
  image,
  imageHeight = 150,
  imageWidth = '100%',
  onPress,
  title,
  titleStyle,
  description,
  descriptionStyle,
  tags,
  renderRightActions
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable
        containerStyle={ styles.swipeable }
        renderRightActions={ renderRightActions }
        overshootRight={ false }
      >
        <TouchableWithoutFeedback onPress={ onPress }>
          <View style={[ styles.container, containerStyle ]}>
            <AppImage image={ image } height={ imageHeight } width={ imageWidth } />
            <View style={ styles.detailsContainer }>
              <AppText style={[
                defaultStyles.text,
                styles.text,
                styles.title,
                titleStyle
              ]}>
                { title }
              </AppText>
              <AppText
                numberOfLines={ 2 }
                style={[
                  defaultStyles.text,
                  styles.text,
                  styles.description,
                  descriptionStyle
                ]}>
                { description }
              </AppText>
              { tags &&
                <FlatList
                  numColumns={ tags.length }
                  data={ tags }
                  keyExtractor={( item, index ) => index.toString()}
                  renderItem={({ item }) =>
                    <AppTag
                      title={ item }
                      color={ defaultStyles.colors.secondary }
                      textColor={ defaultStyles.colors.white }
                    />
                  }
                />
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    overflow: 'hidden'
  },
  detailsContainer: {
    padding: 10
  },
  swipeable: {
    backgroundColor: defaultStyles.colors.primary_red,
    borderColor: defaultStyles.colors.primary_brown,
    borderRadius: 15,
    borderWidth: 2
  },
  text: {
    color: defaultStyles.colors.primary_brown
  },
  title: {
    fontWeight: 'bold'
  },
  description: {
    fontSize: 13
  }
})

export default AppCard;