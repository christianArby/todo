import React, { Component } from 'react';

import _ from 'lodash'
import moment from "moment";

import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { Icon } from 'react-native-elements'

export default class App extends Component {

    state = {
        userInput: '',
        dict: [],
        data: [],
        addItemExplanationVisible: true,
        isLoading: true,
        fabVisible: true
    }

    toggleFab = (boolean) => {
        this.setState({ fabVisible: boolean })
    }

    checkIfDateHeader = (item) => {
        if (Object.keys(this.state.dict).length > 0) {

            let moment1 = new moment(new Date(this.state.dict[item].ts));
            let moment2 = new moment(new Date(this.state.dict['0'].ts));

            if (moment1.isSame(moment2, 'day') && moment1.isSame(moment2, 'date')) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }

    }

    setaddItemExplanationVisible = (boolean) => {
        this.setState({ addItemExplanationVisible: boolean });
    }

    addToDo = (newTodo) => {
        let copyDict = this.state.dict;
        var today = Math.round((new Date()).getTime());
        copyDict[this.state.userInput] = { completed: false, ts: today, text: this.state.userInput }
        this.setState({ dict: copyDict});
    }

    handleKeyDown = () => {
        if (e.nativeEvent.key == "Enter") {
            alert('hej');
        } else {
            alert('nope');
        }
    }

    getDate = (timestamp) => {

        let momentDate = new moment(new Date(timestamp));
        // Will display time in 10:30:23 format
        let formattedDate = momentDate.format("MMMM D, YYYY");
        return (formattedDate);
    }

    setFabVisible = (boolean) => {
        this.setState({ fabVisible: boolean });
    }

    updateUserInput = (text) => {
        this.setState({ userInput: text })
    }

    toggleDone = (key) => {
        let copyDict = this.state.dict;
        if (this.state.dict[key].completed) {
            copyDict[key].completed = false;
        } else {
            copyDict[key].completed = true;
        }
        this.setState({ dict: copyDict });
    }

    removeTodo = (key) => {

        let copyDict = this.state.dict;

        delete copyDict[key];

        if (Object.keys(this.state.dict).length === 1) {
            this.setState({ dict: copyDict, userInput: '', addItemExplanationVisible: true });
        } else {
            this.setState({ dict: copyDict, userInput: '' });
        }
    }

