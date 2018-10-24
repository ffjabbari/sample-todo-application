import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { StoreModule, Store } from '@ngrx/store'

import { TodosComponent } from './todos.component';
import { metaReducers, reducers } from './store/todos.reducer';

import { State } from './store/todos.state';

import { ActionTodosFilter, ActionTodosToggle } from './store/todos.actions';

describe('TodosComponent', () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;
    let store: Store<State>;
    let dispatchSpy;

    const getInput = () => fixture.debugElement.query(By.css('#input_add_todo'));
    const getTodos = () => fixture.debugElement.queryAll(By.css('.todo-item'));
    const getTodosFilterAll = () => fixture.debugElement.query(By.css('.filter-item.all'));
    const getTodosFilterDone = () => fixture.debugElement.query(By.css('.filter-item.completed'));
    const getTodosFilterActive = () => fixture.debugElement.query(By.css('.filter-item.todo'));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot(reducers, { metaReducers })],
            declarations: [TodosComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();

        store = TestBed.get(Store);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should start out with 4 todos', () => {
        expect(component).toBeTruthy();
        expect(component.todos.items.length).toBe(4);
        expect(getTodos().length).toBe(4);
    });

    it('should dispatch add todo action', () => {
        dispatchSpy = spyOn(store, 'dispatch');
        component.newTodo = 'test';
        getInput().triggerEventHandler('keyup.enter', {});

        fixture.detectChanges();
        expect(component.newTodo).toBe('');
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy.calls.mostRecent().args[0].payload.name).toBe('test');
    });

    it('should dispatch the filter action "all"', () => {
        dispatchSpy = spyOn(store, 'dispatch');
        getTodosFilterAll().triggerEventHandler('click', {});

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith(
            new ActionTodosFilter({ filter: 'ALL' })
        );
    });

    it('should dispatch the filter action "done"', () => {
        dispatchSpy = spyOn(store, 'dispatch');
        getTodosFilterDone().triggerEventHandler('click', {});

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith(
            new ActionTodosFilter({ filter: 'DONE' })
        );
    });

    it('should dispatch the filter action "active"', () => {
        dispatchSpy = spyOn(store, 'dispatch');
        getTodosFilterActive().triggerEventHandler('click', {});

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith(
            new ActionTodosFilter({ filter: 'ACTIVE' })
        );
    });

    it('should dispatch toggle todo action', () => {
        fixture.detectChanges();
        dispatchSpy = spyOn(store, 'dispatch');

        let todo = getTodos()[0];
        todo.triggerEventHandler('click', {});

        fixture.detectChanges();
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith(
            new ActionTodosToggle({ id: todo.properties.id })
        );
    });
});
