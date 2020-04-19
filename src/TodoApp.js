import React, { Component } from 'react';

import _ from 'lodash'
import moment from "moment";

import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableNativeFeedback,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'

import { Icon } from 'react-native-elements'

class TodoApp extends Component {


    /* componentDidMount() {
        fetch('https://us-central1-foxmike-test.cloudfunctions.net/todoDb/getTodo', { method: 'GET' })
            .then((response) => response.json())
            .then((json) => {
                if (json === null) {
                    this.setState({ dict: [], isLoading: false });
                } else {
                    this.setState({ dict: json, isLoading: false });
                }
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    } */

    /* addToDo = (newTodo) => {
        let copyDict = this.props.dict;
        var today = Math.round((new Date()).getTime());
        copyDict[today] = { completed: false, ts: today, text: this.props.userInput }
        this.setState({ dict: copyDict });
        this.addTodoToDatabase(this.props.userInput, today, false);
    }

    addTodoToDatabase = (text, ts, completed) => {
        fetch('https://us-central1-foxmike-test.cloudfunctions.net/todoDb/addTodo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed: completed,
                ts: ts,
                text: text,
            }),
        });
    }

    toggleDone = (key) => {
        let copyDict = this.props.dict;
        if (this.props.dict[key].completed) {
            copyDict[key].completed = false;
            this.toggleDoneInDatabase(key, false)
        } else {
            copyDict[key].completed = true;
            this.toggleDoneInDatabase(key, true)
        }
        this.setState({ dict: copyDict });
    }

    toggleDoneInDatabase = (ts, done) => {
        fetch('https://us-central1-foxmike-test.cloudfunctions.net/todoDb/toggleDone', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ts: ts,
                completed: done
            }),
        });
    }

    removeTodo = (key) => {

        let copyDict = this.props.dict;
        delete copyDict[key];
        this.removeTodoFromDatabase(key);
        if (Object.keys(this.props.dict).length === 1) {
            this.setState({ dict: copyDict, userInput: '', addItemExplanationVisible: true });
        } else {
            this.setState({ dict: copyDict, userInput: '' });
        }

    }

    removeTodoFromDatabase = (ts) => {
        fetch('https://us-central1-foxmike-test.cloudfunctions.net/todoDb/removeTodo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ts: ts,
            }),
        });
    }

    

    

    setFabVisible = (boolean) => {
        this.setState({ fabVisible: boolean });
    }

    updateUserInput = (text) => {
        this.setState({ userInput: text })
    }

    toggleFab = (boolean) => {
        this.setState({ fabVisible: boolean })
    }

    

    setaddItemExplanationVisible = (boolean) => {
        this.setState({ addItemExplanationVisible: boolean });
    } */

    handleKeyDown = () => {
        if (e.nativeEvent.key == "Enter") {
            alert('hej');
        } else {
            alert('nope');
        }
    }

    getDate = (timestamp) => {
        let momentDate = new moment(new Date(timestamp));
        let formattedDate = momentDate.format("dddd D MMMM YYYY");
        return (formattedDate);
    }

