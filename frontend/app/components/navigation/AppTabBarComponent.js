import React, { useRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import Animated, { withTiming, useAnimatedStyle } from 'react-native-reanimated';

import AppText from '../AppText';
import defaultStyles from '../../config/styles';

function AppTabBarComponent({
  active,
  options,
  onLayout,
  onPress
}) {
  const ref = useRef( null );

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming( active? 1 : 0, { duration: 250 })
        }
      ]
    }
  })

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming( active? 1: 0.5, { duration: 250 })
    }
  })

  return (
    <Pressable onPress={ onPress } onLayout={ onLayout } style={ styles.container }>
      <Animated.View style={[ styles.componentCircle, animatedComponentCircleStyles ]} />
      <Animated.View style={[ styles.iconContainer, animatedIconContainerStyles ]}>
        { options.tabBarIcon? options.tabBarIcon({ ref }) : <AppText>?</AppText> }
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    marginTop: -5
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: defaultStyles.colors.white
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default AppTabBarComponent;