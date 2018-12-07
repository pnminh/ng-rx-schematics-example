NgRx Tutorial: Quickly Adding NgRx to Your Angular 6 Project
by Rich Franzmeier | Jul 9, 2018

NgRx Tutorial - Adding NgRx to Your Angular 6 Project
NgRx (Reactive Extensions for Angular) is becoming more and more popular in the Angular community.  It is a great way to manage state using the redux pattern and keep your application scalable.  When I first started using it, my biggest complaint was that it was a lot of typing basically the same thing over and over.  Thankfully, the NgRx team addressed this with @ngrx/schematics.  This package enhances the Angular CLI with new commands for NgRx.  For example, to create a new actions file, simply type:  ng generate action ActionName

This post is meant to help you get up and running quickly with NgRx by using the @ngrx/schematics package.  It is using NgRx version 6.01 so if it doesn’t look the same to you, it could be things have changed.  No knowledge of NgRx is necessary to read this post and setup your project!

 

UPDATE
Thanks to reader baerree for the comment about using the “ng add” command to achieve most of the things done using schematics in this article. Run these commands for an existing project that doesn’t have NgRx:


ng add @ngrx/store
ng add @ngrx/effects
1
2
ng add @ngrx/store
ng add @ngrx/effects
After this completes, the only things necessary to do in this article will be the following:

Setup – under here, you may want to install the rest of the ngrx tools
NgRx Startup Code
Store Command – under here, you’ll have to add the “reducers” folder to a “store” folder to get the same structure as in the post
Effect Command – under here you’ll have to add the “effects” folder (which wasn’t added for you) to a “store” folder to get the same structure as in the post
 

Before we jump in, here are a couple links to other NgRx tutorials I have written:

NgRx Tutorial: Actions, Reducers and Effects
NgRx Tutorial: Accessing State in the Store
 

Setup
I start by creating a project using the standard Angular CLI command:

ng new ngrx-tutorial

This will give you the standard Angular starter project.

Now let’s install the NgRx schematics package:


npm install @ngrx/schematics --save-dev
1
npm install @ngrx/schematics --save-dev
Install the rest of NgRx:


npm install @ngrx/store @ngrx/effects @ngrx/store-devtools @ngrx/router-store --save
1
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools @ngrx/router-store --save
 

 

NgRx Startup Code
Now that the project is setup and we have NgRx installed, we are ready to see the power of Schematics.  Before we start running schematic commands, we will register it as the default collection in the Angular project by using this command:

ng config cli.defaultCollection @ngrx/schematics

Running this command adds the following to the angular.json file:

“cli”: {
“defaultCollection”: “@ngrx/schematics”
}
This just means we don’t have to type “@ngrx/schematics:” before each of the NgRx schematic commands.
 

Store Command
Now we can run the ‘store’ command:

ng generate store State --root --statePath store/reducers --module app.module.ts
1
ng generate store State --root --statePath store/reducers --module app.module.ts
 

This command did the following:

Created a ‘store’ folder at the app level
Created a ‘reducers’ folder in the ‘store’ folder
Created an ‘index.ts’ file in the ‘reducers’ folder
This is the main reducer file for the root store (as opposed to feature store(s)) which contains:
State interface definition (empty)
reducers – ActionReducerMap (empty)
metaReducers – MetaReducer<State>[]  (empty)
Imported the following to the AppModule:
StoreModule.forRoot(reducers, { metaReducers }),
Prepares the app for reducers and metaReducers
!environment.production?StoreDevtoolsModule.instrument() : []
Instruments the app for development
If I run “ng build” now, I get an error:

ERROR in src/app/app.module.ts(8,29): error TS2307: Cannot find module ‘../../../environments/environment’.

Ok, so the schematics aren’t perfect.  I think this is because I put the index.ts file two levels deep from ‘app’.  To fix this simply go to app.module and remove two levels of relative path for this import:

import { environment } from ‘../../../environments/environment’;
This should do the trick:
import { environment } from ‘../environments/environment’;
 

Effect Command
The next command to run is the “effect” command.  It’s purpose is to get our first effect registered with the application so it is ready to go.

This is the command to run:


ng generate effect store/App --group --root --spec false --module app.module
1
ng generate effect store/App --group --root --spec false --module app.module
 

This command did the following:

Created an “effects” folder under “store”
I like to keep actions/effects/reducers under the “store” folder
Added the app.effects.ts file in the “effects” folder
It is simply an effect with a constructor that has the Actions injected into it
Imported the following to the AppModule:
EffectsModule.forRoot([AppEffects])
Did not create a spec (unit test) file – just leave out “–spec false” if you want that file
 

Conclusion
Getting up and running with NgRx is now quicker than ever with the @ngrx/schematics package.  Without knowing anything about NgRx, you can set up your project for it using best practice code so that your team is ready to start using NgRx.  In my next post, I’ll go through some of the other schematics commands to keep you productive as you code NgRx in Angular.


---
NgRx Tutorial: Actions, Reducers and Effects
by Rich Franzmeier | Jul 16, 2018

