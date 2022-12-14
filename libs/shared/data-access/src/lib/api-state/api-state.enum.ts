export enum ApiStateField {
  Status = 'status',
  Error = 'error',
}

/**
 * State flags to provide progress status.
 */
export enum ApiStatus {
  Idle = 'Idle', // process not active
  Pending = 'Pending', // currently in progress
  Completed = 'Completed', // process completed
  Cancelled = 'Cancelled', // aborted due to cancelation
  Failed = 'Failed', // aborted due to failure
}

/**
 * HTTP CRUD request types.
 */
export enum ApiRequestType {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

/**
 * HTTP request methods.
 */
export enum ApiRequestMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}
