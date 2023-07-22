import React from 'react';
import { View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';

function AppIcon({
    backgroundColor = defaultStyles.colors.white,
    color = defaultStyles.colors.black,
    name,
    size = 40
}) {
    const halfSize = size/2;

    return (
        <View style={{
            alignItems: "center",
            backgroundColor,
            borderRadius: halfSize,
            height: size,
            justifyContent: "center",
            width: size
        }}>
            <MaterialCommunityIcons name={ name } color={ color } size={ halfSize }/>
        </View>
    );
}

export default AppIcon;