// Declare the todo-item interface
export interface Todo {
    id: string;
    name: string;
    done: boolean;
}

// Declare the possible filtering actions for a given todo-item
export type TodosFilter = 'ALL' | 'DONE' | 'ACTIVE';

// Declare the component-specific state
export interface TodosState {
    items: Todo[];
    filter: TodosFilter;
}

// Declare the overall application state
// TODO: Move this to a more app-centric file as more components are added
export interface State {
    todos: TodosState;
}
