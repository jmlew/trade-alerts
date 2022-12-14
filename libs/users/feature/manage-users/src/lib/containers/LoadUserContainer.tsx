import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorMessageWithButton, Loading } from '@trade-alerts/shared/ui-common';
import { userFacade } from '@trade-alerts/users/domain';

import { LoadUserViewModel as useVM } from './LoadUserViewModel';

interface LoadUserContainerProps {
  userId: number;
  children: ReactNode;
}

export function LoadUserContainer({ userId, children }: LoadUserContainerProps) {
  const navigate = useNavigate();
  const { user, loadUser, resetApiState, apiStateRef } = useVM(userFacade);
  const { getError, isCompleted, isFailed, isPending } = apiStateRef;

  useEffect(() => {
    loadUser(userId);
  }, []);

  function goToList() {
    isFailed() && resetApiState();
    navigate(`/users`);
  }

  return (
    <>
      {isPending() && <Loading />}
      {isFailed() && (
        <ErrorMessageWithButton label="Go to Users" onClick={goToList}>
          {getError()}
        </ErrorMessageWithButton>
      )}
      {isCompleted() && user != null && children}
    </>
  );
}
