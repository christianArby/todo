import React, { Component } from 'react';

import { createStore, combineReducers } from 'redux'

import { TodoAppComponent } from "./src/TodoApp";


import { Provider } from 'react-redux'

const initialState = {
    userInput: '',
    todos: [],
    addItemExplanationVisible: true,
    isLoading: true,
    fabVisible: true

}

const todosReducer = (todosState = [], action) => {
    switch (action.type) {
        case 'DATA_AVAILABLE':
            return action.data
        case 'ADD_TODO':
            const copyTodos = Object.assign({}, todosState);
            copyTodos[action.ts] = { completed: false, ts: action.ts, text: action.text }
            return copyTodos
        case 'TOGGLE_DONE':
            let copyTodos2 = Object.assign({}, todosState);
            if (copyTodos2[action.key].completed) {
                copyTodos2[action.key].completed = false;
            } else {
                copyTodos2[action.key].completed = true;
            }
            return copyTodos2
        case 'REMOVE_TODO':
            let copyTodos3 = Object.assign({}, todosState);
            delete copyTodos3[action.key];
            return copyTodos3
    }
    return todosState
}

const loadingReducer = (loadingState = true, action) => {
    switch (action.type) {
        case 'IS_LOADING':
            return false
    }
    return loadingState

}

const toggleFABReducer = (fabState = true, action) => {
    switch (action.type) {
        case 'TOGGLE_FAB':
            return action.boolean
    }
    return fabState

}

const itemExplanationReducer = (itemExplanationState = true, action) => {
    switch (action.type) {
        case 'SET_ADD_ITEM_EXPLANATION_VISIBLE':
            return action.boolean
    }
    return itemExplanationState
}

const userInputReducer = (userInputState = '', action) => {
    switch (action.type) {
        case 'UPDATE_USER_INPUT':
            return action.text
    }
    return userInputState
}

function appReducer(state = initialState, action) {
    return {
        todos: todosReducer(state.todos, action),
        userInput: userInputReducer(state.userInput, action),
        addItemExplanationVisible: itemExplanationReducer(state.addItemExplanationVisible, action),
        isLoading: loadingReducer(state.isLoading, action),
        fabVisible: toggleFABReducer(state.fabVisible, action)
    }
}

const store = createStore(appReducer)


class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <TodoAppComponent />
            </Provider>

        )
    }

}

export default App