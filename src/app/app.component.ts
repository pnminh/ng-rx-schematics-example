import { Component, OnInit } from '@angular/core';
import * as reducers from './store/reducers';
import { Store } from '@ngrx/store';
import * as authActions from './store/actions/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.store.dispatch(new authActions.LoadAuths());
  }
  constructor(private store: Store<reducers.State>) {}
}