NgRx Tutorial - Actions, Reducers, and Effects
In my NgRx Tutorial, I wrote about setting up NgRx in your Angular 6 application.  Now it’s time to focus on actions, reducers and effects.  These are the heart and soul of your NgRx code and will be the ones you use most on a day to day basis.  You will learn what they are, how to generate them and how they work together in an Angular application.

Before we jump in here are links to other NgRx tutorials I’ve written:

NgRx Tutorial: Quickly Adding NgRx to Your Angular 6 Project
NgRx Tutorial: Accessing State in the Store
The NgRx store is an implementation of the Redux pattern.  Learn more about that here.  Actions and reducers are a big part of the redux pattern.  Effects are NgRx constructs to help with asynchronous operations.

 

Actions
Actions are objects that extend the NgRx Action class with a ‘type’ property.  They have an optional ‘payload’ property (naming is up to you but the standard is to name it ‘payload’) for sending in data to the effect/reducer and are dispatched by the store to either run an effect or change state in a reducer.  So you can see that actions aren’t all that complicated but NgRx schematics does generate action files for you and can help you standardize them in your project.

To generate an action file, run this command:

ng generate action store/actions/auth

This generates the following file:


import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoadAuths = '[Auth] Load Auths'
}

export class Auth implements Action {
  readonly type = AuthActionTypes.LoadAuths;
}

export type AuthActions = LoadAuths;
1
2
3
4
5
6
7
8
9
10
11
import { Action } from '@ngrx/store';
 
export enum AuthActionTypes {
  LoadAuths = '[Auth] Load Auths'
}
 
export class Auth implements Action {
  readonly type = AuthActionTypes.LoadAuths;
}
 
export type AuthActions = LoadAuths;
It generates a sample action
Notice the error – LoadsAuths on the last line should be Auth (or the Auth action should be named LoadAuths – better yet)
This is an error with NgRx schematics but is no big deal as it gets you a template to follow
The action constants are stored as an enum (AuthActionTypes)
The action class has a type (you can add optional payload)
The AuthActions type helps you to define all of your actions for Auth as a type – in the reducer you’ll see why this is important
 

Dispatching the Action
Actions live to be dispatched.  Reducers and effects just wait until an action is dispatched so they can do their job.  But how are they dispatched?

To dispatch the action we just created, you would typically do that from your component.  Here is the typical code you need:


import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from './store/reducers';
import * as authActions from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new authActions.LoadAuths());
  }
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
 
import * as fromRoot from './store/reducers';
import * as authActions from './store/actions/auth.actions';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
 
  constructor(private store: Store<fromRoot.State>) {}
 
  ngOnInit() {
    this.store.dispatch(new authActions.LoadAuths());
  }
}
Notes:

Imports:
Store from @ngrx/store
import * as fromRoot… – this is where the main State interface lives in the index.ts file
import * as authActions… – this is where our LoadAuths actions live
Inject the store
In the constructor, inject the store as shown in the code
When it’s time to dispatch (sometimes in ngOnInit, sometimes from a button click, etc.), run this command:
this.store.dispatch(new authActions.LoadAuths());
 

Reducers
Reducers are pure functions that are the only ones that can change state.  They aren’t really changing state but making a copy of existing state and changing one or more properties on the new state.

To generate a reducer file, run this command:


ng generate reducer store/reducers/auth --reducers index.ts
1
ng generate reducer store/reducers/auth --reducers index.ts
 

This generates the following file:


import { Action } from '@ngrx/store';


export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    default:
      return state;
  }
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
import { Action } from '@ngrx/store';
 
 
export interface State {
 
}
 
export const initialState: State = {
 
};
 
export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
 
    default:
      return state;
  }
}
The reducer file adds:

The State for the reducer – this state is added to the main state (see code below)
Initial state which are your starting values
A reducer function that will be added to the main reducer (see code below)
The main reducer file (index.ts) was changed to this:


import * as fromAuth from './auth.reducer';

export interface State {
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer
};
1
2
3
4
5
6
7
8
9
import * as fromAuth from './auth.reducer';
 
export interface State {
  auth: fromAuth.State;
}
 
export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer
};
Notes:

It added import shown above
It added auth: fromAuth.State; to the State interface
It added auth: fromAuth.reducer to the reducers constant
 

Add Action to Reducer
Now let’s see how actions and reducers fit together.

This is what I’ll do:

Add the ‘userName’ property to the auth reducer’s State
Add a ‘SetAuth’ action which will set the userName property on State (payload is userName)
Update the reducer to handle this new action
Updated auth.actions.ts file:


import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoadAuths = '[Auth] Load Auths',
  SetAuths = '[Auth] Set Auths'
}

export class LoadAuths implements Action {
  readonly type = AuthActionTypes.LoadAuths;
}

export class SetAuths implements Action {
  readonly type = AuthActionTypes.SetAuths;

  constructor(public payload: string) {}
}

export type AuthActions = LoadAuths | SetAuths;
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
import { Action } from '@ngrx/store';
 
