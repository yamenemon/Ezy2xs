import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {

    const { buttonStyle, titleStyle } = styles;
    return (
        <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
            <Text style={titleStyle}>{props.buttonTitle}</Text>
        </TouchableOpacity>
    );
}

const styles = {
    buttonStyle: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#f4a30b',
        marginLeft: 20,
        marginRight: 20,
        height: 54,
    },

    titleStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        width:60,
        color: '#f4a30b',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 19,
        paddingBottom: 19

    }
}

export default Button;