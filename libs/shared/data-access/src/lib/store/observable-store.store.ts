import { BehaviorSubject, Observable, filter } from 'rxjs';

import { isNonNull } from '@trade-alerts/shared/util-common';

import { isCypress, isDev } from '../env/env-var.util';

export class ObservableStore<State> {
  protected enableLogging: boolean;
  protected extraLoggingKeys: (keyof State)[];

  protected state: State;
  protected initialState: State;
  protected subject: BehaviorSubject<State>;

  constructor(initialState: State) {
    this.initialState = initialState;
    this.state = { ...initialState };
    this.subject = new BehaviorSubject(initialState);
  }

  protected applyState() {
    this.subject.next(this.state);
    if (this.enableLogging && isDev() && !isCypress()) {
      this.logState();
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

  private logState() {
    const extras: (string | State[keyof State])[] = this.extraLoggingKeys
      ? this.extraLoggingKeys.reduce(
          (accum: (string | State[keyof State])[], key: keyof State) => [
            ...accum,
            `\n| ${String(key)}:`,
            this.state[key],
          ],
          []
        )
      : [];
    console.log(`${this.constructor.name}:`, ...extras, this.state);
  }
}
