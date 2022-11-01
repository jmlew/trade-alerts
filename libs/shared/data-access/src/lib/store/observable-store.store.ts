import { BehaviorSubject, Observable, filter } from 'rxjs';

import { isNonNull } from '@trade-alerts/shared/util-common';

import { isDev } from '../env/env-var.util';

export class ObservableStore<State> {
  protected enableLogging: boolean;
  protected state: State;
  protected initialState: State;
  protected subject: BehaviorSubject<State>;

  constructor(initialState: State) {
    this.initialState = initialState;
    this.state = { ...initialState };
    this.subject = new BehaviorSubject(initialState);
  }

  applyState() {
    this.subject.next(this.state);
    if (this.enableLogging && isDev()) {
      console.log(`${this.constructor.name}:`, this.state);
    }
  }

  onClear() {
    this.state = { ...this.initialState };
    this.applyState();
  }

  selectState(): Observable<State> {
    return this.subject.pipe(filter(isNonNull));
  }

  selectStateValue(): State {
    return this.subject.getValue();
  }
}
