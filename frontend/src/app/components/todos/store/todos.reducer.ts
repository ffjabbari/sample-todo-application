import { v4 as uuid } from 'uuid';

import { ActionReducer, ActionReducerMap, MetaReducer, INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '../../../services/localStorage/localStorage.service';

import { TodosActions, TodosActionTypes } from './todos.actions';
import { Todo, State, TodosState } from './todos.state';

// Declare the initial state of the Todo Application
export const initialState: TodosState = {
    items: [
        { id: uuid(), name: 'Meal prep for the week', done: true },
        { id: uuid(), name: 'Wash clothes', done: false },
        { id: uuid(), name: 'Pay bills', done: false },
        { id: uuid(), name: 'Call the bank', done: false }
    ],
    filter: 'ALL'
};

// Reducer function that will help populate the state object with information
// from localStorage as needed
export function initStateFromLocalStorage(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state, action) {
        const newState = reducer(state, action);

        if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
            return {
                ...newState,
                ...LocalStorageService.loadInitialState()
            };
        }

        return newState;
    };
}

// Map the meta reducer
export const metaReducers: MetaReducer<State>[] = [
    initStateFromLocalStorage
];

// Main reducer function for Todo items
// Allows for adding, toggling, and filtering of Todo items
export function todosReducer(state: TodosState = initialState, action: TodosActions): TodosState {
    switch (action.type) {
        case TodosActionTypes.ADD:
            return {
                ...state,
                items: [
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        done: false
                    },
                    ...state.items
                ]
            };

        case TodosActionTypes.TOGGLE:
            return {
                ...state,
                items: state.items.map(
                    (item: Todo) =>
                        item.id === action.payload.id
                            ? { ...item, done: !item.done }
                            : item
                )
            };

        case TodosActionTypes.FILTER:
            return { ...state, filter: action.payload.filter };

        default:
            return state;
    }
}

// Mapped reducer for the app module
export const reducers: ActionReducerMap<State> = {
    todos: todosReducer
};
