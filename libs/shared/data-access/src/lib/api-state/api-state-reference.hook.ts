import { useState } from 'react';

import { usePrevious } from '@trade-alerts/shared/util-common';

import { ApiStateManager } from './api-state-manager';
import { ApiStateReference, ApiStateReferenceManager } from './api-state-reference.model';
import { ApiStatus } from './api-state.enum';
import { ApiState } from './api-state.model';

export interface ApiStateManagerHook {
  apiState: ApiState;
  apiStateManager: ApiStateReferenceManager;
}

export const {
  onIdle,
  onPending,
  onCompleted,
  onFailed,
  onCancelled,
  isPending,
  isIdle,
  isCompleted,
  isFailed,
  getStatus,
  getError,
} = ApiStateManager;

export function useApiStateReference(apiState: ApiState | null): ApiStateReference {
  const prevApiState = usePrevious(apiState);

  return {
    // Getters to return the current API status.
    isIdle: (): boolean => apiState != null && isIdle(apiState),
    isPending: (): boolean => apiState != null && isPending(apiState),
    isCompleted: (): boolean => apiState != null && isCompleted(apiState),
    isFailed: (): boolean => apiState != null && isFailed(apiState),

    // Getters to return the previous API status.
    wasIdle: (): boolean => prevApiState != null && isIdle(prevApiState),
    wasPending: (): boolean => prevApiState != null && isPending(prevApiState),
    wasCompleted: (): boolean => prevApiState != null && isCompleted(prevApiState),
    wasFailed: (): boolean => prevApiState != null && isFailed(prevApiState),

    // Getters to return each property of the Api State.
    getStatus: (): ApiStatus => (apiState != null ? getStatus(apiState) : ApiStatus.Idle),
    getPrevStatus: (): ApiStatus =>
      prevApiState != null ? getStatus(prevApiState) : ApiStatus.Idle,
    getError: (): string | null => (apiState != null ? getError(apiState) : null),
  };
}

export function useApiStateManager(): ApiStateManagerHook {
  const [apiState, setApiState] = useState<ApiState>(onIdle());
  const apiStateReference: ApiStateReference = useApiStateReference(apiState);

  const apiStateManager: ApiStateReferenceManager = {
    ...apiStateReference,

    // Setters to mutate the current API status.
    onIdle: (): void => setApiState(onIdle()),
    onPending: (): void => setApiState(onPending()),
    onCompleted: (): void => setApiState(onCompleted()),
    onCancelled: (): void => setApiState(onCancelled()),
    onFailed: (error: string): void => setApiState(onFailed(error)),
  };

  return { apiState, apiStateManager };
}
