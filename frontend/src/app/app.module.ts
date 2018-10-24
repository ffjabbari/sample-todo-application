import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LocalStorageService } from './services/localStorage/localStorage.service';

import { TodosComponent } from './components/todos/todos.component';
import { metaReducers, reducers } from './components/todos/store/todos.reducer';
import { TodosEffects } from './components/todos/store/todos.effects';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([TodosEffects])
    ],
    declarations: [AppComponent, TodosComponent],
    providers: [LocalStorageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
