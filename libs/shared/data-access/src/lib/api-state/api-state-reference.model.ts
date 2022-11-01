import { ApiStatus } from './api-state.enum';

export interface ApiStateReferenceManager extends ApiStateReference {
  onIdle(): void;
  onPending(): void;
  onCompleted(): void;
  onFailed(error: string): void;
  onCancelled(): void;
}

export interface ApiStateReference {
  isIdle(): boolean;
  isPending(): boolean;
  isCompleted(): boolean;
  isFailed(): boolean;
  wasIdle(): boolean;
  wasPending(): boolean;
  wasCompleted(): boolean;
  wasFailed(): boolean;
  getStatus(): ApiStatus;
  getPrevStatus(): ApiStatus;
  getError(): string | null;
}
