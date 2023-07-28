import React, { useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

import defaultStyles from '../config/styles';

const AnimatedCircle = Animated.createAnimatedComponent( Circle );
const AnimatedText = Animated.createAnimatedComponent( TextInput );

function AppCircularProgress({
  color = defaultStyles.colors.primary_brown,
  progressColor = defaultStyles.colors.primary_grey,
  compositionValue,
  compositionMax,
  delay = 2000,
  radius = 50,
  strokeOpacity = 0.3,
  strokeWidth = 10,
  title
}) {
  const compositionRatio = compositionValue / compositionMax;
  const circumference = radius * ( 2 * Math.PI );
  const halfCircle = radius + strokeWidth;
  const diameter = halfCircle * 2;

  const progress = useSharedValue( 0 );

  useEffect(() => {
    progress.value = withTiming( compositionRatio, { duration: delay } );
  }, []);

  const progressAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * ( 1 - progress.value )
  }), [ progress.value ])

  const textAnimatedProps = useAnimatedProps(() => ({
    text: `${ ( progress.value * compositionMax ).toFixed( 0 ) }g \n${ title }`
  }), [ progress.value ])

  return (
    <View style={ styles.container }>
      <Svg
        height={ diameter }
        viewBox={ `0 0 ${ diameter } ${ diameter }` }
        width={ diameter }
      >
        <G
          rotation='-90'
          origin={ `${ halfCircle }, ${ halfCircle }` }
        >
          <Circle
            cx='50%'
            cy='50%'
            fill='transparent'
            r={ radius }
            stroke={ color }
            strokeOpacity={ strokeOpacity }
            strokeWidth={ strokeWidth }
          />
          <AnimatedCircle
            animatedProps={ progressAnimatedProps }
            cx='50%'
            cy='50%'
            fill='transparent'
            r={ radius }
            stroke={ progressColor }
            strokeDasharray={ circumference }
            strokeDashoffset={ circumference }
            strokeLinecap='round'
            strokeWidth={ strokeWidth }
          />
        </G>
      </Svg>
      <AnimatedText
        numberOfLines={ 2 }
        multiline={ true }
        animatedProps={ textAnimatedProps }
        editable={ false }
        defaultValue='0'
        style={[ StyleSheet.absoluteFillObject, defaultStyles.text, styles.text, { color: progressColor } ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: defaultStyles.colors.transparent,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default AppCircularProgress;
