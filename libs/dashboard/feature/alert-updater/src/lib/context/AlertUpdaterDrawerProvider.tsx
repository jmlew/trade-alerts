import { ReactNode, useMemo, useState } from 'react';

import {
  AlertUpdaterDrawerContext,
  AlertUpdaterDrawerContextValue,
} from './alert-updater-drawer.context';

interface AlertUpdaterDrawerProviderProps {
  children: ReactNode;
}

export function AlertUpdaterDrawerProvider({
  children,
}: AlertUpdaterDrawerProviderProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const value: AlertUpdaterDrawerContextValue = useMemo(
    () => ({ isDrawerOpen, setDrawerOpen }),
    [isDrawerOpen, setDrawerOpen]
  );

  return (
    <AlertUpdaterDrawerContext.Provider value={value}>
      {children}
    </AlertUpdaterDrawerContext.Provider>
  );
}