    render() {

        const getAddItemField = this.state.addItemExplanationVisible ? (
            <TouchableNativeFeedback onPress={() => {
                this.setaddItemExplanationVisible(false)
            }}>
                <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ alignSelf: 'stretch', margin: 32, padding: 10, flexDirection: 'row', height: 50, borderColor: 'lightgray', borderWidth: 1, borderRadius: 25, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableNativeFeedback
                            onPress={() => {
                                this.setaddItemExplanationVisible(false)
                            }}>

                            <View style={{ padding: 5, flexDirection: 'row' }} >
                                <Icon
                                    name='add'
                                    type='material'
                                    color='white'
                                    onPress={() => {
                                        this.setaddItemExplanationVisible(false)
                                    }}
                                />
                                <Text style={{ fontSize: 16, color: 'white', paddingStart: 8 }}>
                                    {'Add item'}
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </TouchableNativeFeedback>
        ) : (
                <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ alignSelf: 'stretch', margin: 32, padding: 10, flexDirection: 'row', height: 50, borderColor: 'lightgray', borderWidth: 1, borderRadius: 25, backgroundColor: 'white', alignItems: 'center' }}>
                        <TextInput style={{ flexGrow: 1, height: 40, paddingStart: 10 }}
                            onChangeText={text => this.updateUserInput(text)}
                            ref={input => { this.textInput = input }}
                            autoFocus={true}
                            onSubmitEditing={() => {
                                this.addToDo();
                                this.textInput.clear()
                            }}
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

            );

        const getInputOrFab = this.state.fabVisible ? (
            <TouchableNativeFeedback onPress={() => {
                this.toggleFab(!this.state.fabVisible);
            }}>
                <View style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: 'black',
                    position: 'absolute',
                    top: 60,
                    right: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Icon
                        type='material'
                        color='white'
                        name='add'>
                    </Icon>
                </View>
            </TouchableNativeFeedback>
        ) : (
                <View style={{ position: 'absolute', top: 40, left: 0, right: 0, bottom: 0 }}>
                    <View style={{ alignSelf: 'stretch', margin: 20, padding: 10, flexDirection: 'row', height: 60, borderColor: 'lightgray', borderWidth: 1, borderRadius: 30, backgroundColor: 'white', alignItems: 'center' }}>
                        <TextInput style={{ flexGrow: 1, height: 40, paddingStart: 10 }}
                            onChangeText={text => this.updateUserInput(text)}
                            ref={input => { this.textInput = input }}
                            autoFocus={true}
                            onSubmitEditing={() => {
                                this.addToDo();
                                this.textInput.clear()
                                this.setFabVisible(true)
                            }}
                        />
                        <View style={{ padding: 5 }} >
                            <Icon
                                name='add'
                                type='material'
                                color='black'
                                onPress={() => {
                                    this.addToDo();
                                    this.textInput.clear();
                                    this.setFabVisible(true)
                                }}
                            />
                        </View>
                    </View>
                </View>
            );

        const getPage = Object.keys(this.state.dict).length === 0 ? (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'red' }} >
                <FirstPage />
                {getAddItemField}

            </View>

        ) : (

                <View style={{ flex: 1 }} >

                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 90 }}>
                        <TodoLogo />
                    </View>

                    <View style={{ height: 1, backgroundColor: '#F6F6F6' }}></View>


                    <View style={{ flex: 1, paddingStart: 16, paddingEnd: 16, paddingTop: 26, backgroundColor: 'white' }}>
                        <FlatList style={{ flex: 1 }}
                            renderItem={this.renderItem}
                            data={_.keys(this.state.dict)}
                            keyExtractor={item => `${item}`}
                        />
                    </View>

                    {getInputOrFab}

                </View>

            );

        return (
            <View style={{ flex: 1 }}>
                {getPage}
            </View>);

    }

    renderItem = ({ item }) => {

   
       

        

        if (this.state.dict[item].completed) {
            return (
                <View style={{ flex: 1 }}>

                

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <Icon
                            type='material'
                            name='lens'
                            color='black'
                            size={20}
                            onPress={() => this.removeTodo(item)}>
                        </Icon>

                        <TouchableNativeFeedback onPress={() => this.toggleDone(item)}>
                            <Text style={{ flex: 0.9, width: "100%", backgroundColor: "white", fontSize: 16, padding: 20, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                                {item}
                            </Text>

                        </TouchableNativeFeedback>

                        <Icon
                            type='material'
                            name='clear'
                            color='black'
                            onPress={() => this.removeTodo(item)}>
                        </Icon>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#F6F6F6' }}></View>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1 }}>

                   

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <Icon
                            type='material'
                            name='radio-button-unchecked'
                            color='#F6F6F6'
                            size={20}
                            onPress={() => this.removeTodo(item)}>
                        </Icon>

                        <TouchableNativeFeedback onPress={() => this.toggleDone(item)}>
                            <Text style={{ flex: 0.9, width: "100%", backgroundColor: "white", fontSize: 16, padding: 20 }}>
                                {item}
                            </Text>

                        </TouchableNativeFeedback>

                        <Icon
                            style='material'
                            name='clear'
                            color='black'
                            onPress={() => this.removeTodo(item)}>
                        </Icon>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#F6F6F6' }}></View>
                </View>

            );
        }

    };
}

function FirstPage() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <TodoLogo />
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

function TodoLogo() {
    return (
        <Text style={{ fontSize: 26 }}>
            {'todo'}
        </Text>
    )
}
