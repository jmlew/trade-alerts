import { useState } from 'react';

import { usePrevious } from '@trade-alerts/shared/util-common';

import { ApiStateManager } from './api-state-manager.util';
import { ApiRequestType, ApiStatus } from './api-state.enum';
import { ApiState } from './api-state.model';

// Convenience methods.
export const {
  onInit,
  onPending,
  onCompleted,
  onFailed,
  onCancelled,
  onPendingMutable,
  onCompletedMutable,
  onFailedMutable,
  onCancelledMutable,
  isPending,
  isInit,
  isCompleted,
  isFailed,
  isCreate,
  isRead,
  isUpdate,
  isDelete,
  getStatus,
  getRequest,
  getError,
} = ApiStateManager;

export interface ApiStateReferenceManager extends ApiStateReference {
  onInit(): void;
  onPending(request: ApiRequestType): void;
  onCompleted(request: ApiRequestType): void;
  onFailed(error: string, request: ApiRequestType): void;
  onCancelled(request: ApiRequestType): void;
  onPendingMutable?(request: ApiRequestType): void;
  onCompletedMutable?(request: ApiRequestType): void;
  onFailedMutable?(error: string, request: ApiRequestType): void;
  onCancelledMutable?(request: ApiRequestType): void;
}

export interface ApiStateReference {
  isInit(): boolean;
  isPending(): boolean;
  isCompleted(): boolean;
  isFailed(): boolean;
  isCreate(): boolean;
  isRead(): boolean;
  isUpdate(): boolean;
  isDelete(): boolean;
  wasInit(): boolean;
  wasPending(): boolean;
  wasCompleted(): boolean;
  wasFailed(): boolean;
  wasCreate(): boolean;
  wasRead(): boolean;
  wasUpdate(): boolean;
  wasDelete(): boolean;
  getStatus(): ApiStatus;
  getPrevStatus(): ApiStatus;
  getRequest(): ApiRequestType | null;
  getError(): string | null;
}

export function useApiStateManager(): {
  apiState: ApiState;
  stateManager: ApiStateReferenceManager;
} {
  const [apiState, setApiState] = useState<ApiState>(onInit());
  const prevApiState = usePrevious(apiState);

  const stateManager: ApiStateReferenceManager = {
    // Setters to mutate the current API status based on a given request type.
    onInit: (): void => setApiState(onInit()),
    onPending: (request: ApiRequestType): void => setApiState(onPending(request)),
    onCompleted: (request: ApiRequestType): void => setApiState(onCompleted(request)),
    onCancelled: (request: ApiRequestType): void => setApiState(onCancelled(request)),
    onFailed: (error: string, request: ApiRequestType): void =>
      setApiState(onFailed(error, request)),

    // Getters to return the current API status.
    isInit: (): boolean => isInit(apiState),
    isPending: (): boolean => isPending(apiState),
    isCompleted: (): boolean => isCompleted(apiState),
    isFailed: (): boolean => isFailed(apiState),
    isCreate: (): boolean => isCreate(apiState),
    isRead: (): boolean => isRead(apiState),
    isUpdate: (): boolean => isUpdate(apiState),
    isDelete: (): boolean => isDelete(apiState),

    // Getters to return the previous API status.
    wasInit: (): boolean => prevApiState != null && isInit(prevApiState),
    wasPending: (): boolean => prevApiState != null && isPending(prevApiState),
    wasCompleted: (): boolean => prevApiState != null && isCompleted(prevApiState),
    wasFailed: (): boolean => prevApiState != null && isFailed(prevApiState),
    wasCreate: (): boolean => prevApiState != null && isCreate(prevApiState),
    wasRead: (): boolean => prevApiState != null && isRead(prevApiState),
    wasUpdate: (): boolean => prevApiState != null && isUpdate(prevApiState),
    wasDelete: (): boolean => prevApiState != null && isDelete(prevApiState),

    // Getters to return each property of the Api State.
    getStatus: (): ApiStatus => getStatus(apiState),
    getPrevStatus: (): ApiStatus =>
      prevApiState != null ? getStatus(prevApiState) : ApiStatus.Init,
    getRequest: (): ApiRequestType | null => getRequest(apiState),
    getError: (): string | null => getError(apiState),
  };

  return { apiState, stateManager };
}

export function useApiStateReference(apiState: ApiState | undefined): ApiStateReference {
  const prevApiState = usePrevious(apiState);

  return {
    // Getters to return the current API status.
    isInit: (): boolean => apiState != null && isInit(apiState),
    isPending: (): boolean => apiState != null && isPending(apiState),
    isCompleted: (): boolean => apiState != null && isCompleted(apiState),
    isFailed: (): boolean => apiState != null && isFailed(apiState),
    isCreate: (): boolean => apiState != null && isCreate(apiState),
    isRead: (): boolean => apiState != null && isRead(apiState),
    isUpdate: (): boolean => apiState != null && isUpdate(apiState),
    isDelete: (): boolean => apiState != null && isDelete(apiState),

    // Getters to return the previous API status.
    wasInit: (): boolean => prevApiState != null && isInit(prevApiState),
    wasPending: (): boolean => prevApiState != null && isPending(prevApiState),
    wasCompleted: (): boolean => prevApiState != null && isCompleted(prevApiState),
    wasFailed: (): boolean => prevApiState != null && isFailed(prevApiState),
    wasCreate: (): boolean => prevApiState != null && isCreate(prevApiState),
    wasRead: (): boolean => prevApiState != null && isRead(prevApiState),
    wasUpdate: (): boolean => prevApiState != null && isUpdate(prevApiState),
    wasDelete: (): boolean => prevApiState != null && isDelete(prevApiState),

    // Getters to return each property of the Api State.
    getStatus: (): ApiStatus => (apiState != null ? getStatus(apiState) : ApiStatus.Init),
    getPrevStatus: (): ApiStatus =>
      prevApiState != null ? getStatus(prevApiState) : ApiStatus.Init,
    getRequest: (): ApiRequestType | null =>
      apiState != null ? getRequest(apiState) : null,
    getError: (): string | null => (apiState != null ? getError(apiState) : null),
  };
}
