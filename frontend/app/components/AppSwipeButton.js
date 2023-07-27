import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, interpolateColor, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import defaultStyles from '../config/styles';

function AppSwipeButton({
  onToggle,
  text,
  padding = 20,
  preButtonColor = defaultStyles.colors.white,
  postButtonColor = defaultStyles.colors.primary_green,
  textColor = defaultStyles.colors.secondary_brown,
  waveColor = defaultStyles.colors.primary_green
}) {
  const buttonHeight = 50;
  const buttonWidth = defaultStyles.size.width - ( padding * 2 );
  const buttonPadding = 5;
  const swipeableDimensions = buttonHeight - 2 * buttonPadding;
  const waveHeightRange = swipeableDimensions + 2 * buttonPadding;
  const swipeHeightRange = buttonWidth - 2 * buttonPadding - swipeableDimensions;

  const [ toggled, setToggled ] = useState( false );
  const xCoordinate = useSharedValue( 0 );
  const interpolateXInput = [ 0, swipeHeightRange ];

  const handleComplete = ( isToggled ) => {
    if( isToggled !== toggled ) {
      setToggled( isToggled );
      onToggle( isToggled );
    }
  }

  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart:( _, context ) => {
      context.completed = toggled;
    },
    onActive: ( event, context ) => {
      const updatedValue = context.completed? swipeHeightRange + event.translationX : event.translationX;

      if( updatedValue >= 0 && updatedValue <= swipeHeightRange )
        xCoordinate.value = updatedValue;
    },
    onEnd: () => {
      const absoluteMid = buttonWidth / 2 - swipeableDimensions / 2;

      if( xCoordinate.value < absoluteMid ) {
        xCoordinate.value = withSpring( 0 );
        runOnJS( handleComplete )( false );
      }
      else {
        xCoordinate.value = withSpring( swipeHeightRange );
        runOnJS( setToggled )( true );
      }
    }
  });

  const animatedStyles = {
    swipeable: useAnimatedStyle(() => ({
      transform: [{ translateX: xCoordinate.value }],
      backgroundColor: interpolateColor(
        xCoordinate.value,
        [ 0, buttonWidth - swipeableDimensions - buttonPadding ],
        [ preButtonColor, postButtonColor ]
      )
    })),
    swipeText: useAnimatedStyle(() => ({
      opacity: interpolate( xCoordinate.value, interpolateXInput, [ 0.8, 0 ], Extrapolate.CLAMP ),
      transform: [{
        translateX: interpolate(
          xCoordinate.value,
          interpolateXInput,
          [ 0, buttonWidth / 2 - swipeableDimensions, Extrapolate.CLAMP ]
        )
      }]
    })),
    colorWave: useAnimatedStyle(() => ({
      width: waveHeightRange + xCoordinate.value,
      opacity: interpolate( xCoordinate.value, interpolateXInput, [ 0, 1 ] )
    }))
  }

  return (
    <GestureHandlerRootView>
      <View style={[
        styles.container, 
        { 
          borderRadius: buttonHeight,
          padding: buttonPadding,
          height: buttonHeight,
          width: buttonWidth
        }
      ]}>
        <Animated.View style={[
          styles.colorWave,
          {
            backgroundColor: waveColor,
            borderRadius: buttonHeight,
            height: buttonHeight
          },
          animatedStyles.colorWave
        ]} />
        <PanGestureHandler onGestureEvent={ animatedGestureHandler }>
          <Animated.View style={[
            styles.button,
            {
              left: buttonPadding,
              borderRadius: swipeableDimensions,
              height: swipeableDimensions,
              width: swipeableDimensions
            },
            animatedStyles.swipeable
          ]}></Animated.View>
        </PanGestureHandler>
        <Animated.Text style={[ defaultStyles.text, styles.text, { color: textColor }, animatedStyles.swipeText ]}>{ text }</Animated.Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 2
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: defaultStyles.colors.primary,
    display: 'flex'
  },
  colorWave: {
    left: 0,
    position: 'absolute'
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    zIndex: 1
  }
})

export default AppSwipeButton;