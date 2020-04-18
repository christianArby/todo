import React, { Component } from 'react';

import _ from 'lodash'

import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    TouchableNativeFeedback,
} from 'react-native';

import { Icon } from 'react-native-elements'

export default class App extends Component {

    state = {
        userInput: '',
        dict: [],
        data: [],
        addItemExplanationVisible: true,
        isLoading: true
    }

    setaddItemExplanationVisible = (boolean) => {
        this.setState({ addItemExplanationVisible: boolean });
    }

    addToDo = (newTodo) => {
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
        let dictSize = Object.keys(this.state.dict).length;
        let copyDict = this.state.dict;
        delete copyDict[key];

        
        if (dictSize===1) {
            this.setState({ dict: copyDict, userInput: '', addItemExplanationVisible:true });
        } else {
            this.setState({ dict: copyDict, userInput: ''});
        }
        console.log((this.state.dict));
    }

    render() {
        console.log(Object.keys(this.state.dict).length);
        console.log('A');

        if (Object.keys(this.state.dict).length === 0) {
            if (this.state.addItemExplanationVisible) {
                return (
                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'red' }} >

                        <FirstPage />

                        <TouchableNativeFeedback onPress={() => {
                            this.setaddItemExplanationVisible(false)
                        }}>

                            <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ alignSelf: 'stretch', margin: 32, padding: 10, flexDirection: 'row', height: 50, borderColor: 'lightgray', borderWidth: 1, borderRadius: 25, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableNativeFeedback
                                        onPress={() => {
                                            this.setaddItemExplanationVisible(false)
                                        }}>

                                        <View style={{ padding: 5 , flexDirection:'row'}} >
                                            <Icon
                                                name='add'
                                                type='material'
                                                color='white'
                                                onPress={() => {
                                                    this.setaddItemExplanationVisible(false)
                                                }}
                                            />

                                            <Text style={{ fontSize: 16, color: 'white', paddingStart:8 }}>
                                                {'Add item'}
                                            </Text>
                                        </View>




                                    </TouchableNativeFeedback>



                                </View>
                            </View>


                        </TouchableNativeFeedback>



                    </View>
                )
            } else {
                return (
                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'red' }} >

                        <FirstPage />

                        <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ alignSelf: 'stretch', margin: 32, padding: 10, flexDirection: 'row', height: 50, borderColor: 'lightgray', borderWidth: 1, borderRadius: 25, backgroundColor: 'white', alignItems: 'center' }}>
                                <TextInput style={{ flexGrow: 1, height: 40, paddingStart: 10 }}
                                    onChangeText={text => this.updateUserInput(text)}
                                    ref={input => { this.textInput = input }}
                                />
                                <View style={{ padding: 5 }} >
                                    <Icon
                                        name='add'
                                        type='material'
                                        color='black'
                                        onPress={() => {
                                            this.addToDo();
                                            this.textInput.clear()
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }

        } else {
            console.log('B');
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
}

function FirstPage() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 26 }}>
                    {'todo'}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 8, color: 'gray' }}>
                    {'Monday 25 Sep 2017'}
                </Text>

            </View>

            <View style={{ flex: 1, backgroundColor: '#F6F6F6', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, marginTop: 8, color: 'gray', textAlign: 'center', lineHeight: 26 }}>
                    {'What do you want to do today?\nStart adding items to your to-do list.'}
                </Text>

            </View>
        </View>
    )
}
