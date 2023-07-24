import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';

function AppIcon({
    backgroundColor = defaultStyles.colors.white,
    color = defaultStyles.colors.black,
    containerStyle,
    name,
    onPress,
    size = 40
}) {
    const halfSize = size/2;

    return (
        <TouchableWithoutFeedback onPress={ onPress }>
            <View style={[
                {
                    alignItems: "center",
                    backgroundColor,
                    borderRadius: halfSize,
                    height: size,
                    justifyContent: "center",
                    width: size
                },
                containerStyle
            ]}>
                <MaterialCommunityIcons name={ name } color={ color } size={ halfSize }/>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default AppIcon;