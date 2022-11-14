import { BehaviorSubject, Observable, filter } from 'rxjs';

import { isNonNull } from '@trade-alerts/shared/util-common';

import { isCypress, isDev, isJest } from '../env/env-var.util';

export class ObservableStore<State> {
  protected enableLogging: boolean;
  protected extraLoggingKeys: (keyof State)[];

  protected initialState: State;
  protected subject: BehaviorSubject<State>;

  constructor(initialState: State) {
    this.initialState = initialState;
    this.subject = new BehaviorSubject(initialState);
  }

  protected update(state: State) {
    this.subject.next(state);
    if (this.enableLogging && isDev() && !isCypress() && !isJest()) {
      this.logState();
    }
  }

  onClear() {
    this.update({ ...this.initialState });
  }

  selectState(): Observable<State> {
    return this.subject.pipe(filter(isNonNull));
  }

  getState(): State {
    return this.subject.getValue();
  }

  private logState() {
    const state: State = this.getState();
    const extras: (string | State[keyof State])[] = this.extraLoggingKeys
      ? this.extraLoggingKeys.reduce(
          (accum: (string | State[keyof State])[], key: keyof State) => [
            ...accum,
            `\n| ${String(key)}:`,
            state[key],
          ],
          []
        )
      : [];
    console.log(`${this.constructor.name}:`, ...extras, state);
  }
}
