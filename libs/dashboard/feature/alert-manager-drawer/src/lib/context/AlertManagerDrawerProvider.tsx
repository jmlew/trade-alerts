import { ReactNode, useMemo, useState } from 'react';

import {
  AlertManagerDrawerContext,
  AlertManagerDrawerContextValue,
} from './alert-manager-drawer.context';

interface AlertManagerProviderProps {
  children: ReactNode;
}

export function AlertManagerDrawerProvider({ children }: AlertManagerProviderProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const value: AlertManagerDrawerContextValue = useMemo(
    () => ({ isDrawerOpen, setDrawerOpen }),
    [isDrawerOpen, setDrawerOpen]
  );

  return (
    <AlertManagerDrawerContext.Provider value={value}>
      {children}
    </AlertManagerDrawerContext.Provider>
  );
}
