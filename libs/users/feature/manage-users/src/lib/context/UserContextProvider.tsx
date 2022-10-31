import React, { ReactNode, useMemo } from 'react';

import { User } from '@trade-alerts/users/domain';

import { UserContext, UserContextValue } from './user.context';

interface UserContextProviderProps {
  user: User;
  children: ReactNode;
}

export function UserContextProvider({ user, children }: UserContextProviderProps) {
  const value: UserContextValue = useMemo(() => ({ user }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
