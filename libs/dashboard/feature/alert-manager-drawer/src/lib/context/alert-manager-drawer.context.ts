import { Context, createContext, useContext } from 'react';

export interface AlertManagerDrawerContextValue {
  isDrawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
}

export const AlertManagerDrawerContext: Context<AlertManagerDrawerContextValue> =
  createContext({} as AlertManagerDrawerContextValue);

export function useAlertManagerDrawerContext() {
  const context: AlertManagerDrawerContextValue = useContext(AlertManagerDrawerContext);
  if (context === undefined) {
    throw new Error(
      'useAlertManagerDrawerContext must be used within a AlertManagerDrawerProvider'
    );
  }
  return context;
}
