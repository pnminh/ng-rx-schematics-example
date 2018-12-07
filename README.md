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
