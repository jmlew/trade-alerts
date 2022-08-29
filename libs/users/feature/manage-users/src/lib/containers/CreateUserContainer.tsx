import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRequestType, useApiStateManager } from '@kdb-dash/shared/data-access';
import { useAlert } from '@kdb-dash/shared/feature-alert';
import { AlertType, Loading } from '@kdb-dash/shared/ui-common';
import { CreateUserResponse, UserDetails, userFacade } from '@kdb-dash/users/domain';
import { UserDetailsForm } from '@kdb-dash/users/ui';
import { getUserFormParams } from '@kdb-dash/users/util';

export function CreateUserContainer() {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const { apiState, stateManager } = useApiStateManager();
  const { isCompleted, isPending, onCompleted, onFailed, onPending } = stateManager;

  // Handle changes in status for API load and update requests.
  useEffect(() => {
    if (isCompleted()) {
      goToList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState]);

  function createUser(params: UserDetails) {
    const request: ApiRequestType = ApiRequestType.Create;
    onPending(request);
    userFacade
      .createUser(params)
      .then((res: AxiosResponse<CreateUserResponse>) => {
        onCompleted(request);
        setAlert({
          isShown: true,
          message: `User ${params.firstName} ${params.lastName} has been created`,
          type: AlertType.Success,
        });
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message, request);
        setAlert({ isShown: true, message });
      });
  }

  function goToList() {
    navigate(`/users`);
  }

  return (
    <>
      {isPending() && <Loading />}
      <UserDetailsForm
        onSubmit={createUser}
        onCancel={goToList}
        initialValues={getUserFormParams()}
      />
    </>
  );
}
