import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AlertType = 'info' | 'warning' | 'danger' | 'success';

export interface Alert {
  type: AlertType;
  message: string;
  title?: string;
}

interface AlertContextProps {
  alert: Alert | null;
  showAlert: (alert: Alert) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used within AlertProvider');
  return ctx;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = (alert: Alert) => setAlert(alert);
  const hideAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
