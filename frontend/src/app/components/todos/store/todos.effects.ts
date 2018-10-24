import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../../../services/localStorage/localStorage.service';

import { ActionTodosPersist, TodosActionTypes } from './todos.actions';

export const TODOS_KEY = 'todos';

@Injectable()
export class TodosEffects {
    constructor(
        private $action: Actions<Action>,
        private localStorageService: LocalStorageService
    ) { }

    // Ngrx store effect to help persist data into localStorage as it's been set
    @Effect({ dispatch: false })
    persistTodos = this.$action.pipe(
        ofType<ActionTodosPersist>(TodosActionTypes.PERSIST),
        tap(action =>
            this.localStorageService.setItem(TODOS_KEY, action.payload.todos)
        )
    );
}
