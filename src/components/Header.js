//import libs
import React, { Component } from 'react';
import { Text, View } from 'react-native';

// make a component
const Header = (props) => {
    const { fontStyle, viewStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={fontStyle}>{ props.headerText }</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 30,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    fontStyle: {
        fontSize: 20
    }
  
};

// make componet available to other parts of the app
export default Header;
