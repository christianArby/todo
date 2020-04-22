import React, { Component } from 'react';

import { createStore, combineReducers } from 'redux'

import { TodoAppComponent } from "./src/TodoApp";


import { Provider } from 'react-redux'

const initialState = {
    userInput: '',
    dict: [],
    addItemExplanationVisible: true,
    isLoading: true,
    fabVisible: true

}

const dictReducer = (dictState = [], action) => {
    switch (action.type) {
        case 'DATA_AVAILABLE':
            return action.data
        case 'ADD_TODO':
            const copyDict = Object.assign({}, dictState);
            copyDict[action.ts] = { completed: false, ts: action.ts, text: action.text }
            return copyDict
        case 'TOGGLE_DONE':
            let copyDict2 = Object.assign({}, dictState);
            if (copyDict2[action.key].completed) {
                copyDict2[action.key].completed = false;
            } else {
                copyDict2[action.key].completed = true;
            }
            return copyDict2
        case 'REMOVE_TODO':
            let copyDict3 = Object.assign({}, dictState);
            delete copyDict3[action.key];
            return copyDict3
    }
    return dictState
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
        dict: dictReducer(state.dict, action),
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