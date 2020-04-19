import React, { Component } from 'react';

import { createStore } from 'redux'
import TodoApp from './src/TodoApp'
import { Provider } from 'react-redux'

const initialState = {
    userInput: '',
    dict: [],
    data: [],
    addItemExplanationVisible: true,
    isLoading: false,
    fabVisible: true

}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'ADD_TODO':
            const copyDict = Object.assign({},state.dict);
            console.log(copyDict)
            copyDict[action.ts] = { completed: false, ts: action.ts, text: state.userInput }
            console.log(copyDict)
            //this.addTodoToDatabase(this.props.userInput, today, false);
            return Object.assign({}, state, {dict: copyDict})
        case 'TOGGLE_DONE':
            let copyDict2 = Object.assign({}, state.dict);
            if (copyDict2[action.key].completed) {
                copyDict2[action.key].completed = false;
                //this.toggleDoneInDatabase(key, false)
            } else {
                copyDict2[action.key].completed = true;
                //this.toggleDoneInDatabase(key, true)
            }
            return Object.assign({}, state, { dict: copyDict2})
        case 'REMOVE_TODO':
            let copyDict3 = Object.assign({}, state.dict);
            delete copyDict3[action.key];
            //this.removeTodoFromDatabase(key);
            if (Object.keys(state.dict).length === 1) {
                return Object.assign({}, state, { dict: copyDict3, userInput: '', addItemExplanationVisible: true })
            } else {
                return Object.assign({}, state, { dict: copyDict3, userInput: '' })
            }
        case 'SET_FAB_VISIBLE':
            return Object.assign({}, state, { fabVisible: action.boolean })
        case 'UPDATE_USER_INPUT':
            return Object.assign({}, state, {userInput: action.text})
        case 'TOGGLE_FAB':
            return Object.assign({}, state, { fabVisible: action.boolean })
        case 'SET_ADD_ITEM_EXPLANATION_VISIBLE':
            return Object.assign({}, state, {addItemExplanationVisible: action.boolean})
    }
    return state

}
const store = createStore(reducer)


class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <TodoApp />
            </Provider>

        )
    }

}

export default App