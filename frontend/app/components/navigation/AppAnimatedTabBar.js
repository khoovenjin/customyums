import React, { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import Svg, { Path } from "react-native-svg"

import AppTabBarComponent from './AppTabBarComponent';
import defaultStyles from '../../config/styles';

const AnimatedSvg = Animated.createAnimatedComponent( Svg );

function AppAnimatedTabBar({ state, navigation, descriptors }) {
  const reducer = ( state, action ) => {
    return [ ...state, { x: action.x, index: action.index } ]
  }
  
  const [ layout, dispatch ] = useReducer( reducer, [] );

  const handleLayout = ( event, index ) => {
    dispatch({ x: event.nativeEvent.layout.x, index })
  }

  const xOffset = useDerivedValue(() => {
    if( layout.length !== state?.routes?.length ) return 0;

    return [ ...layout ].find(({ index }) => index === state?.index ).x - 25
  }, [ state?.index, layout ])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming( xOffset.value, { duration: 250 } ) }]
    }
  })

  return (
    <View
      style={[ styles.tabBar ]}
    >
      <AnimatedSvg
        width={ 110 }
        height={ 60 }
        viewBox="0 0 110 60"
        style={[ styles.activeBackground, animatedStyles ]}
      >
        <Path
          fill={ defaultStyles.colors.primary }
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={ styles.tabBarContainer }>
        { state?.routes.map(( route, index ) => {
          const active = index === state.index;
          const { options } = descriptors[ route.key ]

          return (
            <AppTabBarComponent
              key={ route.key }
              active = { active }
              options={ options }
              onLayout={( event ) => handleLayout( event, index )}
              onPress={() => navigation.navigate( route.name )}
            />
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeBackground: {
    position: 'absolute'
  },
  tabBar: {
    backgroundColor: defaultStyles.colors.white
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})

export default AppAnimatedTabBar;