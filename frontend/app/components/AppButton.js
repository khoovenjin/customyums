import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View  } from 'react-native';

import AppText from './AppText';
import defaultStyles from '../config/styles';

function AppButton({
    color = "primary",
    backgroundColor = "white",
    onPress,
    containerStyle,
    textStyle,
    title,
    ...otherProps
}, ref) {
    return (
        <TouchableWithoutFeedback onPress={ onPress }>
            <View style={[
                styles.container,
                containerStyle,
                { borderColor: defaultStyles.colors[ color ], backgroundColor: defaultStyles.colors[ backgroundColor ] }
            ]} ref={ ref }>
                <AppText style={[ styles.text, { color: defaultStyles.colors[ color ] }, textStyle ]} {...otherProps}>
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
        borderColor: defaultStyles.colors.primary,
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