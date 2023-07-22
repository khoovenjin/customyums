import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View  } from 'react-native';

import AppText from './AppText';
import defaultStyles from '../config/styles';

function AppButton({
    color = "white",
    onPress,
    style,
    textStyle,
    title,
    ...otherProps
}, ref) {
    return (
        <TouchableWithoutFeedback onPress={ onPress }>
            <View style={[ styles.container, style, { backgroundColor: defaultStyles.colors[color] }]} ref={ ref }>
                <AppText style={[ styles.text, textStyle ]} {...otherProps}>
                    { title }
                </AppText>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: defaultStyles.colors.white,
        borderColor: defaultStyles.colors.pink,
        borderWidth: 2,
        justifyContent: "center",
        padding: 10
    },
    text: {
        color: defaultStyles.colors.primary,
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
    }
})

export default React.forwardRef(AppButton);