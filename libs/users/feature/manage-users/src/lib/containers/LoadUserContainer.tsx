import { ReactNode, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorMessageWithButton, Loading } from '@trade-alerts/shared/ui-common';

import { UserContextProvider } from '../context/UserContextProvider';
import { LoadUserViewModel as useVM } from './LoadUserViewModel';

interface LoadUserContainerProps {
  userId: number;
  children: ReactNode;
}

export function LoadUserContainer({ userId, children }: LoadUserContainerProps) {
  const navigate = useNavigate();
  const { user, loadUser, resetLoad, loadStateRef } = useVM(userId);
  const { getError, isCompleted, isFailed, isPending } = loadStateRef;

  useEffect(() => {
    loadUser(userId);
  }, []);

  function goToList() {
    isFailed() && resetLoad();
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
      {isCompleted() && user != null && (
        <UserContextProvider user={user}>{children}</UserContextProvider>
      )}
    </>
  );
}
