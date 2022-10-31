import { BehaviorSubject, Observable, distinctUntilChanged, filter } from 'rxjs';

import { isNonNull } from '@trade-alerts/shared/util-common';

export class ObservableStore<State> {
  protected state: State;
  protected initialState: State;
  protected subject: BehaviorSubject<State>;

  constructor(initialState: State) {
    this.initialState = initialState;
    this.state = { ...initialState };
    this.subject = new BehaviorSubject(initialState);
  }

  getStateValue(): State {
    return this.subject.getValue();
  }

  onClear() {
    this.state = { ...this.initialState };
    this.subject.next(this.state);
  }

  // State selectors.
  selectState(): Observable<State> {
    return this.subject.pipe(distinctUntilChanged(), filter(isNonNull));
  }
}
