import { Context, createContext, useContext } from 'react';

export interface AlertUpdaterDrawerContextValue {
  isDrawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
}

export const AlertUpdaterDrawerContext: Context<AlertUpdaterDrawerContextValue> =
  createContext({} as AlertUpdaterDrawerContextValue);

export function useAlertUpdaterDrawerContext() {
  const context: AlertUpdaterDrawerContextValue = useContext(AlertUpdaterDrawerContext);
  if (context === undefined) {
    throw new Error(
      'useAlertUpdaterDrawerContext must be used within a AlertUpdaterDrawerContext'
    );
  }
  return context;
}