    checkIfDateHeader = (index) => {
        if (index > 0) {
            var key = Object.keys(this.props.dict)[index];
            var prevKey = Object.keys(this.props.dict)[index - 1];

            let moment1 = new moment(new Date(this.props.dict[key].ts));
            let moment2 = new moment(new Date(this.props.dict[prevKey].ts));

            if (moment1.isSame(moment2, 'day') && moment1.isSame(moment2, 'date')) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }



    render() {
        console.log('rendering')
        console.log(this.props.isLoading)
        console.log(this.props.dict)
        if (this.props.isLoading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>);
        } else {
            return (
                <View style={{ flex: 1 }}>
                    {Object.keys(this.props.dict).length === 0 ? (
                        // NO TODOS, SHOWING FIRST PAGE
                        <View style={{ flex: 1, flexDirection: 'column'}} >
                            <FirstPage />
                            {this.props.addItemExplanationVisible ? (
                                // SHOWING BLACK BUTTON
                                <TouchableNativeFeedback onPress={() => {
                                    this.props.setaddItemExplanationVisible(false)
                                }}>
                                    <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ alignSelf: 'stretch', margin: 32, padding: 10, flexDirection: 'row', height: 50, borderColor: 'lightgray', borderWidth: 1, borderRadius: 25, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                                            <TouchableNativeFeedback
                                                onPress={() => {
                                                    this.props.setaddItemExplanationVisible(false)
                                                }}>

                                                <View style={{ padding: 5, flexDirection: 'row' }} >
                                                    <Icon
                                                        name='add'
                                                        type='material'
                                                        color='white'
                                                        onPress={() => {
                                                            this.props.setaddItemExplanationVisible(false)
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
                                    // SHOWING TEXT INPUT
                                    <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ alignSelf: 'stretch', margin: 32, padding: 10, flexDirection: 'row', height: 50, borderColor: 'lightgray', borderWidth: 1, borderRadius: 25, backgroundColor: 'white', alignItems: 'center' }}>
                                            <TextInput style={{ flexGrow: 1, height: 40, paddingStart: 10 }}
                                                onChangeText={text => this.props.updateUserInput(text)}
                                                ref={input => { this.textInput = input }}
                                                autoFocus={true}
                                                onSubmitEditing={() => {
                                                    this.props.addToDo(Math.round((new Date()).getTime()));
                                                    this.textInput.clear()
                                                }}
                                            />
                                            <View style={{ padding: 5 }} >
                                                <Icon
                                                    name='add'
                                                    type='material'
                                                    color='black'
                                                    onPress={() => {
                                                        this.props.addToDo(Math.round((new Date()).getTime()));
                                                        this.textInput.clear()
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                )}

                        </View>
                    ) : (
                            // TODOS ADDED, SHOWING SECOND PAGE WITH LIST
                            <View style={{ flex: 1 }} >
                                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 90 }}>
                                    <TodoLogo />
                                </View>
                                <View style={{ height: 1, backgroundColor: '#F6F6F6' }}></View>
                                <View style={{ flex: 1, paddingStart: 16, paddingEnd: 16, paddingTop: 26, backgroundColor: 'white' }}>
                                    <FlatList style={{ flex: 1 }}
                                        renderItem={this.renderItem}
                                        data={_.keys(this.props.dict)}
                                        keyExtractor={item => `${item}`}
                                    />
                                </View>

                                {this.props.fabVisible ? (
                                    // FAB VISIBLE
                                    <TouchableNativeFeedback onPress={() => {
                                        this.props.toggleFab(!this.props.fabVisible);
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
                                        // INPUT VISIBLE
                                        <View style={{ position: 'absolute', top: 40, left: 0, right: 0, bottom: 0 }}>
                                            <View style={{ alignSelf: 'stretch', margin: 20, padding: 10, flexDirection: 'row', height: 60, borderColor: 'lightgray', borderWidth: 1, borderRadius: 30, backgroundColor: 'white', alignItems: 'center' }}>
                                                <TextInput style={{ flexGrow: 1, height: 40, paddingStart: 10 }}
                                                    onChangeText={text => this.props.updateUserInput(text)}
                                                    ref={input => { this.textInput = input }}
                                                    autoFocus={true}
                                                    onSubmitEditing={() => {
                                                        this.props.addToDo(Math.round((new Date()).getTime()));
                                                        this.textInput.clear()
                                                        this.props.setFabVisible(true)
                                                    }}
                                                />
                                                <View style={{ padding: 5 }} >
                                                    <Icon
                                                        name='add'
                                                        type='material'
                                                        color='black'
                                                        onPress={() => {
                                                            this.props.addToDo(Math.round((new Date()).getTime()));
                                                            this.textInput.clear();
                                                            this.props.setFabVisible(true)
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    )}
                            </View>
                        )}
                </View>);
        }
    }
    // LIST ITEM
    renderItem = ({ item, index }) => {
        const getDateHeader = this.checkIfDateHeader(index) && (
            <Text style={{ fontSize: 16, padding: 20, color: 'gray' }}>
                {this.getDate(this.props.dict[item].ts)}
            </Text>
        )
        if (this.props.dict[item].completed) {
            // COMPLETED ROW
            return (
                <View style={{ flex: 1 }}>
                    {getDateHeader}
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            type='material'
                            name='lens'
                            color='black'
                            size={20}
                            onPress={() => this.props.removeTodo(item)}>
                        </Icon>
                        <TouchableNativeFeedback onPress={() => this.props.toggleDone(item)}>
                            <Text style={{ flex: 0.9, width: "100%", backgroundColor: "white", fontSize: 16, padding: 20, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                                {this.props.dict[item].text}
                            </Text>
                        </TouchableNativeFeedback>
                        <Icon
                            type='material'
                            name='clear'
                            color='black'
                            onPress={() => this.props.removeTodo(item)}>
                        </Icon>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#F6F6F6' }}></View>
                </View>
            );
        } else {
            // UNCOMPLETED ROW
            return (
                <View style={{ flex: 1 }}>
                    {getDateHeader}
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            type='material'
                            name='radio-button-unchecked'
                            color='#F6F6F6'
                            size={20}
                            onPress={() => this.props.removeTodo(item)}>
                        </Icon>
                        <TouchableNativeFeedback onPress={() => this.props.toggleDone(item)}>
                            <Text style={{ flex: 0.9, width: "100%", backgroundColor: "white", fontSize: 16, padding: 20 }}>
                                {this.props.dict[item].text}
                            </Text>

                        </TouchableNativeFeedback>
                        <Icon
                            style='material'
                            name='clear'
                            color='black'
                            onPress={() => this.props.removeTodo(item)}>
                        </Icon>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#F6F6F6' }}></View>
                </View>
            );
        }
    };
}

function FirstPage() {
    const momentDate = new moment(new Date());
    const formattedDate = momentDate.format("dddd D MMMM YYYY");
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <TodoLogo />
                <Text style={{ fontSize: 16, marginTop: 8, color: 'gray' }}>
                    {formattedDate}
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

function mapStateToProps(state) {
    return {
        userInput: state.userInput,
        dict: state.dict,
        data: state.data,
        addItemExplanationVisible: state.addItemExplanationVisible,
        isLoading: state.isLoading,
        fabVisible: state.fabVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToDo: (ts) => dispatch({ type: 'ADD_TODO', ts }),
        toggleDone: (key) => dispatch({ type: 'TOGGLE_DONE', key }),
        removeTodo: (key) => dispatch({ type: 'REMOVE_TODO', key }),
        setFabVisible: (boolean) => dispatch({ type: 'SET_FAB_VISIBLE', boolean }),
        updateUserInput: (text) => dispatch({ type: 'UPDATE_USER_INPUT', text }),
        toggleFab: (boolean) => dispatch({ type: 'TOGGLE_FAB', boolean }),
        setaddItemExplanationVisible: (boolean) => dispatch({ type: 'SET_ADD_ITEM_EXPLANATION_VISIBLE', boolean }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
