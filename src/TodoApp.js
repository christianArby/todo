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


    componentDidMount() {
        fetch('https://us-central1-foxmike-test.cloudfunctions.net/todoDb/getTodo', { method: 'GET' })
            .then((response) => response.json())
            .then((json) => {
                this.props.loading(false)
                if (json === null) {
                    this.props.dataAvailable([])

                } else {
                    this.props.dataAvailable(json)

                }
            })
            .catch((error) => console.error(error))
            .finally(() => {
                //this.setState({ isLoading: false });
            });
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

    removeTodoActions(item) {
        console.log(item)
        if (Object.keys(this.props.dict).length === 1) {
            removeTodoFromDatabase(item);
            this.props.removeTodo(item);
            this.props.setaddItemExplanationVisible(true);
        }
        else {
            removeTodoFromDatabase(item)
            this.props.removeTodo(item)         
        }
    }

    render() {
        if (this.props.isLoading) {
            console.log('Rendering due to isloading')
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>);
        } else {
            return (

                <View style={{ flex: 1 }}>
                    {console.log('Rendering due to dict')}
                    {Object.keys(this.props.dict).length === 0 ? (


                        // NO TODOS, SHOWING FIRST PAGE
                        <View style={{ flex: 1, flexDirection: 'column' }} >
                            {console.log('Rendering first page')}

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
                                        <AddTextComponent />
                                    </View>

                                )}

                        </View>
                    ) : (
                            // TODOS ADDED, SHOWING SECOND PAGE WITH LIST
                            <View style={{ flex: 1 }} >
                                {console.log('Rendering due to dict')}
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
                                            <AddTextComponent />
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
                            onPress={() => {
                                this.removeTodoActions(item);
                            }}>
                        </Icon>
                        <TouchableNativeFeedback onPress={() => this.props.toggleDone(item, this.props.dict)}>
                            <Text style={{ flex: 0.9, width: "100%", backgroundColor: "white", fontSize: 16, padding: 20, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                                {this.props.dict[item].text}
                            </Text>
                        </TouchableNativeFeedback>
                        <Icon
                            type='material'
                            name='clear'
                            color='black'
                            onPress={() => {
                                this.removeTodoActions(item);
                            }}>
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
                            onPress={() => {
                                this.removeTodoActions(item);
                            }}>
                        </Icon>
                        <TouchableNativeFeedback onPress={() => this.props.toggleDone(item, this.props.dict)}>
                            <Text style={{ flex: 0.9, width: "100%", backgroundColor: "white", fontSize: 16, padding: 20 }}>
                                {this.props.dict[item].text}
                            </Text>

                        </TouchableNativeFeedback>
                        <Icon
                            style='material'
                            name='clear'
                            color='black'
                            onPress={() => {
                                this.removeTodoActions(item);
                            }}>
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
        addItemExplanationVisible: state.addItemExplanationVisible,
        isLoading: state.isLoading,
        fabVisible: state.fabVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loading: (boolean) => dispatch({ type: 'IS_LOADING', boolean }),
        addToDo: (ts, text) => dispatch({ type: 'ADD_TODO', ts, text }),
        toggleDone: (key, dict) => {

            let done = true;
            if (dict[key].completed) {
                done = false;
            }
            toggleDoneInDatabase(key, done)

            dispatch({ type: 'TOGGLE_DONE', key })

        },
        removeTodo: (key, dictLength) => {

            if (dictLength === 1) {
                dispatch({ type: 'REMOVE_TODO', key })
                //setaddItemExplanationVisible(true)
            } else {
                dispatch({ type: 'REMOVE_TODO', key })
            }



        },
        updateUserInput: (text) => dispatch({ type: 'UPDATE_USER_INPUT', text }),
        toggleFab: (boolean) => dispatch({ type: 'TOGGLE_FAB', boolean }),
        setaddItemExplanationVisible: (boolean) => dispatch({ type: 'SET_ADD_ITEM_EXPLANATION_VISIBLE', boolean }),
        dataAvailable: (data) => dispatch({ type: 'DATA_AVAILABLE', data }),

    }
}

function addTodoToDatabase(text, ts, completed) {
    return fetch('https://us-central1-foxmike-test.cloudfunctions.net/todoDb/addTodo', {
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

function removeTodoFromDatabase(ts) {
        
    return fetch('https://us-central1-foxmike-test.cloudfunctions.net/todoDb/removeTodo', {
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

function toggleDoneInDatabase(ts, done) {
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

class AddText extends React.Component {
    state = {
        todoInput: null,
    }
    render() {
        return (
            <View style={{ alignSelf: 'stretch', margin: 32, padding: 10, flexDirection: 'row', height: 50, borderColor: 'lightgray', borderWidth: 1, borderRadius: 25, backgroundColor: 'white', alignItems: 'center' }}>
                <TextInput style={{ flexGrow: 1, height: 40, paddingStart: 10 }}
                    onChangeText={text => this.setState({ todoInput: text })} value={this.state.todoInput}
                    ref={input => { this.textInput = input }}
                    autoFocus={true}
                    onSubmitEditing={() => {
                        let ts = Math.round((new Date()).getTime());
                        addTodoToDatabase(this.state.todoInput, ts, false)
                        this.props.addToDo(ts, this.state.todoInput)
                        this.textInput.clear()
                        this.props.toggleFab(true)
                    }}
                />
                <View style={{ padding: 5 }} >
                    <Icon
                        name='add'
                        type='material'
                        color='black'
                        onPress={() => {
                            let ts = Math.round((new Date()).getTime());
                            addTodoToDatabase(this.state.todoInput, ts, false)
                            this.props.addToDo(ts, this.state.todoInput)
                            this.textInput.clear()
                            this.props.toggleFab(true)
                        }}
                    />
                </View>
            </View>
        )
    }
}

export const AddTextComponent = connect(mapStateToProps, mapDispatchToProps)(AddText);
export const TodoAppComponent = connect(mapStateToProps, mapDispatchToProps)(TodoApp);




//export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
