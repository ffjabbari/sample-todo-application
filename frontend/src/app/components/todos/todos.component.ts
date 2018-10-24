import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { faTasks, faCheck, faSquare } from '@fortawesome/free-solid-svg-icons';

import {
    ActionTodosAdd,
    ActionTodosFilter,
    ActionTodosPersist,
    ActionTodosRemoveDone,
    ActionTodosToggle
} from './store/todos.actions';

import { State, Todo, TodosState, TodosFilter } from './store/todos.state';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
    private $unsub: Subject<void> = new Subject<void>();

    // Declare the initial Todos state
    todos: TodosState;

    // Blank out the initial todo input item
    newTodo = '';

    // Declare components for the FontAwesome icons
    iconTasks = faTasks;
    iconCheck = faCheck;
    iconSquare = faSquare;

    constructor(public store: Store<State>) {}

    ngOnInit() {
        // Grab the todos items from state as they're updated
        this.store
            .pipe(
                select('todos'),
                takeUntil(this.$unsub)
            )
            .subscribe(todos => {
                this.todos = todos;
                this.store.dispatch(new ActionTodosPersist({ todos }));
            });
    }

    ngOnDestroy(): void {
        // Garbage collection. Stop listening to the state object
        this.$unsub.next();
        this.$unsub.complete();
    }

    // Return a list of Todo items filtered by a provided action
    get filteredTodos() {
        const filter = this.todos.filter;

        if (filter === 'ALL') {
            return this.todos.items;

        } else {
            const predicate = filter === 'DONE' ? t => t.done : t => !t.done;
            return this.todos.items.filter(predicate);
        }
    }

    // Update the component's todo item as it's beeing typed
    onNewTodoChange(newTodo: string) {
        this.newTodo = newTodo;
    }

    // Event listener for clearing out the component's todo item
    onNewTodoClear() {
        this.newTodo = '';
    }

    // Dispatch the new Todo item that's been created
    onAddTodo() {
        this.store.dispatch(new ActionTodosAdd({ name: this.newTodo }));

        console.log('New Todo successfully added', this.newTodo);

        this.newTodo = '';
    }

    // Dispatch the toggle action of the todo item that's been clicked
    onToggleTodo(todo: Todo) {
        this.store.dispatch(new ActionTodosToggle({ id: todo.id }));

        console.log('Todo status successfully updated!');
    }

    // Dispatch the filter action on the existing todo items
    onFilterTodos(filter: TodosFilter) {
        this.store.dispatch(new ActionTodosFilter({ filter }));

        console.log(`Filtering to ${filter}`);
    }
}
