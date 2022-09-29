import { ApiRequestType, ApiStatus } from './api-state.enum';

export interface ApiStateReferenceManager extends ApiStateReference {
  onInit(): void;
  onPending(request: ApiRequestType): void;
  onCompleted(request: ApiRequestType): void;
  onFailed(error: string, request: ApiRequestType): void;
  onCancelled(request: ApiRequestType): void;
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