export enum AuthActionTypes {
  LoadAuths = '[Auth] Load Auths',
  SetAuths = '[Auth] Set Auths'
}
 
export class LoadAuths implements Action {
  readonly type = AuthActionTypes.LoadAuths;
}
 
export class SetAuths implements Action {
  readonly type = AuthActionTypes.SetAuths;
 
  constructor(public payload: string) {}
}
 
export type AuthActions = LoadAuths | SetAuths;
Updated auth.reducer.ts file:


import * as authActions from '../actions/auth.actions';

export interface State {
  userName?: string;
}

export const initialState: State = {
  userName: null
};

export function reducer(state = initialState, action: authActions.AuthActions): State {
  switch (action.type) {
    case authActions.AuthActionTypes.SetAuths:
      return handleSetAuths(state, action);

    default:
      return state;
  }
}

function handleSetAuths(state: State, action: authActions.SetAuths): State {
  return {
    ...state,
    userName: action.payload
  };
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
import * as authActions from '../actions/auth.actions';
 
export interface State {
  userName?: string;
}
 
export const initialState: State = {
  userName: null
};
 
export function reducer(state = initialState, action: authActions.AuthActions): State {
  switch (action.type) {
    case authActions.AuthActionTypes.SetAuths:
      return handleSetAuths(state, action);
 
    default:
      return state;
  }
}
 
function handleSetAuths(state: State, action: authActions.SetAuths): State {
  return {
    ...state,
    userName: action.payload
  };
}
Notes:

The userName property is added to State and initialState (not necessary for initialState of course)
In the ‘reducer’ function, the action is changed to authActions.AuthActions (which is the exported type AuthActions)
The case statement is added for SetAuths
I like to add a function to handle each action so the switch doesn’t get so huge and ugly
The handleSetAuths function returns a new copy of state
The …state spread operator basically copies existing state
userName: action.payload then overwrites the userName property of State (which is the only one at this time, but more should be added)
 

Effects
Effects allow us to handle asynchronous operations in NgRx.

Most times this will be calling an API
The resulting data should be stored in state by returning an action for the reducer
Effects always return one or more actions (unless you decorate @Effect with {dispatch: false})
You can inject services into your effects as well so if you need to access those in NgRx, effects are the place to do it
To generate an effect file, run this command:


ng generate effect store/effects/auth --module app.module --root true
1
ng generate effect store/effects/auth --module app.module --root true
 

This generates the following file:


import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';


@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions) {}
}
1
2
3
4
5
6
7
8
9
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
 
 
@Injectable()
export class AuthEffects {
 
  constructor(private actions$: Actions) {}
}
It also updates your app.module.ts file:


import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
The main thing the schematics generated here is EffectsModule.forRoot([AuthEffects]).  This registers our new AuthEffects class with NgRx so that it starts to listen for dispatched actions.

 

Create an Effect
The generated effect file doesn’t give you a skeleton effect to follow like the action file does, so I’ll explain how you would do that here.

Here is the final effect (see notes below for explanation of how to create it):


@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private http: HttpClient) {}

  @Effect()
  loadAuths$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.LoadAuths),
    switchMap(() => {
      return this.http.get<string>('login')
        .pipe(
          map((userName) => {
            return new authActions.SetAuths(userName);
          })
        )
    })
  );
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
@Injectable()
export class AuthEffects {
 
  constructor(private actions$: Actions,
              private http: HttpClient) {}
 
  @Effect()
  loadAuths$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.LoadAuths),
    switchMap(() => {
      return this.http.get<string>('login')
        .pipe(
          map((userName) => {
            return new authActions.SetAuths(userName);
          })
        )
    })
  );
}
Notes:

Decorate the effect with @Effect()
Name the effect using camel case of the action name and end with $ to denote it is an Observable (loadAuths$)
The type of this variable should always be Observable<Action>
The ‘ofType’ function is what is triggering this effect – whenever LoadAuths is dispatched as an action, this effect will run
Note it is using the string LoadAuths here and not the action class
Use http to do whatever you need to do, in this case log the user in and return the user name
Return from the map a SetAuths action with the userName
This will automatically dispatch the SetAuths action to the reducer to update the userName on state
If you want to return multiple actions, return an array of actions
 

Project
So over the last two posts, this is how the project looks with NgRx:



I like to have the actions, effects and reducers in their own folder under a ‘store’ folder so that they are easy to find.  I have seen it done other ways – without a ‘store’ folder for example – but this is my preference.  In a couple of posts, I’m going to talk about feature modules so I’ll start having one ‘store’ folder for each feature.  So the pattern will reproduce itself many times in the project.

 

Conclusion
In this post, you learned how to generate actions, reducers and effects using NgRx schematics.  You also learned what actions, reducers and effects are for and how they work together to help you to manage state using NgRx in your Angular 6 application.  In the next post, I plan to show you how to access the state from your application.


Get Our Secret to Good Code Documentation Guide
Subscribe to our blog and gain access to our guide developed by our consulting teams.

Some ad blockers can block the form below.

---
