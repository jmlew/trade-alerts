import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRequestType, useApiStateManager } from '@trade-alerts/shared/data-access';
import { useAlert } from '@trade-alerts/shared/feature-alert';
import { AlertType, Loading } from '@trade-alerts/shared/ui-common';
import { UpdateUserResponse, UserDetails, userFacade } from '@trade-alerts/users/domain';
import { UserDetailsForm } from '@trade-alerts/users/ui';
import { getUserFormParams } from '@trade-alerts/users/util';

import { useUserContext } from '../context/user.context';

export function UpdateUserContainer() {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const { apiState, stateManager } = useApiStateManager();
  const { isCompleted, isPending, onCompleted, onFailed, onPending } = stateManager;
  const { user } = useUserContext();

  // Handle changes in status for API load and update requests.
  useEffect(() => {
    if (isCompleted()) {
      goToList();
    }
  }, [apiState]);

  function updateUser(values: UserDetails) {
    const userId: number = user.id;
    const request: ApiRequestType = ApiRequestType.Update;
    onPending(request);
    userFacade
      .updateUser(userId, values)
      .then((res: AxiosResponse<UpdateUserResponse>) => {
        onCompleted(request);
        setAlert({
          isShown: true,
          message: `User ${userId} has been updated`,
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
      {
        <UserDetailsForm
          user={user}
          onSubmit={updateUser}
          onCancel={goToList}
          initialValues={getUserFormParams(user)}
        />
      }
    </>
  );
}
