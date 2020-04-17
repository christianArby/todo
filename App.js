import React, { Component } from 'react';

import _ from 'lodash'

import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native';

export default class App extends Component {

    state = {
        list: '',
        userInput: '',
        dict: [],
    }

    addToDo = (newTodo) => {
        this.setState({ list: this.state.list.concat(this.state.userInput) })

        let copyDict = this.state.dict;
        copyDict[this.state.userInput] = false;

        this.setState({ dict: copyDict });
        console.log((this.state.dict));
    }

    updateUserInput = (text) => {
        this.setState({ userInput: text })
    }

    toggleDone = (key) => {
        let copyDict = this.state.dict;
        if (this.state.dict[key]) {
            copyDict[key] = false;
        } else {
            copyDict[key] = true;
        }
        this.setState({ dict: copyDict });
        console.log((this.state.dict));
    }

    removeTodo = (key) => {
        let copyDict = this.state.dict;
        delete copyDict[key];
        this.setState({ dict: copyDict });
        console.log((this.state.dict));
    }

    renderItem = ({ item }) => {
        const text = `${item}`;

        if (this.state.dict[item]) {
            return (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableNativeFeedback onPress={() => this.toggleDone(item)}>
                        <Text style={{ flex: 0.8, width: "100%", height: 48, backgroundColor: "white" }}>
                            {text}
                        </Text>

                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => this.removeTodo(item)}>
                        <Text style={{ flex: 0.2, width: "100%", height: 48, backgroundColor: "blue" }}>
                            {'X'}
                        </Text>

                    </TouchableNativeFeedback>

                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableNativeFeedback onPress={() => this.toggleDone(item)}>
                        <Text style={{ flex: 0.8, width: "100%", height: 48, backgroundColor: "red" }}>
                            {text}
                        </Text>

                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => this.removeTodo(item)}>
                        <Text style={{ flex: 0.2, width: "100%", height: 48, backgroundColor: "blue" }}>
                            {'X'}
                        </Text>

                    </TouchableNativeFeedback>

                </View>

            );
        }


    };

    render() {
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 1, padding: 16 }}>
                    <FlatList style={{ flex: 1, backgroundColor: "#aaa", borderColor: "gray", borderWidth: 1 }}
                        renderItem={this.renderItem}
                        data={_.keys(this.state.dict)}
                        keyExtractor={item => `${item}`}

                    />
                </View>

                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.updateUserInput(text)}
                    ref={input => { this.textInput = input }}
                />


                <Button
                    onPress={() => {
                        this.addToDo();
                        this.textInput.clear()
                    }}
                    title="Add todo"
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 10,
        height: 44,
    },
})
