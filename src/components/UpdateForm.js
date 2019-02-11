import React, { Component } from 'react';
import { View, ActionSheetIOS, Text, Picker } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Input from './Input';

export default class UpdateForm extends Component{

    state = {
        amount: '',
        desc: '',
        cat: ''
    }

    render() {
        return (
            <View>
                <Card>
                    <CardSection>
                    <Input
                        placeholder='$0.00'
                        label='Amount'
                        value={this.state.amount}
                        onChangeText={updatedText => this.setState({ amount: updatedText })}
                    />
                    </CardSection>

                    <CardSection>
                    <Input
                        placeholder='description'
                        label='Description'
                        value={this.state.desc}
                        onChangeText={updatedText => this.setState({ desc: updatedText })}
                    />
                    </CardSection>

                    <CardSection>
                        <Text 
                            style={styles.textStyle}
                            placeholder='category'
                            onPress={this.showActionSheet.bind(this)}/>
                            {/* <Picker 
                            selectedValue={this.state.cat}
                            style={{height: 500, width: 300}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({language: itemValue})
                            }>
                            <Picker.Item label="kim" value="Kim"/>
                            <Picker.Item label="justin" value="Justin"/>
                            <Picker.Item label="bob" value="Bob"/>
                            <Picker.Item label="kim" value="Kim"/>
                            </Picker> */}
                    </CardSection>

                    <CardSection>

                    </CardSection>

                </Card>
            </View>
        );
    }

    showActionSheet = () => {
        var categories = [
            'Transportation',
            'Food',
            'Entertainment',
            'Housing',
            'Cancel',
            'Delete',
        ];

        console.log('showActionSheet');

        ActionSheetIOS.showActionSheetWithOptions({
            options: categories,
            cancelButtonIndex: 4,
            destructiveButtonIndex: 5,
        },
        (buttonIndex) => {
            this.setState({cat: categories[buttonIndex]})
        });
    }
};

const styles ={
    textStyle: {
        color: 'black',
        // paddingRight: 5,
        // paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 1
    }
}